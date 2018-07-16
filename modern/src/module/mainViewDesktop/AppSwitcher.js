//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.mainViewDesktop.AppSwitcher', {
        extend: 'Ext.Panel',

        requires: [
            'mh.module.mainViewDesktop.AppSwitcherIcons',
            'mh.FontIconsDictionary'
        ],

        xtype: 'mh-app-switcher',

        controller: 'mh-app-switcher',
        viewModel: {
            type: 'mh-app-switcher'
        },

        bind: {
            title: '{localization.appSwitcherTitle}'
        },

        iconCls: mh.FontIconsDictionary.getIcon('appSwitcherApps'),

        config: {

            navModule: null
        }
    });
}());
