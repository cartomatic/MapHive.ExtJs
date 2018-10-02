//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.navMenu.NavMenuController', {
        extend: 'Ext.app.ViewController',

        requires: [
            'Ext.data.StoreManager',
            'mh.FontIconsDictionary',
            'mh.data.model.User',
            'mh.module.navMenu.Icons'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.UserCfg',
            'mh.communication.MsgBus',
            'mh.mixin.UserAppsUtils',
            'mh.mixin.PublishApi',
            'mh.mixin.CallMeParent'
        ],

        init: function() {
            this.injectLocalizationToViewModel();

            this.updateUserInfo();
            this.getUserProfile();

            this.watchGlobal('user::profilepicturechanged', this.updateUserInfo, this);

            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
            this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);
        },

        /**
         * user authenticated callback
         */
        onUserAuthenticated: function(){
            //obtain user info!
            this.userProfile = null;
            this.getUserProfile();
        },

        /**
         * user logged off callback
         */
        onUserLoggedOff: function(){
            this.userProfile = null;
            this.updateUserInfo();
        },

        /**
         * currently bound user profile
         */
        userProfile: null,

        getUserProfile: function(){
            var tunnel = this.getTunnelId();
            this.watchGlobal('auth::userprofileretrieved', this.onUserProfileRetrieved, this, {single: true, tunnel: tunnel});
            this.fireGlobal('auth::getuserprofile', null, {tunnel: tunnel});
        },

        /**
         * user profile retrieved callback
         * @param userProfile
         */
        onUserProfileRetrieved: function(userProfile){
            this.userProfile = userProfile;
            this.updateUserInfo();
        },

         /**
         * sets user img in the profile btn
         * @template
         */
        updateUserInfo: Ext.emptyFn,


        /**
         * profile btn tap handler
         */
        onProfileBtnTap: function() {

            if(this.userProfile){
                this.redirectTo(this.getView().getUserProfileRoute() || 'unknown');
                this.collapse();
            }
            else {
                //just let the global Auth controller know user wants to authenticate
                this.fireGlobal('auth::requestuserauth');
            }
        },

        /**
         * log off btn tap handler
         */
        onLogOffBtnTap: function() {
            var currentApp = this.getCurrentApp(),
                msg = currentApp && currentApp.get('requiresAuth') ?
                    this.getTranslation('logOffConfirmMsgWithReload') :
                    this.getTranslation('logOffConfirmMsgNoReload');

            var me = this,
                dialog = Ext.create({
                    xtype: 'dialog',
                    title: me.getTranslation('logOffConfirmTitle'),
                    html: msg,
                    bodyPadding: 20,
                    width: 350,
                    buttons: {
                        yes: {
                            ui: 'base',
                            text: me.getTranslation('yes'),
                            handler: function() {
                                dialog.destroy();

                                me.fireGlobal('loadmask::show', me.getTranslation('logOffMask'));

                                //let the auth controller do the work for us
                                me.fireGlobal('auth::requestuserlogoff');

                                //wait a bit and finalise
                                Ext.defer(function(){
                                    me.fireGlobal('loadmask::hide');
                                    if(currentApp && currentApp.get('requiresAuth')){
                                        //need to reload to home as the current app requires auth!
                                        me.fireGlobal('root::reloadapp', me.getHomeApp());
                                    }
                                }, 1000);
                            }
                        },
                        no: {
                            ui: 'base',
                            text: me.getTranslation('no'),
                            handler: function() {
                                dialog.destroy();
                            }
                        }
                    }
                });

            dialog.show();
        }

    });
    
}());