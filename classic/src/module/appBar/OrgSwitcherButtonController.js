(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.appBar.OrgSwitcherButtonController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-org-switcher-desktop-button',

        mixins: [
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.ApiMap',
            'mh.mixin.UrlUtils',
            'mh.mixin.UserAppsUtils',
            'mh.mixin.Localization'
        ],

        requires: [
            'mh.data.model.Organization',
            'mh.module.appBar.OrgSwitcherButtonLocalization'
        ],

        /**
         * Called when the view is created
         */
        init: function() {

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

                        this.watchGlobal('org::changed', this.onOrgChanged, this);

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
            if(btn.getMenu().items.items.length > 0){
                btn.showMenu();
            }
        },

        /**
         * user authenticated, so need to get user orgs and load the first one
         */
        onUserAuthenticated: function(tokens){
            if(tokens.accessToken){
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
         * @param orgCtx.userOrgs
         * @param orgCtx.currentOrg
         */
        orgCtxRetrieved: function(orgCtx){
            //here should have the current user org to put into the btn, and a list of orgs to put into the menu

            var vm = this.getViewModel();

            vm.set('currentOrg', orgCtx.currentOrg);
            vm.set('userOrgs', orgCtx.userOrgs);

            this.updateOrgMenu();

            if(orgCtx.currentOrg){
                this.getView().show();
            }
        },

        /**
         * recreates the orgs btn menu
         */
        updateOrgMenu: function(){

            var btn = this.getView(),
                menu = btn.getMenu(),
                vm = this.getViewModel(),
                currentOrg = vm.get('currentOrg'),
                userOrgs = vm.get('userOrgs');


            //cleanup the menu
            menu.removeAll();

            //recreate the menu
            Ext.Array.each(userOrgs, function(org) {

                //skip the current org - it gets displayed in the button
                if(org === currentOrg){
                    return;
                }

                menu.add({
                    //maybe some icon for an org...
                    text: org.get('displayName') || org.get('slug'),
                    listeners: {
                        click: 'onBtnOrgChangeClick'
                    },
                    org: org
                });
            });
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
         * changes organization
         * @param org
         */
        changeOrg: function(org){
            if(!org){
                return;
            }

            this.getView().disable();

            //should check if the new org that the context is being switched to has an access to this app!

            Ext.getBody().mask(this.getTranslation('orgSwitchLoadMask'));

            var currentApp = this.getCurrentApp(),
                me = this;
            if(!currentApp){
                //uhuh, no apps data yet, need to get some. this should seldom be the case though
                this.getApps(function(apps){
                    currentApp = me.getCurrentApp();
                    me.changeOrgInternal(org, currentApp);
                });
            }
            else {
                this.changeOrgInternal(org, currentApp);
            }
        },

        /**
         * internal or change
         * @param org
         * @param app
         */
        changeOrgInternal: function(org, app){
            this.doGet({
                url: this.getApiEndPointUrl('orgHasAppAccess')
                    .replace(this.getApiMapOrgIdentifier(), org.get('uuid'))
                    .replace('{appId}', app.get('uuid')),
                success: this.onCheckIfOrgCanAccessAppSuccess,
                failure: this.onCheckIfOrgCanAccessAppFailure,
                scope: {
                    self: this,
                    org: org
                }
            });
        },

        /**
         * org app access checkup succeeded
         */
        onCheckIfOrgCanAccessAppSuccess: function(canAccess){
            Ext.getBody().unmask();
            if(canAccess){
                //fire up an evt so the global orgs controller takes care of the rest!
                this.self.fireGlobal('org::change', {
                    org: this.org
                });
            }
            else {
                //use the common failure...
                this.self.orgSwitchWithAppReloadPrompt(this.org);
            }
        },


        /**
         * org app access checkup failed
         */
        onCheckIfOrgCanAccessAppFailure: function(){
            Ext.getBody().unmask();
            this.self.orgSwitchWithAppReloadPrompt(this.org);
        },

        /**
         * prompts user if one wants to continue with org change even though it means app reload
         * @param org
         */
        orgSwitchWithAppReloadPrompt: function(org){
            //give failure msg and ask if user wants to redirect to a home app on org change!
            //if ok, need to fire 2 events - org change and then app change!
            var me = this;
            Ext.Msg.show({
                title: this.getTranslation('orgHasNoAppAccessTitle'),
                message: this.getTranslation('orgHasNoAppAccessMsg'),
                width: 350,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(btn){
                    if(btn === 'yes'){
                        me.fireGlobal('org::change', {org: org});
                        me.fireGlobal('root::reloadapp', me.getDashboardApp());
                    }
                    else {
                        //nothing changed, so just enable the btn
                        me.getView().enable();
                    }
                }
            });
        },

        /**
         * org changed reported from global orgs ctrl
         * @param org
         */
        onOrgChanged: function(org){
            this.getViewModel().set('currentOrg', org);
            this.updateOrgMenu();

            this.getView().enable();
        }

    });
    
}());
    