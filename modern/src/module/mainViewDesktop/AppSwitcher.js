//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.mainViewDesktop.AppSwitcher', {
        extend: 'Ext.ActionSheet',

        requires: [
            'mh.module.mainViewDesktop.AppSwitcherIcons',
            'mh.FontIconsDictionary',
            'Ext.dataview.plugin.ItemTip'
        ],

        xtype: 'mh-app-switcher',

        controller: 'mh-app-switcher',
        viewModel: {
            type: 'mh-app-switcher'
        },

        bind: {
            title: '{localization.appSwitcherTitle}'
        },

        width: 300,

        iconCls: mh.FontIconsDictionary.getIcon('appSwitcherApps'),

        layout: 'fit',

        items: [{
            xtype: 'dataview',
            inline: true,
            cls: 'dataview-basic',
            itemTpl: '<div class="img" style="background-image: url({photo});"></div>' +
                    '<div class="content">' +
                    '<div class="name">{name}</div>' +
                    '<div class="description">{description}</div>' +
                    '</div>',
            bind: {
                store: '{apps}'
            },
            plugins: {
                dataviewtip: {
                    align: 'tl-bl',
                    maxHeight: 200,
                    width: 300,
                    scrollable: 'y',
                    delegate: '.img',
                    allowOver: true,
                    anchor: true,
                    bind: '{record}',
                    cls: 'dataview-basic',
                    tpl: '<strong>Name</strong><div class="info">{name}</div>' +
                    '<strong>Description</strong><div class="info">{description}</div>'
                }
            }
        }],

        config: {

            navModule: null
        }
    });
}());
