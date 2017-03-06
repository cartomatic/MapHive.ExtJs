//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.LinksGridController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-links-grid',

    requires: [
        'Ext.container.Container',
        'Ext.data.Store',
        'Ext.grid.column.Action',
        'mh.data.proxy.Rest',
        'mh.module.dataView.LinksPicker'
    ],

        mixins: [
            'mh.mixin.PublishApi',
            'mh.mixin.CustomComponentConfig'
        ],

        /**
         * @property {Ext.data.Store}
         * @private
         */
        gridStore: null,

        /**
         * model to configure the store with; see full description on the view object
         * @private
         */
        model: null,

        /**
         * api endpoint to load the data from; see full description on the view object
         * @private
         */
        apiUrl: null,

        /**
         * token to use when substituting the parent identifier; see full description on the view object
         * @private
         */
        parentIdentifierToken: null,

        /**
         * token used when replacing the org identifier
         */
        orgIdentifierToken: null,

        /**
         * data view to be used for picking up linked objects; see full description on the view object
         * @private
         */
        dataView: null,

        /**
         * limit of records pulled for the grid; see full description on the view object
         * @private
         */
        recLimit: 100,

        /**
         * record currently bound to this component
         * @private
         */
        boundRec: null,


        /**
         * an instance of links picker; used to display links picker
         * @private
         */
        linksPicker: null,


        /**
         * a record field name identifier used for marking linked records as temporary
         * @private
         */
        tempLinkIdentifier: 'tempLink',

        /**
         * Whether or not store has been loaded for the currently bound record
         * @private
         */
        storeLoaded: false,

        /**
         * Whether or not any links have been modified for the currently bound record; if so, when collecting
         * @private
         */
        linksModified: false,

        /**
         * links to be removed from the parent
         * @private
         */
        linksToDestroy: null,

        /**
         * selection mode to be applied to a links picker data view
         */
        selMode: null,

        /**
         * currently set org; when not null its uuid is injected into url in place of orgIdentifierToken
         */
        currentOrg: null,

        /**
         * Called when the view is created
         */
        init: function() {

            var vw = this.getView();

            //extract config
            this.model = vw.getModel();
            this.apiUrl = vw.getApiUrl() || '';
            this.parentIdentifierToken = vw.getParentIdentifierToken();
            this.orgIdentifierToken = vw.getOrgIdentifierToken();
            this.dataView = vw.getDataView();
            this.recLimit = vw.getRecLimit();
            this.selMode = vw.getSelMode();

            //apply custom configurations
            this.applyCustomViewConfig();

            this.publishApi(['setEditable','getChanges', 'setOrgContext']);

            this.createAndSetStore();

            this.addDeleteColumn();

            //hook up some events, so data reloading works like expected
            vw.on('activate', this.onViewActivate, this);

            //by default disable grid's dd
            this.setDdPluginDisabled(true);
        },


        /**
         * sets org so its identifier can be used for url customisation
         * @param orgUuid
         */
        setOrgContext: function(org){
            this.currentOrg = org;
        },

        /**
         * disables or enables grid's dd;
         * @param disable
         */
        setDdPluginDisabled: function(disable){
            var me = this,
                view = this.getView();
            //disable dragdrop plugin in standard mode
            Ext.Array.each(view.getView().getPlugins(), function(p){
                if(Ext.getClassName(p) === 'Ext.grid.plugin.DragDrop'){
                    if(disable){
                        //p.disable(); //<- this seems to be totally ignored...
                        p.enableDrag = false;
                        p.enableDrop = false;
                    }
                    else {
                        p.enable();
                        p.enableDrag = true;
                        p.enableDrop = true;

                        if(view.getDdGroup()){
                            p.ddGroup = view.getDdGroup();
                        }
                        if(view.getDropGroup()){
                            p.dropGroup = view.getDropGroup();
                        }
                        if(view.getDragGroup()){
                            p.dragGroup = view.getDragGroup();
                        }
                    }
                    return false;
                }
            });
        },

        /**
         * Creates a grid store instance
         */
        createAndSetStore: function(){
            this.gridStore = Ext.create('Ext.data.Store', {
                model: this.model,
                proxy: {
                    type: 'mhrest'
                },
                data: [],
                listeners: {
                    load: Ext.bind(this.onStoreLoad, this)
                }
            });
            this.getView().setStore(this.gridStore);
        },

        /**
         * Adds a delete column to the view
         */
        addDeleteColumn: function(){
            var vw = this.getView(),
                hc = vw.getHeaderContainer(),
                col = Ext.create('Ext.grid.column.Action', {
                    reference: 'column_delete',
                    handler: 'onLinkDeleteClick',
                    width: 30,
                    iconCls: 'x-li li-cross-circle',
                    menuDisabled: true,
                    hidden: true
                });

            hc.add(col);
        },


        /**
         * Sets the grid editable - makes it possible to edit the data
         */
        setEditable: function(){
            this.lookupReference('column_delete').show();
            this.lookupReference('edit_tbar').show();


            //make grid reorderable
            this.setDdPluginDisabled(false);

            //start monitoring grid change events
            this.gridStore.on('datachanged', this.onStoreDataChanged, this);
            this.getView().on('drop',this.onStoreDataChanged, this);
        },


        /**
         * Sets the context for the grid. Uses parent's (rec's) identifier to obtain properly scoped data for the grid
         * @param rec
         */
        setContext: function(rec){

            this.boundRec = rec;

            this.storeLoaded = false;
            //this.linksModified = false; //<-- this is now reset on store load!
            this.linksToDestroy = [];

            //reset the store data
            this.resetStoreData();


            //make sure there is 'real' work to be done
            if(!rec || !Ext.isFunction(rec.get) || !rec.get('uuid')){
                return;
            }

            if(this.gridStore){

                this.gridStore.getProxy().setUrl(this.getLinksGridApiUrl(rec));

                if(this.getView().isVisible()) {
                    this.loadStore();
                }
            }
        },

        /**
         * gets a proper api url for the current context of the links grid
         * @param rec
         * @returns {void|XML|string}
         */
        getLinksGridApiUrl: function(rec){
            var url = this.apiUrl.replace(this.parentIdentifierToken, rec.get('uuid'));
            if(this.currentOrg){
                url = url.replace(this.orgIdentifierToken, this.currentOrg.get('uuid'));
            }
            return url;
        },

        /**
         * Resets store data
         */
        resetStoreData: function(){
            if(this.gridStore){
                this.gridStore.setData([]);
            }
        },

        /**
         * loads the store
         */
        loadStore: function(){
            //note: prevent loading for new recs - no data yet and no parent uuid
            if(this.gridStore && this.boundRec && this.boundRec.get('uuid')){
                this.gridStore.loadPage(1, {limit: this.recLimit});
            }
        },


        /**
         * store loaded callback
         */
        onStoreLoad: function(){
            this.storeLoaded = true;

            //reset flag when store gets loaded. otherwise change evt wipes out this setting if called in setContext
            this.linksModified = false;
        },


        /**
         * View activate callback; used to load the grid records if not loaded previously
         */
        onViewActivate: function(){
            if(this.boundRec && !this.storeLoaded){
                this.loadStore();
            }
        },

        /**
         * Gets the current changes in a form of a diff. Returns an object that contains the valid createLink collections
         */
        getChanges: function(){
            var diff = null,
                upserts, u, ulen,
                store, upsert, destroy, d, dlen;

            if(this.linksModified){

                //looks like there should be a diff. need to collect the records that are about to be upserted and also the deletes
                store = this.gridStore;

                upserts = store.getRange();
                u = 0; ulen = upserts.length;
                upsert = [];

                for (u; u < ulen; u++){
                    upsert.push(this.createLink(upserts[u], u));
                }

                destroy = [];
                d = 0; dlen = this.linksToDestroy.length;

                for(d; d < dlen; d++){
                    //only destroy links if they are not in the upsert collection anymore as they could have been re-added. otherwise the server would first
                    //update a link and then destroy it as this is the order ops are executed
                    if(store.find('uuid', this.linksToDestroy[d].get('uuid')) === -1){
                        //note: destroy takes in guids only
                        destroy.push(this.linksToDestroy[d].get('uuid'));
                    }
                }

                //only do diff if there is data!
                if(upsert.length > 0){
                    diff = diff || {};
                    diff.upsert = upsert;
                }
                if(destroy.length > 0){
                    diff = diff || {};
                    diff.destroy = destroy;
                }
            }

            return diff;
        },

        /**
         * Creates a link object
         * @param r
         * @param order
         */
        createLink: function(r, order){
            //basically the only thing needed at this stage is the linked object type and linked object uuid.
            //if order is provided, then order should also be set on the object, so it is possible to maintain the sorting order of linked objects
            //the outgoing model should be MapHive.Server.Core.DataModel.Link
            var ri = {
                childTypeUuid: r.get('typeUuid'),
                childUuid: r.get('uuid')
            };
            if(order !== undefined){
                ri.sortOrder = order;
            }

            return ri;
        },

        /**
         * store datachanged callback
         */
        onStoreDataChanged: function(){
            this.linksModified = true;
        },

        /**
         * delete action column click handler
         * @param view
         * @param rowIdx
         * @param colIdx
         * @param item
         * @param e
         * @param record
         */
        onLinkDeleteClick: function(view, rowIdx, colIdx, item, e, record){
            if(!record.get(this.tempLinkIdentifier)){
                this.linksToDestroy.push(record);
            }
            else {
                //a temp link has been removed, so there are changes that require tracking - for example link order
                this.linksModified = true;
            }

            this.gridStore.remove(record);
        },

        /**
         * btn add link click callback
         */
        onBtnAddLinkClick: function(btn){

            //see if the links picker is already present and instantiate it if not

            if(!this.linksPicker){
                this.linksPicker = Ext.create('mh.module.dataView.LinksPicker', {
                    animateTarget: btn,
                    deferLinksPickerRefresh: this.getView().getDeferLinksPickerRefresh()
                });

                this.linksPicker.setDataView(this.instantiateDataView());

                //need to get the data, huh?
                this.linksPicker.on('linkspicked', this.onLinksPicked, this);
            }

            this.linksPicker.show();
        },

        /**
         * links ppicked callback
         * @param records
         */
        onLinksPicked: function(records){

            var clonedRecs = [],
                r = 0, len = records.length,
                model = this.gridStore.getModel();

            for(r; r < len; r++){

                //make sure to avoid adding records that are already in store!!!
                //and also ignore recs that would link self to self
                if(this.gridStore.find('uuid', records[r].get('uuid')) === -1 && records[r].get('uuid') !== this.boundRec.get('uuid')) {
                    var newRec = Ext.create(model, records[r].getData());
                    //mark the link as temporary so can handle deletes a bit more sensibly
                    newRec.set(this.tempLinkIdentifier, true);
                    clonedRecs.push(newRec);
                }
            }

            if(clonedRecs.length > 0){
                this.gridStore.loadRecords(clonedRecs, {addRecords: true});
            }
        },

        /**
         * creates an 'instantiable' data view that can be added into the picker window
         */
        instantiateDataView: function(){
            var inst = null;

            if(this.dataView !== null){
                if(Ext.isString(this.dataView)){
                    //this should be a class name
                    inst = Ext.create(this.dataView, {
                        selMode: this.selMode
                    });
                }
                else {
                    //right this is an object cfg...
                    inst = this.dataView;
                    inst.xtype = this.dataView.type;
                    delete inst.type;
                    if(!inst.selMode){
                        inst.selMode = this.selMode;
                    }
                }
            }
            else {
                //A default view so the misconfig is obvious
                inst = {
                    xtype: 'container',
                    html: 'Looks like you misconfogured the links grid a bit... please configure it with a valid data view.'
                };
            }

            return inst;
        }
    });

}());