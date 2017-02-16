(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.appBar.OrgSwitcherButtonController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-org-switcher-button',

        mixins: [
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.ApiMap',
            'mh.mixin.UrlUtils'
        ],

        requires: [
            'mh.data.model.Organisation'
        ],

        /**
         * Called when the view is created
         */
        init: function() {

            return;

            //check if the tbar is visible, or it should be suppressed
            //if toolbar should be hidden, there is no point in triggering the full setup here, as the toolbar is not there anyway!
            var tunnel = this.getTunnelId();

            this.watchGlobal(
                'root::customhashparam',
                function(value){
                    if(value !== 'true'){

                        //basically whenever user authenticates it is possible to obtain some info on the orgs user has
                        this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
                        this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);

                        //there is a chance this starts after a user has been authenticated, so need to poke for user orgs anyway
                        this.getUserOrgs();
                    }
                },
                this,
                {
                    single: true,
                    tunnel: tunnel
                }
            );
            this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel});
        },

        /**
         * user orgs btn click handler - displays a list of orgs user can access
         */
        onUserOrgsBtnClick: function(btn){
            //only show menu if user has access to some more orgs...
            if(btn.getMenu().items.items.length > 1){
                btn.showMenu();
            }
        },

        /**
         * user authenticated, so need to get user orgs and load the first one
         */
        onUserAuthenticated: function(authToken){
            if(authToken){
                this.getUserOrgs();
            }
        },

        /**
         * user logged off, so no org context anymore
         */
        onUserLoggedOff: function(){
            this.getView().hide();
        },

        /**
         * gets user orgs information
         */
        getUserOrgs: function(){
            var tunnel = this.getTunnelId();
            this.watchGlobal('org::context', this.orgCtxRetrieved, this, {single: true, tunnel: tunnel});
            this.fireGlobal('org::getcontext', null, {tunnel: tunnel});
        },


        /**
         * org ctx retrieved
         * @param orgCtx
         */
        orgCtxRetrieved: function(orgCtx){
            //here should have the current user org to put into the btn, and a list of orgs to put into the menu
        },


        /**
         * looks like got some user orgs
         */
        onGetUserOrgsSuccess: function(orgs){
            var btn = this.getView(),
                menu = btn.getMenu(),
                urlOrgSlug = this.getUrlOrgIdentifier(),
                currentOrg = null,
                vm = this.getViewModel();

            this.currentOrgs = [];

            //cleanup the menu
            menu.removeAll();

            Ext.Array.each(orgs, function(org){
                var o = Ext.create('mh.data.model.Organisation', org);
                this.currentOrgs.push(o);
                menu.add({
                    //maybe some icon for an org...
                    text: o.get('displayName') || o.get('slug'),
                    listeners: {
                        click: 'onBtnOrgChangeClick'
                    },
                    org: o
                });

                if(urlOrgSlug === o.get('slug')){
                    currentOrg = o;
                }
            }, this);

            //basically if there is an org defined in the url, the btn should display that org, and otherwise, it should just scope to the first one
            if(!currentOrg){
                currentOrg = this.currentOrgs[0];
            }

            this.changeOrg(currentOrg);

            btn.show();
        },

        /**
         * btn change org handler
         * @param btn
         */
        onBtnOrgChangeClick: function(btn){
            if(btn.org !== this.getViewModel().get('currentOrg')){
                this.changeOrg(btn.org);
            }
        },

        /**
         * changes organisation
         * @param org
         */
        changeOrg: function(org){
            if(!org){
                return;
            }

            this.getViewModel().set('currentOrg', org);

            //fire it up at the root level???
            //maybe so...
            //maybe root should also listen for xwindow org changes and rebroadcast them...
            //so apps can adjust if needed....

            //own url
            //and parent / child url - it depends on where the evt initiates from
            //todo - fire root::changeorg

        }

        //TODO - listen to root::orgchanged????

        //TODO - communicate org change down the stack
        //TODO - listen org changes from the depths of the stack
    });
    
}());
    