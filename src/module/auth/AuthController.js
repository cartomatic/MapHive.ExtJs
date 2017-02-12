//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

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
            'mh.mixin.PublishApi',
            'mh.mixin.UserAppsUtils'
        ],

        /**
         * @event auth::authenticateuser
         * @param {Object} e
         * @param {string} e.email
         * @param {string} e.pass
         */

        /**
         * @event auth::passresetrequest
         * @param {Object} e
         * @param {string} e.email
         */

        /**
         * @event auth::activateaccount
         * @param e.verificationKey
         * @param e.initialPassword
         */

        /**
         * @event auth::userauthcancel
         * fired when user auth window is dismissed
         */

        /**
         * Called when the view is created
         */
        init: function () {
            this.injectLocalisationToViewModel();

            this.applyCustomViewConfig();

            this.publishApi(['showLogonView', 'showAccountActivationView', 'autoAccountActivate', 'showPassResetView']);
            //<debug>
            this.publishApi(['showLogonViewWithAutoLogon']);
            //</debug>


            this.getView().on('hide', this.onHide, this);

            //some global evts:
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
            this.watchGlobal('auth::userauthenticationfailed', this.onUserAuthenticationFailed, this);
            this.watchGlobal('auth::passresetrequested', this.onPassResetRequestSuccess, this);
            this.watchGlobal('auth::passresetrequestfailed', this.onPassResetRequestFailure, this);

            this.watchGlobal('auth::accountactivated', this.onAccountActivated, this);
            this.watchGlobal('auth::accountactivationfailed', this.onAccountActivationFailed, this);

            this.watchGlobal('auth::passreset', this.onPassReset, this);
            this.watchGlobal('auth::passresetfailed', this.onPassResetFailed, this);

            //hide account create if said so
            if(this.getView().getDisableAccountCreation()){
                this.lookupReference('createAccountSeparatorBar').hide();
                this.lookupReference('createAccountBar').hide();
            }
            else {
                //inject ui
                var accountCreator = this.lookupReference('cardLayout').add(
                    Ext.create(this.getView().getAccountCreatorUi(), {
                        reference: 'accountCreatorUi'
                    })
                );

                //and wire up some evts
                accountCreator.on('accountcreatefinished', this.onAccountCreateFinished, this);
            }

            //in order to maitain app stability apps info is required, so when user decides to cancel the auth he is redirected to the home app.
            //executing get apps evt callback should do the trick
            this.getApps();
        },

        onAppsRetrieved: Ext.empyFn,

        /**
         * view hide callback
         * @private
         */
        onHide: function () {
            this.reset();
        },

        /**
         * resets the views
         * @private
         */
        reset: function () {
            this.lookupReference('txtEmail').setValue(null);
            this.lookupReference('txtPass').setValue(null);
            this.lookupReference('txtForgotPassEmail').setValue(null);
            this.lookupReference('txtPassReset').setValue(null);
            this.lookupReference('txtPassResetRepeat').setValue(null);
            this.lookupReference('txtVerificationKey').setValue(null);
            this.lookupReference('txtInitialPassword').setValue(null);
            this.unmaskAll();
        },

        /**
         * unmasks the views
         * @private
         */
        unmaskAll: function () {
            this.unmask(this.lookupReference('loginView'));
            this.unmask(this.lookupReference('forgotPassView'));
            this.unmask(this.lookupReference('resetPassView'));
            this.unmask(this.lookupReference('activateAccountView'));
        },

        /**
         * unmasks a controller
         * @param cmp
         */
        unmask: function(cmp){
            if(Ext.toolkit === 'modern'){
                cmp.setMasked(false);
            }
            else {
                cmp.unmask();
            }
        },

        /**
         * masks a passed component
         * @param cmp
         * @param mask
         */
        mask: function(cmp, msg){
            if(Ext.toolkit === 'modern'){
                cmp.setMasked({
                    xtype: 'loadmask',
                    message: msg
                });
            }
            else {
                cmp.mask(msg);
            }
        },

        /**
         * Traps an enter key within email or password field
         * @param txtField
         * @param e
         * @private
         */
        trapLoginEnter: function (txtField, e) {
            if (e.getKey() === e.ENTER) {

                if (txtField === this.lookupReference('txtForgotPassEmail')) {
                    //looks like this is a pass reset
                    this.doInitPassReset();
                }
                else if (txtField === this.lookupReference('txtVerificationKey') || txtField === this.lookupReference('txtInitialPassword')) {
                    this.doActivation();
                }
                else if (txtField === this.lookupReference('txtPassReset') || txtField === this.lookupReference('txtPassResetRepeat')) {
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
        showLogonView: function () {
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
            this.getView().show();
        },

        //<debug>
        /**
         * shows a logon view, fills in the credentials and triggers authentication; debug only, as method gets truncated in the deploy build
         */
        showLogonViewWithAutoLogon: function (email, pass) {
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
        onForgotPassBtnClick: function (btn) {
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('forgotPassView'));
        },

        /**
         * reset pass cancel btn click
         * @param btn
         * @private
         */
        onResetPassCancelBtnClick: function (btn) {
            this.unmaskAll();
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
        },

        /**
         * reset pass btn click callback
         * @private
         */
        onPassResetRequestBtnClick: function () {
            this.doPassResetRequest();
        },

        /**
         * login btn click callback
         * @private
         */
        onLoginBtnClick: function () {
            this.doAuth();
        },

        /**
         * Collects the auth data and passes it via evt so auth ctrl can do its work
         * @private
         */
        doAuth: function () {
            this.mask(this.lookupReference('loginView'), this.getTranslation('authMask'));

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
        onUserAuthenticated: function () {
            //not much more to do, huh?
            this.getView().hide();
        },

        /**
         * user auth failed callback
         * @private
         */
        onUserAuthenticationFailed: function () {
            this.unmaskAll();

            //give a feedback msg
            this.showMsg({
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
        doPassResetRequest: function () {
            this.mask(this.lookupReference('forgotPassView'), this.getTranslation('initPassResetMask'));

            this.fireGlobal(
                'auth::passresetrequest',
                {
                    email: this.lookupReference('txtForgotPassEmail').getValue()
                }
            );
        },

        /**
         * pass reset success callback
         * @private
         */
        onPassResetRequestSuccess: function () {
            //go back to logon view
            this.onResetPassCancelBtnClick();

            //and give feedback msg
            this.showMsg({
                title: this.getTranslation('passResetRequestConfirmationTitle'),
                message: this.getTranslation('passResetRequestConfirmationMsg'),
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        },

        /**
         * pass reset failure callback
         * @private
         */
        onPassResetRequestFailure: function () {
            this.unmaskAll();

            //give a feedback msg
            this.showMsg({
                title: this.getTranslation('passResetRequestFailureTitle'),
                message: this.getTranslation('passResetRequestFailureMsg'),
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        },

        /**
         * Activate account btn click handler
         */
        onActivateAccountBtnClick: function(){
            this.doActivation();
        },

        /**
         * Shows the account authentication view
         * @param verificationKey
         */
        showAccountActivationView: function (verificationKey) {
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('activateAccountView'));
            this.lookupReference('txtVerificationKey').setValue(verificationKey);
            this.getView().show();
        },

        /**
         * Shows account activation view and fires the auto activation procedure
         * @param verificationKey
         * @param initialPassword
         */
        autoAccountActivate: function (verificationKey, initialPassword) {
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('activateAccountView'));
            this.lookupReference('txtVerificationKey').setValue(verificationKey);
            this.lookupReference('txtInitialPassword').setValue(initialPassword);
            this.getView().show();
            this.doActivation();
        },

        /**
         * maksks the account activation view and fires evt to perform account activation
         */
        doActivation: function () {
            this.mask(this.lookupReference('activateAccountView'), this.getTranslation('activateAccountMask'));

            this.fireGlobal(
                'auth::activateaccount',
                {
                    verificationKey: this.lookupReference('txtVerificationKey').getValue(),
                    initialPassword: this.lookupReference('txtInitialPassword').getValue()
                }
            );
        },

        /**
         * account activated callback; resets accoutn activation view and shows logon view
         */
        onAccountActivated: function () {
            this.reset();

            //note: root ctrl also listens for the same event and handles setting up the logon view.
            //therefore need to wait a sec before showing the msg!

            //give a feedback msg
            Ext.defer(function(){
                this.showMsg({
                    title: this.getTranslation('activateAccountConfirmationTitle'),
                    message: this.getTranslation('activateAccountConfirmationMsg'),
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }, 250, this);
        },

        /**
         * account activation failed callback
         */
        onAccountActivationFailed: function (e) {
            this.reset();

            if(e.verificationKeyStale){
                this.showMsg({
                    title: this.getTranslation('activateAccountVerificationKeyStaleTitle'),
                    message: this.getTranslation('activateAccountVerificationKeyStaleMsg'),
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
            else {
                //give a feedback msg
                this.showMsg({
                    title: this.getTranslation('activateAccountFailureTitle'),
                    message: this.getTranslation('activateAccountFailureMsg'),
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        },

        /**
         * Shows pass reset ui
         * @param verificationKey
         */
        showPassResetView: function(verificationKey){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('resetPassView'));
            this.lookupReference('txtPassResetVerificationKey').setValue(verificationKey);
            this.getView().show();
        },

        /**
         * reset pass btn click calback
         */
        onResetPassBtnClick: function(){
            this.doPassReset();
        },

        /**
         * performs pass reset
         */
        doPassReset: function () {

            var newPass = this.lookupReference('txtPassReset').getValue(),
                repeatPass = this.lookupReference('txtPassResetRepeat').getValue(),
                msg, title

            //do a pass validation preflight; regex matching is done by the global Auth controller
            if(!newPass || newPass === '' || newPass === null){
                msg = this.getTranslation('resetPassFailureMsg_empty');
                title = this.getTranslation('resetPassFailureTitle_empty');
            }
            else if(newPass !== repeatPass){
                msg = this.getTranslation('resetPassFailureMsg_mismatch');
                title = this.getTranslation('resetPassFailureTitle_mismatch');
            }

            if(msg){
                this.showMsg({
                    title: title,
                    message: msg,
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
                return;
            }


            this.mask(this.lookupReference('resetPassView'), this.getTranslation('passResetMask'));

            this.fireGlobal(
                'auth::resetpass',
                {
                    newPass: newPass,
                    verificationKey: this.lookupReference('txtPassResetVerificationKey').getValue()
                }
            );
        },



        /**
         * pass reset success; resets pass reset view and shows logon view
         */
        onPassReset: function () {
            this.reset();

            //note: root ctrl also listens for the same event and handles setting up the logon view.
            //therefore need to wait a sec before showing the msg!

            //give a feedback msg
            Ext.defer(function(){
                this.showMsg({
                    title: this.getTranslation('passResetConfirmationTitle'),
                    message: this.getTranslation('passResetConfirmationMsg'),
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }, 250, this);
        },

        /**
         * pass reset failed callback
         */
        onPassResetFailed: function (e) {
            this.reset();

            var title, msg;

            switch(e.failureReason){
                case 'too_short':
                case 'not_complex_enough':
                    title = this.getTranslation('passResetFailureTitle_' + e.failureReason);
                    msg = this.getTranslation('passResetFailureMsg_' + e.failureReason);
                    break;

                default:
                    title = this.getTranslation('passResetFailureTitle');
                    msg = this.getTranslation('passResetFailureMsg');
                    break;
            }

            //give a feedback msg
            this.showMsg({
                title: title,
                message: msg,
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        },

        /**
         * shows a msg box for both modern and classic toolkits. there are some weird errs in classic when calling Ext.Msg.show, hence this helper
         * @param cfg
         */
        showMsg: function(cfg){
            if(Ext.toolkit === 'modern'){
                Ext.Msg.alert(cfg.title, cfg.message);
            }
            else {
                Ext.Msg.show(cfg);
            }
        },

        /**
         * Ext.window.Window
         * Account creator ui
         */
        accountCreator: null,

        /**
         * btm create account click handler; initiates account creation procedure
         * @param btn
         */
        onBtnCreateAccountClick: function(){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('accountCreatorUi'));
        },

        /**
         * account creator finished evt handler. brings back the logon ui
         */
        onAccountCreateFinished: function(){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
        },

        /**
         * ath cancel callback
         */
        onBtnCancelAuthClick: function(btn){
            var currentApp = this.getCurrentApp();

            //when it is detected an app requires auth the app start is put on hold and resumed when user is authenticated.
            //therefore there may be scenarios when there is no app yet as apps have not been pulled.
            //in such case assume an app requires auth and on cancel redirect to home.

            if(!currentApp || currentApp.get('requiresAuth')){
                var me = this;
                Ext.Msg.show({
                    animateTarget: btn,
                    title: this.getTranslation('cancelAuthWithReloadTitle'),
                    message: this.getTranslation('cancelAuthWithReloadMsg'),
                    width: 350,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.MessageBox.QUESTION,
                    iconCls: 'x-i54c i54c-exit-2',
                    fn: function(btn){
                        if(btn === 'yes'){
                            me.reset();
                            me.getView().hide();
                            me.fireEvent('auth::userauthcancel');
                            me.fireGlobal('root::reloadapp', me.getHomeApp());
                        }
                    }
                });
            }
            else {
                this.reset();
                this.getView().hide();
                this.fireEvent('auth::userauthcancel');
            }
        }

    });

}());