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
            'mh.module.appBar.AppBarController'
        ],

        dock: 'top',

        config: {
            api: {
                apps: 'dummy.url'
            }
        },

        items: [
            //child elements added in the view controller, so can control their setup properly
        ]
    });

}());