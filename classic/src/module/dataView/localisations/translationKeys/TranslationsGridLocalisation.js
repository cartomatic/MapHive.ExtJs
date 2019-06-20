//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.TranslationsGridLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
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
        mh.localization.Localization.registerTranslations(this);
    });

}());