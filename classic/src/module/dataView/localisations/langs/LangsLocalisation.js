//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.langs.LangsLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.DataViewBaseLocalisation'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalisation',

            localisation:{
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
        mh.localisation.Localisation.registerTranslations(this);
    });

}());