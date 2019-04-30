//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcher', {
        extend: 'Ext.Container',

        requires: [
            'mh.module.langSwitcher.LangSwitcherController',
            'mh.module.langSwitcher.LangSwitcherModel'
        ],

        xtype: 'mh-lang-switcher',

        controller: 'mh-lang-switcher',
        viewModel: {
            type: 'mh-lang-switcher'
        },

        layout: {
            type: 'hbox',
            align: 'stretch'
        },

        items: [
            {
                xtype: 'img',
                reference: 'icon',
                width: 20,
                height: 20
            },
            {
                xtype: 'combobox',
                reference: 'combo',
                margin: '0 0 0 10',
                flex: 1,
                itemTpl: '<div style="vertical-align: middle;"><img src="{icon}" style="vertical-align: middle; width:20px; height:20px;"/><span style="margin-left: 10px;">{name}</span></div>',
                editable: false,
                valueField: 'code',
                displayField: 'name',
                triggerAction: 'all',
                queryMode: 'local',
                bind: {
                    store: '{langs}'
                },
                listeners: {
                    change: 'onLangChange'
                }
            }
        ]



    });
}());
