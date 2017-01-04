//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * An administrative app viewport template; actually this template just provides a side menu and a way of switching between the cards based on the routes.
     */
    Ext.define('mh.module.mainView.SideNavViewport', {
        extend: 'Ext.panel.Panel',

        xtype: 'mh-mainview-sidenav-viewport',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.list.Tree',
        'Ext.panel.Panel',
        'Ext.plugin.Viewport',
        'mh.module.mainView.SideNavViewportController',
        'mh.module.mainView.SideNavViewportModel'
    ],

    plugins: 'viewport',

        controller: 'mh-mainview-sidenav-viewport',

        viewModel: {
            type: 'mh-mainview-sidenav-viewport'
        },

        border: false,

        layout: {
            type: 'border'
        },

        items: [
            {
                xtype:'panel',
                region: 'west',
                split: true,
                collapsible: true,
                header: false,
                layout: 'fit',
                items: [
                    {
                        xtype: 'treelist',
                        reference: 'navTreeList',
                        ui: 'mh-sidenav',
                        width: 250,
                        expanderFirst: false,
                        expanderOnly: true,
                        listeners: {
                            selectionchange: 'onTreeListSelectionChange'
                        },
                        bind: {
                            store: '{treeMenu}'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                reference: 'cardHolder',
                layout: 'card',
                region: 'center'
            }
        ]
    });

}());