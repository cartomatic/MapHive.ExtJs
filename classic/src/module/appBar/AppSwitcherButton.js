//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 4/18/2016.
     */
    Ext.define('mh.module.appBar.AppSwitcherButton', {
        extend: 'Ext.button.Button',
    
        xtype: 'mh-app-switcher-button',

        requires: [
            'mh.module.appBar.AppSwitcherButtonController'
        ],

        controller: 'mh-app-switcher-button',

        config: {
            /**
             * Set of API endpoints
             */
            api: {
                apps: 'dummy.url'
            },

            /**
             * Id of an iframe the application uses to host other apps; this is used to decide whether the apps should be reloaded into an iframe or own window
             */
            hostedAppsIframeId: null
        },

        ui: 'black-button',
        scale: 'medium',
        iconCls: 'x-fa fa-th-large',

        listeners: {
            click: 'onAppSwitcherBtnClick'
        }
    });

}());