//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.DataViewLocalization',
            localization: {
                viewName: {
                    en: 'Translations',
                    pl: 'Tłumaczenia'
                },
                fullKey: {
                    en: 'Translation key',
                    pl: 'Tłumaczony klucz'
                },
                inheritedClassName: {
                    en: 'Inherits from',
                    pl: 'Dziedziczy po'
                },
                key: {
                    en: 'Key',
                    pl: 'Klucz'
                },
                inherited: {
                    en: 'Inherited',
                    pl: 'Dziedziczony'
                },
                overwrites: {
                    en: 'Overwrites',
                    pl: 'Nadpisuje'
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