//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.translationKeys.TranslationKeysLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.DataViewBaseLocalisation'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalisation',

            localisation:{
                gridTitle: {
                    en: 'Translation keys',
                    pl: 'Klucze'
                },
                translationKey: {
                    en: 'Translation key',
                    pl: 'Klucz'
                },
                translations: {
                    en: 'Translations',
                    pl: 'Tłumaczenia'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());