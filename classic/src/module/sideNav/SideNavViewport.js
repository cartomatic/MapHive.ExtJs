//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * An administrative app viewport template; actually this template just provides a side menu and a way of switching between the cards based on the routes.
     */
    Ext.define('mh.module.sideNav.SideNav', {
        extend: 'Ext.panel.Panel',

        xtype: 'mh-sidenav',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.list.Tree',
        'Ext.panel.Panel',
        'mh.module.sideNav.SideNavController',
        'mh.module.sideNav.SideNavModel'
    ],


    controller: 'mh-sidenav',

        viewModel: {
            type: 'mh-sidenav'
        },

        config: {
            /**
             * @cfg {Boolean} [useRouter=true]
             * whether or not routes should be expressed in the url part; this also turns on listening for route changes
             */
            useRouter: true
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
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'treelist',
                        reference: 'navTreeList',
                        ui: 'mh-sidenav',
                        flex: 1,
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