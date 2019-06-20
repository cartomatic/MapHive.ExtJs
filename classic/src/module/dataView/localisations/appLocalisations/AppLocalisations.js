//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.appLocalizations.AppLocalizations', {
        extend: 'Ext.Container',

    requires: [
        'mh.module.dataView.localizations.appLocalizations.AppLocalizationsController',
        'mh.module.dataView.localizations.appLocalizations.AppLocalizationsModel',
        'mh.module.dataView.localizations.localizationClasses.LocalizationClasses',
        'mh.module.dataView.localizations.translationKeys.TranslationKeys'
    ],

    xtype: 'mh-app-localizations',

        viewModel: {
            type: 'mh-app-localizations'
        },
    
        controller: 'mh-app-localizations',

        layout: {
            type: 'border'
        },

        items: [
            {
                xtype: 'mh-localization-classes',
                reference: 'localizationClasses',
                region: 'west',
                width: 700,
                split: true
            },
            {
                xtype: 'mh-translation-keys',
                reference: 'translationKeys',
                region: 'center',
                split: true
            }
        ]

    });

}());