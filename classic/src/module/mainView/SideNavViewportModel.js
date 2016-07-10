//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainView.SideNavViewportModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-mainview-sidenav-viewport',

    requires: [
        'Ext.data.TreeStore',
        'mh.model.NavigationTree'
    ],

        stores: {
            //An empty store initially so the tree list configures itself properly; data loaded later dynamically
            treeMenu: {
                type: 'tree',
                model: 'mh.model.NavigationTree',
                root: {
                    expanded: true,
                    children: [
                    ]
                }
            }
        }
    });

}());