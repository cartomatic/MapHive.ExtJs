//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.LocalizationsLocalization', {

        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                title: {
                    en: 'Localizations',
                    pl: 'Tłumaczenia'
                },
                langs: {
                    en: 'Supported Langs',
                    pl: 'Języki'
                },
                appLocalizations: {
                    en: 'App localizations',
                    pl: 'Tłumaczenia aplikacji'
                },
                emailTemplates: {
                    en: 'Email templates',
                    pl: 'Szablony emaili'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());