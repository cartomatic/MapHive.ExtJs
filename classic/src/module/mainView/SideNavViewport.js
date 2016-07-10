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
        'Ext.layout.container.Card',
        'Ext.layout.container.HBox',
        'Ext.list.Tree',
        'Ext.panel.Panel',
        'Ext.plugin.Viewport',
        'mh.module.mainView.SideNavViewportModel',
        'mh.module.mainView.SideNavViewportController'
    ],

    plugins: 'viewport',

        controller: 'mh-mainview-sidenav-viewport',

        viewModel: {
            type: 'mh-mainview-sidenav-viewport'
        },

        border: false,

        layout: {
            type: 'hbox',
            align: 'stretch',

            // Tell the layout to animate the x/width of the child items.
            animate: true,
            animatePolicy: {
                x: true,
                width: true
            }
        },

        items: [
            {
                xtype: 'treelist',
                reference: 'navTreeList',
                ui: 'mh-side-navigation',
                margin: '0 5 0 0', //t r b l
                width: 250,
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    selectionchange: 'onTreeListSelectionChange'
                },
                bind: {
                    store: '{treeMenu}'
                }
            },
            {
                xtype: 'container',
                reference: 'cardHolder',
                layout: 'card',
                flex: 1
            }
        ]
    });

}());