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
            /**
             * Set of API endpoints passed to child components
             */
            api: {
                apps: 'dummy.url'
            },

            /**
             * Id of an iframe the application uses to host other apps; this is used to decide whether the apps should be reloaded into an iframe or own window; This setting is used by the mh.module.appBar.AppSwitcherButton
             */
            hostedAppsIframeId: null
        },

        items: [
            //child elements added in the view controller, so can control their setup properly
        ]
    });

}());