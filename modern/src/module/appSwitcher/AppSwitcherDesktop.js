//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.appSwitcher.AppSwitcherDesktop', {
        extend: 'Ext.ActionSheet',

        requires: [
            'mh.module.appSwitcher.Icons',
            'mh.FontIconsDictionary',
            'Ext.dataview.plugin.ItemTip',
            'mh.module.appSwitcher.AppSwitcherDesktopController',
            'mh.module.appSwitcher.AppSwitcherDesktopModel'
        ],

        xtype: 'mh-app-switcher-desktop-desktop',

        controller: 'mh-app-switcher-desktop',
        viewModel: {
            type: 'mh-app-switcher-desktop'
        },

        bind: {
            title: '{localization.appSwitcherTitle}'
        },

        width: 265,

        iconCls: mh.FontIconsDictionary.getIcon('mhAppSwitcherApps'),

        layout: 'vbox',
        
        bodyPadding: 0,

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'searchfield',
                        cleareable: true,

                        bind: {
                            placeholder: '{localization.search}'
                        },
                        flex: 1,
                        listeners: {
                            change: 'onFilterChange'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'fit',
                padding: 8,
                items: [
                    {
                        xtype: 'dataview',
                        flex: 1,
                        inline: true,
                        cls: 'dataview-basic',
                        itemTpl: '<div class="dataview-inline box">' +
                        '<div class="name"><strong>{name}</strong></div>' +
                        '</div>',
                        bind: {
                            store: '{apps}'
                        },
                        plugins: {
                            dataviewtip: {
                                align: 'tl-bl',
                                maxHeight: 100,
                                width: 150,
                                scrollable: 'y',
                                delegate: '.box',
                                allowOver: true,
                                anchor: true,
                                bind: '{record}',
                                cls: 'dataview-basic',
                                tpl: '<div class="info"><strong>{name}</strong></div>' +
                                '<div class="info">{description}</div>'
                            }
                        },
                        listeners: {
                            childsingletap: 'onAppPicked'
                        }
                    }
                ]
            }
        ],

        config: {

            navModule: null
        }
    });
}());
