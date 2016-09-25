//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.AppLocalisations', {
        extend: 'Ext.Container',

    requires: [
        'mh.module.dataView.localisations.appLocalisations.AppLocalisationsController',
        'mh.module.dataView.localisations.appLocalisations.AppLocalisationsModel',
        'mh.module.dataView.localisations.localisationClasses.LocalisationClasses',
        'mh.module.dataView.localisations.translationKeys.TranslationKeys'
    ],

    xtype: 'mh-app-localisations',

        viewModel: {
            type: 'mh-app-localisations'
        },
    
        controller: 'mh-app-localisations',

        layout: {
            type: 'border'
        },

        items: [
            {
                xtype: 'mh-localisation-classes',
                reference: 'localisationClasses',
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