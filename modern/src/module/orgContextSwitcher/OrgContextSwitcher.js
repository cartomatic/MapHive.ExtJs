//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.orgContextSwitcher.OrgContextSwitcherDesktop', {

        extend: 'Ext.Button',

        xtype: 'mh-org-switcher-desktop',

        requires: [
            'mh.module.orgContextSwitcher.OrgContextSwitcherDesktopController',
            'mh.module.orgContextSwitcher.OrgContextSwitcherDesktopModel',
            'mh.module.orgContextSwitcher.Icons'
        ],

        controller: 'mh-org-switcher-desktop',
        viewModel: {
            type: 'mh-org-switcher-desktop'
        },

        arrowAlign: 'right',
        arrow: false,


        iconCls: mh.FontIconsDictionary.getIcon('mhOrgSwitcherOrganization'),

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
