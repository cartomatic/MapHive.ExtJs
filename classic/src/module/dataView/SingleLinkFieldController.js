(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 12-Jul-16.
     */
    Ext.define('mh.module.dataView.SingleLinkFieldController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-links-single-field',

    requires: [
        'mh.data.model.Base',
        'mh.module.dataView.LinksPicker',
        'mh.module.dataView.SingleLinkFieldLocalisation'
    ],

    mixins: [
            'mh.mixin.PublishApi',
            'mh.mixin.Localisation',
            'mh.data.Ajax'
        ],

        /**
         * @event change
         * @param {mh.module.dataView.SingleLinkField} this; fired at the view level
         * @param newV
         * @param oldV
         */

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
         * data view to be used for picking up linked objects; see full description on the view object
         * @private
         */
        dataView: null,

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
         * whether or not the current link should be removed
         */
        removeLink: false,

        /**
         * a new object that should be added as a link
         */
        newLink: null,

        /**
         * currently linked object if any
         */
        currentLink: null,

        /**
         * Called when the view is created
         */
        init: function() {
            this.publishApi('getChanges', 'setEditable');

            var vw = this.getView();

            //extract config
            this.model = vw.getModel();
            this.apiUrl = vw.getApiUrl() || '';
            this.parentIdentifierToken = vw.getParentIdentifierToken();
            this.dataView = vw.getDataView();
        },

        /**
         * Sets the field editable
         */
        setEditable: function(){
            this.lookupReference('btnSetLink').show();
            this.lookupReference('btnRemoveLink').show();
        },

        /**
         * Data is expected to be a parent model that inherits from mh.data.model.Base
         * @param rec
         */
        setContext: function(rec){

            //initial internal data holders reset and setup
            this.boundRec = rec;

            this.newLink = null;
            this.removeLink = false;
            this.currentLink = null;


            this.resetDisplay();

            //fixme - blody hell, dunno what is going on in here... I expect a rec to be null on re-bind, but sometimes an object is passed instead {external=true}; so far cannot track the problem... model, viewmodel???
            if(!rec || rec.external || !rec.get('uuid')){
                return;
            }

            var view = this.getView(),
                token = view.getParentIdentifierToken(),
                apiUrl = view.getApiUrl().replace(token, rec.get('uuid')),
                loadMask = view.getUseLoadMask()

            //basically know what model is to be read, so need to get it from the api
            if(loadMask === true){
                //this.getMaskableElement().mask(this.getTranslation('loadMask'));
                this.getMaskableElement().mask();
            }


            //pull link data
            this.doGet({
                url:  apiUrl,
                scope: this,
                success: this.onLinkedObjectLoadSuccess,
                failure: this.onLinkedObjectLoadFailure
            });
        },

        /**
         * gets an element to mask when loading the data
         * @returns {*}
         */
        getMaskableElement: function(){
            return this.getView().getLayout().innerCt;
        },

        /**
         * linked object load success
         * @param response
         */
        onLinkedObjectLoadSuccess: function(response){

            var oldV = this.currentLink;

            this.currentLink = Ext.create(this.model, response);

            this.renderRec(this.currentLink);

            this.getMaskableElement().unmask();

            this.getView().fireEvent('change', this.getView(), this.currentLink, oldV);
        },

        /**
         * link load failure
         * @param response
         */
        onLinkedObjectLoadFailure: function(response){

            //this will happen when there is no link - so in most cases 404; other errs should be handled by the ajax utils
            this.resetDisplay();

            this.getMaskableElement().unmask()
        },

        /**
         * resets the display field
         */
        resetDisplay: function(){
            this.lookupReference('displayField').setValue('');

            //notify change
            this.getView().fireEvent('change', this.getView(), null, this.newLink || this.currentLink);
        },


        /**
         * link btn click callback; shows a configured links picker
         */
        onBtnSetLinkClick: function(btn){

            if(!this.linksPicker){
                this.linksPicker = Ext.create('mh.module.dataView.LinksPicker', {
                    animateTarget: btn
                });

                this.linksPicker.setDataView(this.instantiateDataView(), 'SINGLE');

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

            //there should only be one rec (or none ;)
            if(records.length != 1)
                return;

            var oldV = this.newLink;

            this.newLink = Ext.create(this.model, records[0].getData());

            this.renderRec(this.newLink);

            //notify change
            this.getView().fireEvent('change', this.getView(), this.newLink, oldV);
        },

        /**
         * btn remove link click calback
         */
        onBtnRemoveLinkClick: function(){

            //render empy string to display field
            this.resetDisplay();

            //reset link holder
            this.removeLink = true;
        },

        /**
         * creates an 'instantiable' data view that can be added into the picker window
         */
        instantiateDataView: function(){
            var inst = null;

            if(this.dataView !== null){
                if(Ext.isString(this.dataView)){
                    //this should be a class name
                    inst = Ext.create(this.dataView);
                }
                else {
                    //right this is an object cfg...
                    inst = this.dataView;
                    inst.xtype = this.dataView.type;
                    delete inst.type;
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
        },

        /**
         * Gets the current changes in a form of a diff. Returns an object that contains the valid RelationshipItem collections
         */
        getChanges: function(){

            var diff = null;

            if(
                this.removeLink && this.currentLink || //so if there is current link and a delete btn was pressed OR
                this.newLink && this.currentLink && this.currentLink.get('uuid') !== this.newLink.get('uuid')
            ) //there is new link and its different than current link
            {
                diff = {
                    destroy: [this.currentLink.get('uuid')]
                }
            }

            if(this.newLink && !this.currentLink || this.newLink && this.currentLink && this.newLink.get('uuid') !== this.currentLink.get('uuid')){
                diff = diff || {};
                diff.upsert = [this.createRelationshipItem(this.newLink)];
            }

            return diff;
        },

        /**
         * Creates a relationShipItem object
         * @param r
         * @param order
         */
        createRelationshipItem: function(r, order){
            //basically the only thing needed at this stage is the linked object type and linked object uuid.
            //if order is provided, then order should also be set on the object, so it is possible to maintain the sorting order of linked objects
            //the outgoing model should be Emapa.WebGIS.Server.Core.Data.RelationshipItem
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
         * uses renderer to prepare the content for the display field and sets the content
         * @param rec
         */
        renderRec: function(rec){
            this.lookupReference('displayField').setValue(this.renderer(rec));
        },

        /**
         * default renderer for the display field. tries to render all the non-base rec fields one by one.
         * @param rec
         * @returns {string}
         */
        renderer: function(rec){

            //see if there is a configured one...
            if(Ext.isFunction(this.getView().getRenderer()))
                return this.getView().getRenderer()(rec);

            var baseFields = Ext.Array.map(
                    Ext.create('mh.data.model.Base').getFields(),
                    function(item, idx, arr){
                        return item.name;
                    }
                ),
                recFields = rec.getFields(),
                f = 0, flen = recFields.length,
                outObj = [];

            for(f; f < flen; f++){
                if(!Ext.Array.contains(baseFields, recFields[f].name)){
                    outObj.push('<b>' + recFields[f].name + '</b>: ' + rec.get((recFields[f].name) || '').toString());
                }
            }

            return outObj.join(', ');
        }
    });
}());