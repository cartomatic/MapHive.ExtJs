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
         * API endpoint to be used for the org url generation
         */
        apiEndpoint: null,

        /**
         * sets up org context related functionality, so a view can adjust its content based on the scoped organisation
         */
        setUpOrgContextHandlers: function(apiEndpoint){
            if(!apiEndpoint){
                throw 'API endpoint needs to be configured dude!';
            }
            this.apiEndpoint = apiEndpoint;

            //observing layout evts is the way to know when this comp has been shown
            this.getView().on('activate', this.onViewShow, this);
            this.getView().on('deactivate', this.onViewHide, this);

            this.watchGlobal('org::changed', this.onOrgChanged, this);



            //also wrap the get editor fn so can adjust endpoints dynamically
            this.getEditorOrig = this.getEditor;
            this.getEditor = Ext.bind(function(){
                var editor = this.getEditorOrig();
                editor.getForm().setCustomUrl(
                    this.getApiEndPoint(apiEndpoint).replace(this.getParentIdentifier(), this.getCurrentOrgId())
                );
                return editor;
            }, this);

            //and override the deletion op generator fn
            this.prepareDeletionOp = Ext.bind(function(rec){
                var me = this,
                    url = this.getApiEndPoint(apiEndpoint).replace(this.getParentIdentifier(), this.getCurrentOrgId()),
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
        },

        /**
         * tunnelled org::getcontext callback
         * @param orgCtx
         */
        orgCtxRetrieved: function(orgCtx){
            this.currentOrg = orgCtx.currentOrg;
            this.reloadStoreOnOrgCtxChange();
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

            var newUrl = this.getApiEndPoint(this.apiEndpoint).replace(this.getApiMapParentIdentifier(), this.getCurrentOrgId());
            if(newUrl != this.lastDataUrl){
                this.lastDataUrl = newUrl;

                this.getViewModel().get('gridstore').getProxy().setUrl(newUrl);
                this.reloadGrid();
            }
        }
    });
    
}());