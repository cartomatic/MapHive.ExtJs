//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.AppLocalisationsLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.DataViewBaseLocalisation'
        ],
        statics: {

            extends: 'mh.module.dataView.DataViewBaseLocalisation',

            localisation:{
                gridTitle: {
                    en: 'App localisations',
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
        mh.localisation.Localisation.registerTranslations(this);
    });

}());