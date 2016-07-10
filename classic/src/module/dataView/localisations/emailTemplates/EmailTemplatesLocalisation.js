//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.EmailTemplatesLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.DataViewBaseLocalisation'
        ],
        statics: {

            extends: 'mh.module.dataView.DataViewBaseLocalisation',

            localisation:{
                name: {
                    en: 'Name',
                    pl: 'Nazwa'
                },
                description: {
                    en: 'Description',
                    pl: 'Opis'
                },
                applicationName: {
                    en: 'App name',
                    pl: 'Aplikacja'
                },
                identifier: {
                    en: 'Identifier',
                    pl: 'Identyfikator'
                },
                isBodyHtml: {
                    en: 'HTML?',
                    pl: 'HTML?'
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