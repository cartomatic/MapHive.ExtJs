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
    Ext.define('mh.module.mainView.MainViewDesktop', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.layout.Card',
            'mh.module.mainView.MainViewController',
            'mh.module.mainView.MainViewModel',
            'mh.module.mainViewDesktop.AppSwitcher',
            'mh.module.mainViewDesktop.OrgContextSwitcher',
            'mh.module.mainViewDesktop.NavMenu',
            //default user profile view for side nav menu
            'mh.module.userProfile.UserProfile'
        ],

        xtype: 'mh-main-view-desktop',

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
            navMenu: {
                xtype: 'mh-main-view-desktop-nav-menu',
                ui: 'dark micro',
                menuStore: 'routes-main-menu' //registered via application.stores, but id explicitly enforced by a store def
            },

            /**
             * store with non main nav menu routes to be registered; should contain mh.data.model.Route models
             */
            nonMenuRoutesStore: 'routes-non-main-menu', //registered via application.stores, but id explicitly enforced by a store def

            /**
             * app switcher module; takes care of handling app switching; defaults to mh.module.mainViewDesktop.AppSwitcher;
             * when not provided, setting is ignored;
             * navMenu is passed to the constructor; expects the navMenu module to expose a 'addAppSwitcherBtn' method in order to pass own UI back
             */
            appSwitcher: 'mh.module.mainViewDesktop.AppSwitcher',

            /**
             * org context switcher module; takes care of handling organization context switching; defaults to mh.module.mainViewDesktop.OrgContextSwitcher;
             * when not provided, setting gets ignored;
             * navMenu is passed to the constructor; expects the navMenu module to expose a 'addOrgContextSwitcherBtn' method in order to pass own UI back
             */
            orgContextSwitcher: 'mh.module.mainViewDesktop.OrgContextSwitcher'
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