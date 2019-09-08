//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.RecordViewModel', {
        extend: 'mh.module.dataView.RecordViewModel',
        alias: 'viewmodel.mh-desktop-translations-record-view',

        formulas: {
            expandTranslations:{
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function(rec){
                    if(!rec){
                        return '';
                    }

                    let translations = rec.get('translations'),
                        html = [];

                    Object.getOwnPropertyNames(translations).forEach((lng) => {
                       html.push(`<span style="font-weight: bolder; font-variant: small-caps;" >${lng}:</span> ${translations[lng] || ''}`);
                    });

                    return html.join('<br/>');
                }
            }
        }
    });

}());