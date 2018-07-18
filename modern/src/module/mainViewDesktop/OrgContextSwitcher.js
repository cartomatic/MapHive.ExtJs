//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.mainViewDesktop.OrgContextSwitcher', {

        extend: 'Ext.Button',

        xtype: 'mh-org-switcher',

        requires: [
            'mh.module.mainViewDesktop.OrgContextSwitcherController',
            'mh.module.mainViewDesktop.OrgContextSwitcherModel',
            'mh.module.mainViewDesktop.Icons'
        ],

        controller: 'mh-org-switcher',
        viewModel: {
            type: 'mh-org-switcher'
        },

        arrowAlign: 'right',
        arrow: false,


        iconCls: mh.FontIconsDictionary.getIcon('orgSwitcherOrganization'),

        hidden: true,

        bind: {
            text: '{localization.orgSwitcherBtn}',
            tooltip: '{localization.orgSwitcherBtn}'
        },

        listeners: {
            tap: 'onUserOrgsBtnTap'
        },

        config: {

            navModule: null
        }
    });
}());
