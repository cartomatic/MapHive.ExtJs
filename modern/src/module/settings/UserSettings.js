//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.settings.UserSettings', {
        extend: 'Ext.Panel',

        requires: [
            'mh.util.AliasMapper',
            'mh.module.settings.UserSettingsController',
            'mh.module.settings.UserSettingsModel',
            'mh.module.settings.Icons',
            'mh.FontIconsDictionary',
            'mh.module.settings.Icons',
            'mh.module.langSwitcher.LangSwitcher',
            'Ext.field.Container'
        ],

        xtype: 'mh-user-settings',

        statics: {
            aliases: [
                'user-settings',
                'usersettings'
            ]
        },

        controller: 'mh-user-settings',
        viewModel: {
            type: 'mh-user-settings'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUserSettings'),
        bind: {
            title: '{localization.viewName}'
        },

        layout: {
            type: 'hbox',
            align: 'stretch'
        },

        items: [
            { xtype: 'container', flex: 1},
            {
                xtype: 'panel',
                width: 400,
                padding: 10,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        bind: {
                            label: '{localization.uiLang}'
                        },
                        margin: '50 0 0 0',
                        items: [
                            {
                                xtype: 'mh-lang-switcher',
                                flex: 1
                            }
                        ]
                    },
                    {
                        xtype: 'togglefield',
                        bind: {
                            label: '{localization.uiMode}',
                            value: '{darkMode}'
                        },
                        listeners: {
                            change: 'onDarkModeChange'
                        }
                    }
                ]
            },
            { xtype: 'container', flex: 1}
        ],

        listeners: {
            show: 'onShow'
        }

    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());
