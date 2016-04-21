//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * A generic app toolbar that provide the following functionality:
     * * app switcher
     * * authenticated user info
     * * app cfg / user cfg entry point - logout, change pass, change details
     */
    Ext.define('mh.module.appBar.AppBar', {
        extend: 'Ext.toolbar.Toolbar',

        xtype: 'mh-app-bar',

        controller: 'mh-app-bar',

    requires: [
        'mh.module.appBar.AppBarController',
        'mh.module.appBar.AppSwitcherButton'
    ],

    dock: 'top',

        items: [
            {
                xtype: 'mh-app-switcher-button'
            },
            '->',
            {
                xtype: 'button',
                text: 'some other btn'
            }
            //spacer
            //userinfo
            //spacer
            //cfg btn
        ],

        hidden: true
    });

}());