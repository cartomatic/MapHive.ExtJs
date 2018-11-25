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

            //TODO - load user profile off the server!


            var rec = Ext.create('mh.data.model.OrganizationUser', this.getCurrentUser());

            this.getViewModel().set('record', rec);

            this.lookupReference('profilePicture').setSrc(rec.get('profilePictureGetter'));

        },

        /**
         * private
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
        userProfilePhotoResetBtnTap: function(){
            this.lookupReference('profilePicture').setSrc(this.getAnonymousProfilePhotoSrc());
            this.getViewModel().get('record').set('profilePicture', null);
        },

        /**
         * upload field for picture uploads
         * @private
         */
        uploadField: null,

        userProfilePhotoAddBtnTap: function(){
            if(!this.uploadField){
                this.uploadField = document.createElement('input');
                this.uploadField.type = 'file';
                this.uploadField.accept = ".png, .jpg, .gif";
                this.uploadField.style.display = 'none';
                document.body.appendChild(this.uploadField);
                this.uploadField.addEventListener('change', {
                    handleEvent: this.onUploadProfilePicture,
                    scope: this
                });
            }

            this.uploadField.click();
        },

        /**
         * on upload profile picture handler
         * @param e
         * @param me
         * @param file
         */
        onUploadProfilePicture: function(e, me, file){
            if(typeof file === 'undefined'){
                file = e.target.files[0];
            }
            if(typeof me === 'undefined'){
                me = this.scope;
            }

            var rec = me.getViewModel().get('record'),
                reader  = new FileReader();

            reader.addEventListener("load", function () {
                rec.set('profilePicture', reader.result);

                me.lookupReference('profilePicture').setSrc(reader.result);

                //reset input, so can pick the same file again
                me.uploadField.value = '';
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }

    });
}());
