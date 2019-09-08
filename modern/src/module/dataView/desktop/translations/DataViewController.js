//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.DataViewController', {
        extend: 'mh.module.dataView.desktop.DataViewController',
        alias: 'controller.mh-desktop-translations-data-view',

        requires: [
            'mh.module.dataView.desktop.translations.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        },

        translationsRenderer: function(value, record){
            let translations = record.get('translations'),
                html = [];

            if(!translations){
                return '';
            }

            Object.getOwnPropertyNames(translations).forEach((lng) => {
                html.push(`<b>${lng}</b>: ${translations[lng]}`);
            });

            return html.join('<br/>');
        }
    });

}());