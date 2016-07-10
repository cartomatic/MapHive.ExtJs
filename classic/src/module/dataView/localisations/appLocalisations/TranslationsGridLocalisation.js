//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.TranslationsGridLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                translations: {
                    en: 'Translations',
                    pl: 'Tłumaczenia'
                },
                langCode: {
                    en: 'Lang',
                    pl: 'Język'
                },
                translation: {
                    en: 'Transaltion',
                    pl: 'Tłumaczenie'
                },
                translationDeleteTooltip: {
                    en: 'Delete translation',
                    pl: 'Usuń tłumaczenie'
                }
            }
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());