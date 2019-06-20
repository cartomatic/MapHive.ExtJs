//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.langs.LangsLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalization',

            localization:{
                gridTitle: {
                    en: 'Supported langs',
                    pl: 'Języki'
                },
                langCode: {
                    en: 'Lang code',
                    pl: 'Kod'
                },
                name: {
                    en: 'Name',
                    pl: 'Nazwa'
                },
                description: {
                    en: 'Description',
                    pl: 'Opis'
                },
                isDefault: {
                    en: 'Default?',
                    pl: 'Domyślny?'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());