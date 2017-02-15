(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.auth.AccountEditorController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-auth-account-editor',

        requires: [
            'mh.module.auth.AccountEditorLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.communication.MsgBus'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalisationToViewModel();

            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
            this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);

            this.getUserProfile();
        },

        /**
         * user authenticated callback
         */
        onUserAuthenticated: function(){
            //obtain user info!
            this.getViewModel().set('rec', null);
            this.getUserProfile();
        },

        /**
         * user logged off callback
         */
        onUserLoggedOff: function(){
            this.getViewModel().set('rec', null);

        },

        /**
         * initiates a procedure of obtaining user info
         */
        getUserProfile: function(){
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
            this.getViewModel().set('rec', userProfile);
        }
    });
    
}());
    