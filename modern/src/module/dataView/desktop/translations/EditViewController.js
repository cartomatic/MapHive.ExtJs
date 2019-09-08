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

        injectTranslationFields: function(){
            let translationFields = [];
            __mhcfg__.supportedLangs.forEach(lng => {
                translationFields.push({
                    xtype: 'textareafield',
                    reference: `translation_${lng}`,
                    label: lng
                });
            });

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

            Object.getOwnPropertyNames(translations).forEach(lng => {
                let field = me.lookupReference(`translation_${lng}`);
                if(field){
                    field.setValue(translations[lng]);
                }
            });
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
        }
    });
}());
