(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 04-Jul-16.
     */
    Ext.define('mh.module.dataView.localizations.Localizations', {
        extend: 'Ext.tab.Panel',

        xtype: 'mh-localizations',

    requires: [
        'Ext.layout.container.Fit',
        'mh.module.dataView.localizations.LocalizationsController',
        'mh.module.dataView.localizations.LocalizationsModel',
        'mh.module.dataView.localizations.appLocalizations.AppLocalizations',
        'mh.module.dataView.localizations.emailTemplates.EmailTemplates',
        'mh.module.dataView.localizations.langs.Langs'
    ],

    viewModel: {
            type: 'mh-localizations'
        },

        controller: 'mh-localizations',

        iconCls: 'x-i54 i54-speach-bubbles-1',

        tabPosition: 'bottom',

        header: false, 

        items: [
            {
                reference: 'langs',
                bind: {
                    title: '{localization.langs}'
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
                reference: 'applocalizations',
                bind: {
                    title: '{localization.appLocalizations}'
                },
                iconCls: 'x-i54c i54c-computer-network2',
                layout: 'fit',
                items: [
                    {
                        xtype: 'mh-app-localizations'
                    }
                ]
            },
            {
                reference: 'emailtemplates',
                bind: {
                    title: '{localization.emailTemplates}'
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