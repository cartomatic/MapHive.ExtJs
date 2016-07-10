//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.AppLocalisationsController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mofp-app-localisations',

        requires: [
            'mh.module.dataView.localisations.appLocalisations.AppLocalisationsLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.CallMeParent',
            'mh.mixin.GridUtils'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);
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