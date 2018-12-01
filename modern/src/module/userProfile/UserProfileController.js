//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 24.11.2018.
     */
    Ext.define('mh.module.userProfile.UserProfileController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-user-profile',

        requires: [
            'mh.module.userProfile.UserProfileLocalization',
            'mh.module.auth.PassChange'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.UserCfg',
            'mh.mixin.ApiMap',
            'mh.mixin.InitialCfg',
            'mh.data.Ajax'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            //need to load langs store for combo
            this.getViewModel().getStore('langs').loadData(mh.localization.Localization.getSupportedLangs());
            //and set current lang
            this.lookupReference('langSwitcher').setValue(this.getMhCfgProperty('langCode'));
        },

        /**
         * loads user profile on show
         */
        onShow: function(){
            var me = this,
                cfg = {
                    url: this.getApiEndPointUrl('userprofile'),
                    success: this.onProfileLoadSuccess,
                    failure: this.onProfileLoadFailure,
                    exceptionMsg: this.getTranslation('profileLoadFailure'),
                    scope: this
                },
                op;


            op = function() {
                me.fireGlobal('loadmask::show', me.getTranslation('profileLoadMask'));
                me.doGet(cfg);
            };

            //retry fn
            cfg.retry = op;

            op();
        },

        /**
         * profile load susscess handler
         * @param rec
         */
        onProfileLoadSuccess: function(data){
            this.getViewModel().set('record', Ext.create('mh.data.model.OrganizationUser', data));
            this.fireGlobal('loadmask::hide');
        },

        /**
         * profile load failure handler
         */
        onProfileLoadFailure: function(){
            this.getViewModel().set('record', null);
            this.fireGlobal('loadmask::hide');
            this.redirectTo(Ext.getApplication().getDefaultToken());
        },

        /**
         * @private
         */
        passChangeUi: null,

        /**
         * btn change pass tap handler
         */
        onBtnChangePassTap: function(){
            if(!this.passChangeUi){
                this.passChangeUi = Ext.create('mh.module.auth.PassChange');
            }
            this.passChangeUi.show();
        },

        /**
         * lang combo change evt handler
         * @param cmb
         * @param newV
         * @param oldV
         */
        onLangChange: function(cmb, newV, oldV){
            mh.localization.Localization.switchLang(newV);
        },

        /**
         * profile save changes btn tap handler
         */
        onBtnSaveChangesTap: function(){

            var me = this,
                rec = me.getViewModel().get('record'),
                //save op cfg
                cfg = {
                    scope: this,
                    success: this.onSaveProfileSuccess,
                    failure: this.onSaveProfileFailure,
                    exceptionMsg: this.getTranslation('profileSaveFailure'),
                    autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                    suppress400: true//so can handle 400 here
                },

                //request callback
                callback = this.generateModelRequestCallback(cfg),

                op = function() {
                    var saveCfg = {
                        callback: callback
                    };

                    //customise save url for the proxy!
                    //this is needed as org user proxy url is dynamic
                    saveCfg.url = me.getApiEndPointUrl('organizationUsers');

                    me.fireGlobal('loadmask::show', me.getTranslation('profileSaveLoadMask'));
                    rec.save(saveCfg);
                };

            //retry fn
            cfg.retry = op;

            op();

        },

        onSaveProfileSuccess: function(rec){
            this.fireGlobal('loadmask::hide');

            this.fireGlobal('userprofile::changed', rec);
        },

        onSaveProfileFailure: function(){
            this.fireGlobal('loadmask::hide');
        },

        /**
         * resetds user photo
         */
        onUserProfilePhotoReset: function(roundImg){
            this.getViewModel().get('record').set('profilePicture', null);
            //custom 'no'profile' img
            roundImg.setImage(this.getViewModel().get('record').get('profilePictureGeneric'));
        },

        onUserProfilePhotoChanged: function(roundImg, imgData){
            this.getViewModel().get('record').set('profilePicture', imgData);
        }

    });
}());
