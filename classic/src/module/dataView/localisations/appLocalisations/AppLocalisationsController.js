//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.appLocalizations.AppLocalizationsController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-app-localizations',

        requires: [
            'mh.module.dataView.localizations.appLocalizations.AppLocalizationsLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.CallMeParent',
            'mh.mixin.GridUtils'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);

            //wire up some listeners on the objects, so can specify interactions between them
            this.lookupReference('localizationClasses').lookupReference('grid').on('selectionchange', this.onLocalizationClassesSelectionChange, this);

        },

        /**
         * localization classes selection change callback
         * @param grid
         * @param selected
         * @param eOpts
         */
        onLocalizationClassesSelectionChange: function(grid, selected, eOpts){
            this.lookupReference('translationKeys').setContext(selected.length > 0 ? selected[0] : null);
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