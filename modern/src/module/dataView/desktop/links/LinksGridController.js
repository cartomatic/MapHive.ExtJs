//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.links.LinksGridController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-desktop-links-grid',

        requires: [
            'mh.module.dataView.desktop.links.LinksGridLocalization',
            'mh.mixin.ApiMap',
            'mh.module.dataView.desktop.links.LinksPicker'
        ],

        mixins: [
            'mh.mixin.PublishApi',
            'mh.module.dataView.desktop.links.LinksGridLocalization',
            'mh.mixin.Localization',
            'mh.communication.MsgBus'
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
         * api key to work out the endpoint to load the data from; see full description on the view object
         * @private
         */
        apiMapKey: null,

        /**
         * token to use when substituting the parent identifier; see full description on the view object
         * @private
         */
        parentIdentifierToken: null,

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

            this.injectLocalizationToViewModel();

            var vw = this.getView();

            //extract config
            this.model = vw.getModel();
            this.apiMapKey = vw.getApiMapKey() || 'no-api=map-key-provided-dude';
            this.parentIdentifierToken = vw.getParentIdentifierToken();
            this.dataView = vw.getDataView();
            this.recLimit = vw.getRecLimit();
            this.selMode = vw.getSelMode();

            this.publishApi(['setEditable', 'hasChanges', 'getChanges', 'setOrgContext', 'getLinkedObjects']);

            this.configureStore();
            this.configureGrid();

            this.configureTitle();

            //hook up some events, so data reloading works like expected
            vw.on('activate', this.onViewActivate, this);


            //grid's editable mode as configured
            this.setEditable(vw.getEditable());
        },

        /**
         * sets org so its identifier can be used for url customisation
         * @param orgUuid
         */
        setOrgContext: function(org){
            this.currentOrg = org;
        },

        /**
         * configures links grid
         */
        configureGrid: function(){
            var vw = this.getView(),
                gridCfg = vw.getGridCfg(),
                defaultCols = [
                    {
                        bind: {text: '{localization.name}'},
                        dataIndex: 'name',
                        flex: 1
                    },
                    {
                        bind: {text: '{localization.description}'},
                        dataIndex: 'description',
                        flex: 1
                    }
                ],
                cols = gridCfg.columns || defaultCols,
                contentPresenterFn = Ext.isFunction(gridCfg.contentPresenterFn) ? gridCfg.contentPresenterFn : this.contentPresenterFn;

            //customise columns if needed
            this.addCustomColumns(cols);

            //add delete btn
            this.addDeleteColumn(cols);

            this.grid = vw.add(
                {
                    xtype: 'grid',
                    reference: 'linksgrid',
                    columns: cols,
                    bind: {
                        store: '{gridstore}'
                    },
                    plugins: [
                        {
                            type: 'mh-grid-drag-drop',
                            contentPresenterFn: contentPresenterFn
                        }
                    ]
                }
            );
        },

        /**
         * an extension point for adding some default links picker columns. called just before addDeleteColumn
         * @param {object[]} columns
         * @template
         */
        addCustomColumns: Ext.emptyFn,

        /**
         * Adds a delete column to the view
         * @param {object[]} columns
         */
        addDeleteColumn: function(cols){
            var me = this;

            cols.push({
                width: 45,
                reference: 'gridBtnDelete',
                menuDisabled: true,
                cell: {
                    xtype: 'widgetcell',
                    widget: {
                        xtype: 'button',
                        ui: 'mh-data-view-grid-btn-destroy',
                        tooltip: this.getTranslation('btnDelete'),
                        iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDestroy'),
                        handler: function(btn){
                            var rec = btn.ownerCmp.ownerCmp.getRecord();
                            if(rec) {
                                me.deleteLink(rec);
                            }
                        }
                    }
                },
                hidden: true
            });
        },

        /**
         * d&d plugin default proxy content presenter fn - extracts name off a record
         * @param recs
         */
        contentPresenterFn: function(recs){
            var contentHtml = [];
            for(var r in recs){
                contentHtml.push(
                    recs[r].get('name')
                );
            }

            return contentHtml.join('<br/>')
        },

        /**
         * disables or enables grid's dd;
         * @param disable
         */
        setDdPluginDisabled: function(disable){

            //disable dragdrop plugin in standard mode
            Ext.Array.each(this.grid.getPlugins(), function(p){
                if(Ext.getClassName(p) === 'mh.plugin.grid.DragDrop'){
                    if(disable){
                        p.disable();
                    }
                    else {
                        p.enable();
                    }
                    return false;
                }
            });
        },

        /**
         * Creates a grid store instance
         */
        configureStore: function(){
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

            this.getViewModel().setStores({
                gridstore: this.gridStore
            });
        },


        /**
         * Sets the grid editable - makes it possible to edit the data
         */
        setEditable: function(editable){

            this.lookupReference('btnAddLink').setVisibility(editable);

            //does not seem to work with widget cell, so explicitly calling show / hide
            //this.lookupReference('gridBtnDelete').setVisibility(editable);

            //make grid reorderable
            this.setDdPluginDisabled(!editable);

            //start monitoring grid change events
            if(editable){
                this.lookupReference('gridBtnDelete').show();
                this.gridStore.on('datachanged', this.onStoreDataChanged, this);
            }
            else {
                this.lookupReference('gridBtnDelete').hide();
                this.gridStore.un('datachanged', this.onStoreDataChanged, this);
            }
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
            //this should give a url contexted to an org
            var url = mh.mixin.ApiMap.getApiEndPointUrl(this.apiMapKey)
                //and this should replace the parent token
                .replace(this.parentIdentifierToken, rec.get('uuid'));

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
            if(this.boundRec && this.boundRec.get('uuid') && !this.storeLoaded){
                this.loadStore();
            }
        },

        /**
         * returns a set of objects currently present in the links grid
         */
        getLinkedObjects: function(){
            return this.gridStore.getRange();
        },

        /**
         * whether or not there are changes in the handled links collection
         * @returns {boolean}
         */
        hasChanges: function(){
            return this.linksModified;
        },

        /**
         * Gets the current changes in a form of a diff. Returns an object that contains the valid createLink collections
         * @param force - this allows reading links without having to modify them first
         * @returns {*}
         */
        getChanges: function(force){
            var diff = null,
                upserts, u, ulen,
                store, upsert, destroy, d, dlen;

            if(this.linksModified || force){

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
                },
                linkData = this.getLinkData(r);
            if(order !== undefined){
                ri.sortOrder = order;
            }
            if(linkData){
                ri.linkData = linkData;
            }
            return ri;
        },

        /**
         * gets link data for a specified record; by default just returns the content of 'linkData' field
         * @param r
         * @template
         */
        getLinkData: function(r){
            return r.get('linkData') || null;
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
        deleteLink: function(record){
            if(!record.get(this.tempLinkIdentifier)){
                this.linksToDestroy.push(record);
            }
            else {
                //a temp link has been removed, so there are changes that require tracking - for example link order
                this.linksModified = true;
            }

            this.gridStore.remove(record);
        },


        getLinksPicker: function(btn){
            //see if the links picker is already present and instantiate it if not
            if(!this.linksPicker){

                var vw = this.getView();

                this.linksPicker = Ext.create('mh.module.dataView.desktop.links.LinksPicker', {
                    deferLinksPickerRefresh: this.getView().getDeferLinksPickerRefresh(),
                    width: vw.getLinksPickerWidth() || 600,
                    height: vw.getLinksPickerHeight() || 500
                });

                this.linksPicker.setDataView(this.instantiateDataView());

                //need to get the data, huh?
                this.linksPicker.on('linkspicked', this.onLinksPicked, this);
            }
            this.linksPicker.animateTarget = btn;

            return this.linksPicker;
        },

        /**
         * btn add link click callback
         */
        onBtnAddLinkClick: function(btn){
            this.getLinksPicker(btn).show();
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
                    if(!inst.selMode){
                        inst.selMode = this.selMode;
                    }
                }
            }
            else {
                //A default view so the misconfig is obvious
                inst = {
                    xtype: 'container',
                    html: 'Looks like you misconfigured the links grid a bit... please configure it with a valid data view.'
                };
            }

            return inst;
        },

        configureTitle: function(){
            var vw = this.getView(),
                title = this.getTranslation('title'),
                dataViewTitle;

            //do not apply title if explicitly provided
            if(vw.getTitle()){
                return;
            }

            //title not explicitly set, so try to obtain it off the links picker
            dataViewTitle = this.getLinksPicker().getDataViewTitle();

            //trying to obtain title off the dataview - in order to not repeat the code, just talking to links picker directly
            //this is a bit bad though

            if(dataViewTitle) {
                title += this.getTranslation('titleSeparator') + dataViewTitle;
            }

            vw.setTitle(title);
        }
    });
}());
