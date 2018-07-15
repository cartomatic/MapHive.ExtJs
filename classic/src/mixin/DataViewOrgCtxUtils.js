(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * handles org ctx context change related functionality for a standard data view.
     * Created by domin on 27.02.2017.
     */
    Ext.define('mh.mixin.DataViewOrgCtxUtils', {

        mixins: [
            'mh.mixin.ApiMap'
        ],

        /**
         * @cfg {Boolean} [avoidAutoReloadOnOrgContextChange=false]
         * this is actually a property that should be set on a view that uses this mixin in its controller
         * when true, the view will not auto reload on org ctx changes
         */

        /**
         * API endpoint to be used for the org url generation
         */
        apiEndpoint: null,

        /**
         * sets up org context related functionality, so a view can adjust its content based on the scoped organisation
         * @param apiEndpoint
         */
        setUpOrgContextHandlers: function(apiEndpoint){
            if(!apiEndpoint){
                throw 'API endpoint needs to be configured dude!';
            }
            this.apiEndpoint = apiEndpoint;

            this.wireUpActivateListeners();

            this.watchGlobal('org::changed', this.onOrgChanged, this);

            //also wrap the get editor fn so can adjust endpoints dynamically
            this.getEditorOrig = this.getEditor;
            this.getEditor = Ext.bind(function(btn){
                var editor = this.getEditorOrig(btn);
                editor.getForm().setCustomUrl(
                    this.getApiEndPointUrl(apiEndpoint).replace(this.getApiMapOrgIdentifier(), this.getCurrentOrgId())
                );
                return editor;
            }, this);

            //and override the deletion op generator fn
            this.prepareDeletionOp = Ext.bind(function(rec){
                var me = this,
                    url = this.getApiEndPointUrl(apiEndpoint).replace(this.getApiMapOrgIdentifier(), this.getCurrentOrgId()),
                    cfg = {
                        scope: me,
                        success: me.onRecDeleteSuccess,
                        failure: me.onRecDeleteFailure,
                        exceptionMsg: this.getTranslation('deleteFailureMsg'),
                        autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                        suppress400: true//so can handle 400 here
                    },
                    callback = me.generateModelRequestCallback(cfg),

                    op = function(){
                        rec.erase({
                            callback: callback,
                            url: url
                        });
                    };

                cfg.retry = op;

                return op;
            }, this);
        },

        /**
         * tries to wire up activate / deactivate listeners on a view itself or its parents depending on the parent type
         */
        wireUpActivateListeners: function(){

            //Note:
            //try to guess where to wire up the activate event listeners.
            //activate deactivate is problematic, because it does not cascade down properly.
            //so when a baseDataView is nested, it may not really hear its own activate

            var parent = this.getView().up(),
                evtsView = this.getView(),
                parents = [
                    'window' //more to come. perhaps panel?
                ];

            //for the time being search just one lvl up;
            if(
                Ext.Array.contains(parents, parent.xtype) ||
                Ext.Array.contains(parents, parent.superclass.xtype)
            ){
                evtsView = parent;
            }

            //observing layout evts is the way to know when this comp has been shown
            evtsView.on('activate', this.onViewShow, this);
            evtsView.on('deactivate', this.onViewHide, this);
        },


        /**
         * whether or not the component is visible;
         * IMPORTANT - must be able to observe its own activate / deactivate events! levels of nesting do have importance!
         */
        visible: false,

        /**
         * view deactivate callback; just flags self internally as hidden
         */
        onViewHide: function(){
            this.visible = false;
        },

        /**
         * timeout identifier for the internal view show callback
         */
        internalViewShowScheduler: null,

        /**
         * afterlayout callback handler; triggers store reloads and such
         */
        onViewShow: function(){
            this.visible = true;

            //basic flow is: get the org, work out the store url and update store's proxy, trigger store refresh

            var tunnel = this.getTunnelId();
            this.watchGlobal('org::context', this.orgCtxRetrieved, this, {single: true, tunnel: tunnel});
            this.fireGlobal('org::getcontext', null, {tunnel: tunnel});
        },

        /**
         * gets a current org's identifier
         * @param callback
         * @returns {*}
         */
        getCurrentOrgId: function(){
            if(this.currentOrg){
                return this.currentOrg.get('uuid');
            }
        },

        /**
         * gets the name of the current org if any
         * @returns {*}
         */
        getCurrentOrgNameOrSlug: function(){
            if(this.currentOrg){
                return this.currentOrg.get('displayName') || this.currentOrg.get('slug');
            }
        },

        /**
         * currently scoped org
         */
        currentOrg: null,

        /**
         * org changed callback
         * @param org
         */
        onOrgChanged: function(org){
            this.currentOrg = org;
            this.reloadStoreOnOrgCtxChange();
            this.internalOrgChangeNotify();
        },

        /**
         * tunnelled org::getcontext callback
         * @param orgCtx
         */
        orgCtxRetrieved: function(orgCtx){
            this.currentOrg = orgCtx.currentOrg;
            this.reloadStoreOnOrgCtxChange();
            this.internalOrgChangeNotify();
        },

        /**
         * last store url used to load the data
         */
        lastDataUrl: null,

        /**
         * reloads the store for given org on org ctx change or view show. when org ctx has not changed or the view seems to be hidden reload is ignored
         */
        reloadStoreOnOrgCtxChange: function(){
            if(!this.visible){
                return;
            }

            var newUrl = this.getApiEndPointUrl(this.apiEndpoint).replace(this.getApiMapOrgIdentifier(), this.getCurrentOrgId());
            if(newUrl != this.lastDataUrl){

                //note: in some scenarios, because of some reason (late binding perhaps) cannot obtain the gridstore off the viewmodel; in suchscenarios just wait a bit
                if(this.getViewModel().get('gridstore')){
                    this.lastDataUrl = newUrl;
                    this.getViewModel().get('gridstore').getProxy().setUrl(newUrl);

                    //check if should reload.
                    if(this.getView().avoidAutoReloadOnOrgContextChange !== true){
                        this.reloadGrid();
                    }

                }
                else {
                    //this should queue it for execution appropriately
                    Ext.defer(this.reloadStoreOnOrgCtxChange, 1, this);
                }
            }
        },

        /**
         * executes an internal org ctx change callback when declared
         */
        internalOrgChangeNotify: function(){
            if(Ext.isFunction(this.orgCtxChanged)){
                this.orgCtxChanged(this.currentOrg);
            }
        },

        /**
         * @template
         * @param org
         * overwrite if custom org ctx change handling is required in addition to what this mixin handles
         */
        orgCtxChanged: null
    });
    
}());