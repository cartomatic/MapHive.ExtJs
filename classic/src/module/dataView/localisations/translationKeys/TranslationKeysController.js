//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.translationKeys.TranslationKeysController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-translation-keys',

        requires: [
            'mh.module.dataView.localisations.translationKeys.TranslationKeysLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.CallMeParent',
            'mh.mixin.GridUtils',
            'mh.mixin.PublishApi'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);

            this.publishApi('setContext');

            //disable the Create btn; can only create new translation keys in scope of a localisation class
            this.lookupReference('gridTbar').disable();
            this.lookupReference('pagingToolbar').disable();

        },

        /**
         * currently bound localisation class; used to set the context for the store and newly created translation keys
         */
        currentLocalisationClass: null,

        /**
         * sets the localisation class context for this module
         * @param localisationClass
         */
        setContext: function(localisationClass){
            this.currentLocalisationClass = localisationClass;

            var store = this.getViewModel().get('gridstore');

            if(localisationClass){
                this.lookupReference('gridTbar').enable();
                this.lookupReference('pagingToolbar').enable();

                //set a filter on the store
                store.addFilter({
                    property: 'localisationClassUuid',
                    value: localisationClass.get('uuid'),
                    operator: 'guid'
                });

                //and load it
            }
            else {
                this.lookupReference('gridTbar').disable();
                this.lookupReference('pagingToolbar').disable();

                //wipe put the store data.
                store.removeFilter({
                    property: 'localisationClassUuid'
                }, true);
                store.loadData([]);
            }
        },

        /**
         * btn create click callback
         * @param btn
         */
        onBtnCreateClick: function(btn){

            var editor = this.getEditor(btn),
                store = this.getViewModel().getStore('gridstore'),
                //grab the model off the gridstore
                model = store.getModel(),
                rec;

            //do make sure editor instance is available
            if(!editor){
                return;
            }

            //bind an empty rec to the editor
            rec = Ext.create(model, {
                localisationClassUuid: this.currentLocalisationClass.get('uuid')
            });

            editor.setRecord(rec);

            editor.show();
        },


        /**
         * Custom renderer for the translations column
         * @param value
         * @param metadata
         * @param rec
         * @param rowIdx
         * @param colIdx
         * @param store
         * @param view
         */
        translationsRenderer: function(value, metadata, rec, rowIdx, colIdx, store, view){
            var ret = '',
                langs = Ext.Object.getKeys(value),
                l = 0, len = langs.length;

            if(len > 0){
                ret = [];
                for(l; l < len; l++){
                    ret.push(
                        '<b>' + langs[l] + '</b>: ' + value[langs[l]]
                    );
                }
                ret = ret.join('<br/>');
            }

            return ret;
        }
    });

}());