//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.LocalisationsLocalisation', {

        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                title: {
                    en: 'Localisations',
                    pl: 'Tłumaczenia'
                },
                langs: {
                    en: 'Supported Langs',
                    pl: 'Języki'
                },
                appLocalisations: {
                    en: 'App localisations',
                    pl: 'Tłumaczenia aplikacji'
                },
                emailTemplates: {
                    en: 'Email templates',
                    pl: 'Szablony emaili'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());