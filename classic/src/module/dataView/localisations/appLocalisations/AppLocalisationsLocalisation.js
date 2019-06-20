//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.appLocalizations.AppLocalizationsLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalization',

            localization:{
                gridTitle: {
                    en: 'App localizations',
                    pl: 'Tłumaczenia aplikacji'
                },
                applicationName: {
                    en: 'Application',
                    pl: 'Aplikacja'
                },
                className: {
                    en: 'Class name',
                    pl: 'Klasa'
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
        mh.localization.Localization.registerTranslations(this);
    });

}());