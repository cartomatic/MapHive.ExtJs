//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * MH modern apps main app view for desktop apps.
     * abstracts a generic app view with a left hand side menu - based on the ExtJs's admin-dashboard template;
     * allows for generic view switching and routing
     */
    Ext.define('mh.module.mainViewDesktop.MainViewDesktop', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.layout.Card',
            'mh.module.mainViewDesktop.MainViewDesktopController',
            'mh.module.mainViewDesktop.MainViewDesktopModel'
        ],

        xtype: 'mh-main-view',

        viewModel: {
            type: 'mh-main-view'
        },
        controller: 'mh-main-view',

        fullscreen: 'true',

        bodyStyle: 'z-index: 3',

        config: {

            /**
             * a cfg for the nav menu to be put as the lbar
             */
            navMenu: null,

            /**
             * store with non main nav menu routes to be registered; should contain mh.data.model.NavRoute models
             */
            nonMenuRoutesStore: null
        },

        layout: {
            type: 'card',
            animation: {
                type: 'fade',
                //direction: 'right',
                duration: 500
            }
        }
    });
    
}());