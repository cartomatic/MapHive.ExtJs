(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.02.2017.
     */
    Ext.define('mh.module.appBar.UserProfileButtonController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-user-profile-button',

        requires: [
            'mh.data.model.User',
            'mh.module.appBar.UserProfileButtonLocalization',
            'mh.module.auth.PassChange',
            'mh.module.auth.AccountEditor'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.mixin.UserAppsUtils'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            //check if the tbar is visible, or it should be suppressed
            //if toolbar should be hidden, there is no point in triggering the full setup here, as the toolbar is not there anyway!
            var tunnel = this.getTunnelId();

            this.watchGlobal(
                'root::customhashparam',
                function(value){
                    if(value !== 'true'){

                        this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
                        this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);

                        //try to obtain user profile
                        this.getUserProfile();
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
         * authenticated user profile
         */
        userProfile: null,

        /**
         * user authenticated callback
         */
        onUserAuthenticated: function(){
            //obtain user info!
            this.getViewModel().set('userProfile', null);
            this.getUserProfile();
        },

        /**
         * user logged off callback
         */
        onUserLoggedOff: function(){
            this.getViewModel().set('userProfile', null);
            this.updateState();
        },

        /**
         * initiates a procedure of obtaining user info
         */
        getUserProfile: function(){
            //disable the button?

            //set waiting icon...

            //wire up the auth::userprofileretrieved listener - whenever user profile becomes available it will be returned!
            var tunnel = this.getTunnelId();
            this.watchGlobal('auth::userprofileretrieved', this.onUserProfileRetrieved, this, {single: true, tunnel: tunnel});
            this.fireGlobal('auth::getuserprofile', null, {tunnel: tunnel});
        },


        /**
         * user profile retrieved callback
         * @param userProfile
         */
        onUserProfileRetrieved: function(userProfile){
            this.getViewModel().set('userProfile', userProfile);
            this.updateState();
        },

        /**
         * updates the state based on the current user - anonymous vs authenticated
         */
        updateState: function(){
            this.customiseMenu();
        },

        /**
         * btn click callback - customises the menu and shows it
         * @param btn
         */
        onUserProfileBtnClick: function(btn){
            btn.showMenu();
        },

        /**
         * customises menu so it adjusts its state to match the current context
         */
        customiseMenu: function(){
            var authenticated = !!this.getViewModel().get('userProfile');

            //authenticated user
            this.findMenuItem('btnLogOff').setVisible(authenticated);
            this.findMenuItem('btnChangePass').setVisible(authenticated);

            //anonymous user
            this.findMenuItem('btnLogOn').setVisible(!authenticated);
        },

        /**
         * private
         */
        menuItemsCache: null,

        /**
         * finds a menu item by ref. used as a btn cannot lookup ref...
         * @param item
         */
        findMenuItem: function(itemRefName){
            this.menuItemsCache = this.menuItemsCache || {};

            if(this.menuItemsCache[itemRefName]){
                return this.menuItemsCache[itemRefName];
            }

            var items = this.getView().getMenu().items.items,
                i = 0, len = items.length, item;
            for(i; i < len; i++){
                if(items[i].reference === itemRefName){
                    item = items[i];
                    this.menuItemsCache[itemRefName] = item;
                    break;
                }
            }
            return item;
        },

        /**
         * btn log on click handler - triggers log on window show
         * @param btn
         */
        onBtnLogOnClick: function(btn){
            //just let the global Auth controller know user wants to authenticate
            this.fireGlobal('auth::requestuserauth');
        },

        /**
         * btn log off click handler
         */
        onBtnLogOffClick: function(btn){
            var currentApp = this.getCurrentApp(),
                msg = currentApp.get('requiresAuth') ?
                    this.getTranslation('logOffWithReload') :
                    this.getTranslation('logOffNoReload');

            var me = this;
            Ext.Msg.show({
                animateTarget: btn,
                title: this.getTranslation('logOffTitle'),
                message: msg,
                width: 350,
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.QUESTION,
                iconCls: 'x-i54c i54c-exit-2',
                fn: function(btn){
                    if(btn === 'yes'){

                        me.fireGlobal('loadmask::show', me.getTranslation('logOffMask'));

                        //let the auth controller do the work for us
                        me.fireGlobal('auth::requestuserlogoff');

                        //wait a bit and finalise
                        Ext.defer(function(){
                            Ext.getBody().unmask();
                            if(currentApp.get('requiresAuth')){
                                //need to reload to home as the current app requires auth!
                                me.fireGlobal('root::reloadapp', me.getHomeApp());
                            }
                        }, 1000);
                    }
                }
            });

        },

        /**
         * @private {mh.module.auth.PassChange}
         */
        passChangeDialog: null,

        /**
         * btn change pass click callback
         * @param btn
         */
        onBtnChangePassClick: function(btn){
            if(!this.passChangeDialog){
                this.passChangeDialog = Ext.create('mh.module.auth.PassChange', {
                    animateTarget: btn
                });
            }
            this.passChangeDialog.show();
        },

        /**
         * @private {Ext.window.Window}
         * instance of mh.module.auth.AccountEditor wrapped into a window
         */
        userAccountEditor: null,

        /**
         * gets an instance of mh.module.auth.AccountEditor wrapped into a window
         * @param btn
         */
        getUserAccountEditor: function(btn){
            if(!this.userAccountEditor){
                this.userAccountEditor = Ext.create('Ext.window.Window', {
                    title: this.getTranslation('accountEditor'),
                    iconCls: 'x-i54c i54c-master-yoda',
                    animateTarget: btn,
                    width: 450,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'mh-auth-account-editor'
                        }
                    ],
                    modal: true,
                    closeAction: 'hide'
                });
            }
            return this.userAccountEditor;
        },

        /**
         * btn user info click
         * @param btn
         */
        onBtnUserInfoClick: function(btn){

            //nothing to do really...
            if(!this.getViewModel().get('userProfile')){
                return;
            }

            this.getUserAccountEditor(btn).show();
        }
    });
    
}());
    