//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.TranslationKeysLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalization',

            localization:{
                gridTitle: {
                    en: 'Translation keys',
                    pl: 'Klucze'
                },
                key: {
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
        mh.localization.Localization.registerTranslations(this);
    });

}());