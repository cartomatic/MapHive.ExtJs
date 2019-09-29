//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.translations.EditViewController', {
        extend: 'mh.module.dataView.desktop.EditViewController',
        alias: 'controller.mh-desktop-translations-edit-view',

        requires: [
            'mh.module.dataView.desktop.translations.EditViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);

            this.getView().on('painted', this.injectTranslationFields, this, {single: true});
        },

        translationFields: null,

        injectTranslationFields: function(){
            let translationFields = [];
            __mhcfg__.supportedLangs.forEach(lng => {
                translationFields.push({
                    xtype: 'textareafield',
                    observeDirty: false, //wired up explicitly!
                    reference: `translation_${lng}`,
                    label: lng
                });
            });

            this.translationFields = translationFields;

            this.lookupReference('form').add({
                xtype: 'fieldset',
                bind: {
                    title: '{localization.translations}',
                    disabled: '{!translationsEditable}'
                },
                margin: '25 0 0 0',
                items: translationFields
            });
        },

        /**
         * record load success handler
         * @param record
         */
        onRecordLoadSuccess: function(record) {
            this.callMeParent(arguments);

            let me = this,
                translations = record.get('translations') || {};

            this.translationFields.forEach(tf => {
                let fld = me.lookupReference(tf.reference);
                fld.setValue(translations[tf.reference.replace('translation_', '')] || null);
            });

            this.endDirtyMode(true);
        },

        /**
         * collects complex form data - translations for a key
         */
        collectComplexData: function(){
            let me = this,
                record = this.getViewModel().get('record'),
                translations = Ext.clone(record.get('translations')) || {};

            __mhcfg__.supportedLangs.forEach(lng => {
                let value = me.lookupReference(`translation_${lng}`).getValue();
                if(value){
                    translations[lng] = value;
                }
                else {
                    delete translations[lng];
                }
            });

            record.set('translations', translations);
        },

        /**
         * binds dirty mode observers to translation fields
         * @param bind
         */
        bindDirtyModeCustom: function(bind){
            let me = this;
            this.translationFields.forEach(tf => {
                let fld = me.lookupReference(tf.reference);
                if(bind){
                    fld.on('change', me.__onFieldChangeForce, me);
                }
                else {
                    fld.un('change', me.__onFieldChangeForce, me);
                }
            });
        }
    });
}());
