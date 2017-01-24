(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 04-Jul-16.
     */
    Ext.define('mh.module.dataView.localisations.Localisations', {
        extend: 'Ext.tab.Panel',

        xtype: 'mh-localisations',

    requires: [
        'Ext.layout.container.Fit',
        'mh.module.dataView.localisations.LocalisationsController',
        'mh.module.dataView.localisations.LocalisationsModel',
        'mh.module.dataView.localisations.appLocalisations.AppLocalisations',
        'mh.module.dataView.localisations.emailTemplates.EmailTemplates',
        'mh.module.dataView.localisations.langs.Langs'
    ],

    viewModel: {
            type: 'mh-localisations'
        },

        controller: 'mh-localisations',

        iconCls: 'x-i54 i54-speach-bubbles-1',

        tabPosition: 'bottom',

        header: false, 

        items: [
            {
                reference: 'langs',
                bind: {
                    title: '{localisation.langs}'
                },
                iconCls: 'x-i54 i54-speach-bubbles-8',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mh-langs'
                    }
                ]
            },
            {
                reference: 'applocalisations',
                bind: {
                    title: '{localisation.appLocalisations}'
                },
                iconCls: 'x-i54c i54c-computer-network2',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mh-app-localisations'
                    }
                ]
            },
            {
                reference: 'emailtemplates',
                bind: {
                    title: '{localisation.emailTemplates}'
                },
                iconCls: 'x-i54c i54c-mail-at',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mh-email-templates'
                    }
                ]
            }
        ]
    });
}());