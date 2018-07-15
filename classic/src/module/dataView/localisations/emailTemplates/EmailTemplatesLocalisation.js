//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.EmailTemplatesLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalization',

            localization:{
                gridTitle: {
                    en: 'Email templates',
                    pl: 'Szablony emaili'
                },
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
        mh.localization.Localization.registerTranslations(this);
    });

}());