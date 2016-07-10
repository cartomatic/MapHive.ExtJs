(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 04-Jul-16.
     */
    Ext.define('mh.module.dataView.localisations.Localisations', {
        extend: 'Ext.tab.Panel',

        xtype: 'mofp-localisations',

    requires: [
        'Ext.layout.container.Fit',
        'mh.module.dataView.localisations.LocalisationsController',
        'mh.module.dataView.localisations.LocalisationsModel',
        'mh.module.dataView.localisations.appLocalisations.AppLocalisations',
        'mh.module.dataView.localisations.emailTemplates.EmailTemplates',
        'mh.module.dataView.localisations.langs.Langs'
    ],

    viewModel: {
            type: 'mofp-localisations'
        },

        controller: 'mofp-localisations',

        iconCls: 'x-fa fa-comments',

        tabPosition: 'bottom',

        header: false, 

        items: [
            {
                reference: 'langs',
                bind: {
                    title: '{localisation.langs}'
                },
                iconCls: 'x-fa fa-comments-o',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mofp-langs'
                    }
                ]
            },
            {
                reference: 'applocalisations',
                bind: {
                    title: '{localisation.appLocalisations}'
                },
                iconCls: 'x-fa fa-desktop',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mofp-app-localisations'
                    }
                ]
            },
            {
                reference: 'emailtemplates',
                bind: {
                    title: '{localisation.emailTemplates}'
                },
                iconCls: 'x-fa fa-envelope',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mofp-email-templates'
                    }
                ]
            }
        ]
    });
}());