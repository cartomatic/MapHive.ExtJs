//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 5/4/2016.
     */
    Ext.define('mh.module.auth.AuthController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-auth',

        requires: [
            'mh.module.auth.AuthLocalisation'
        ],

        mixins: [
            'mh.communication.MsgBus',
            'mh.mixin.CustomConfig',
            'mh.mixin.Localisation',
            'mh.mixin.PublishApi'
        ],

        /**
         * @event auth::authenticateuser
         * @param {Object} e
         * @param {string} e.email
         * @param {string} e.pass
         */

        /**
         * @event auth::resetpass
         * @param {Object} e
         * @param {string} e.email
         */


        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalisationToViewModel();

            this.applyCustomViewConfig();

            this.publishApi(['showLogonView']);
            //<debug>
            this.publishApi(['showLogonViewWithAutoLogon']);
            //</debug>


            this.getView().on('hide', this.onHide, this);

            //some global evts:
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
            this.watchGlobal('auth::userauthenticationfailed', this.onUserAuthenticationFailed, this);
            this.watchGlobal('auth::passreset', this.onPassReset, this);
            this.watchGlobal('auth::passresetfailed', this.onPassResetFailed, this);
        },

        /**
         * view hide callback
         * @private
         */
        onHide: function(){
            this.reset();
        },

        /**
         * resets the views
         * @private
         */
        reset: function(){
            this.lookupReference('txtEmail').setValue(null);
            this.lookupReference('txtPass').setValue(null);
            this.lookupReference('txtForgotPassEmail').setValue(null);
            this.unmask();
        },

        /**
         * unmasks the views
         * @private
         */
        unmask: function(){
            this.lookupReference('loginView').unmask();
            this.lookupReference('forgotPassView').unmask();
        },

        /**
         * Traps an enter key within email or password field
         * @param txtField
         * @param e
         * @private
         */
        trapLoginEnter: function(txtField, e){
            if (e.getKey() === e.ENTER) {

                if(txtField === this.lookupReference('txtForgotPassEmail')){
                    //looks like this is a pass reset
                    this.doPassReset();
                }
                else {
                    this.doAuth();
                }
            }
        },

        /**
         * shows a logon view
         * @param callback
         */
        showLogonView: function(){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
            this.getView().show();
        },

        //<debug>
        /**
         * shows a logon view, fills in the credentials and triggers authentication; debug only, as method gets truncated in the deploy build
         */
        showLogonViewWithAutoLogon: function(email, pass){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
            this.lookupReference('txtEmail').setValue(email);
            this.lookupReference('txtPass').setValue(pass);
            this.getView().show();
            this.doAuth();
        },
        //</debug>

        /**
         * forgot pass btn click callback
         * @param btn
         * @private
         */
        onForgotPassBtnClick: function(btn){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('forgotPassView'));
        },

        /**
         * reset pass cancel btn click
         * @param btn
         * @private
         */
        onResetPassCancelBtnClick: function(btn){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
        },

        /**
         * reset pass btn click callback
         * @private
         */
        onResetPassBtnClick: function(){
            this.doPassReset();
        },

        /**
         * login btn click callback
         * @private
         */
        onLoginBtnClick: function(){
            this.doAuth();
        },

        /**
         * Collects the auth data and passes it via evt so auth ctrl can do its work
         * @private
         */
        doAuth: function(){
            this.lookupReference('loginView').mask(this.getTranslation('authMask'));

            this.fireGlobal(
                'auth::authenticateuser',
                {
                    email: this.lookupReference('txtEmail').getValue(),
                    pass: this.lookupReference('txtPass').getValue()
                }
            );
        },

        /**
         * user suthenticated callback
         * @private
         */
        onUserAuthenticated: function(){
            //not much more to do, huh?
            this.getView().hide();
        },

        /**
         * user auth failed callback
         * @private
         */
        onUserAuthenticationFailed: function(){
            this.unmask();

            //give a feedback msg
            Ext.Msg.show({
                title: this.getTranslation('authFailureTitle'),
                message: this.getTranslation('authFailureMsg'),
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });

        },

        /**
         * collects the pass reset data and passes it via evt so auth ctrl can do its work
         * @private
         */
        doPassReset: function(){
            this.lookupReference('forgotPassView').mask(this.getTranslation('authResetPass'));

            this.fireGlobal(
                'auth::resetpass',
                {
                    email: this.lookupReference('txtForgotPassEmail').getValue()
                }
            );
        },

        /**
         * pass reset success callback
         * @private
         */
        onPassReset: function(){
            //go back to logon view
            this.onResetPassCancelBtnClick();

            //and give feedback msg
            Ext.Msg.show({
                title: this.getTranslation('resetPassConfirmationTitle'),
                message: this.getTranslation('resetPassConfirmationMsg'),
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        },

        /**
         * pass reset failure callback
         * @private
         */
        onPassResetFailed: function(){
            this.unmask();

            //give a feedback msg
            Ext.Msg.show({
                title: this.getTranslation('resetPassFailureTitle'),
                message: this.getTranslation('resetPassFailureMsg'),
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });

        }
    });

}());