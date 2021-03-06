//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
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
            'mh.module.mainView.MainViewDesktopController',
            'mh.module.mainView.MainViewModel',
            'mh.module.appSwitcher.AppSwitcherDesktop',
            'mh.module.orgContextSwitcher.OrgContextSwitcherDesktop',
            'mh.module.navMenu.NavMenuDesktop',
            //default user profile view for side nav menu
            'mh.module.userProfile.UserProfile',
            //default settings
            'mh.module.settings.UserSettings'
        ],

        xtype: 'mh-main-view-desktop',

        viewModel: {
            type: 'mh-main-view'
        },
        controller: 'mh-main-view-desktop',

        fullscreen: 'true',

        bodyStyle: 'z-index: 3',

        config: {

            /**
             * a cfg for the nav menu to be put as the lbar
             */
            navMenu: {
                xtype: 'mh-main-view-nav-menu-desktop',
                ui: 'dark micro',

                /**
                 * store to be used as a source for creating menu items; should contain mh.data.model.Route models
                 */
                menuStore: 'routes-main-menu' //registered via application.stores, but id explicitly enforced by a store def
            },

            /**
             * whether or not log off should reload the app instead of trying to launch the default app
             */
            navMenuLogOffReload: false,

            /**
             * custom log off handler for scenarios where default log off reload or redirect to dashboard do not fit
             */
            navMenuLogOffCustomHandler: null,

            /**
             * whether or not user settings section should be on by default
             */
            navMenuHideSettingsBtn: false,

            /**
             * store with main menu routes to be registered; should contain mh.data.model.Route models
             */
            menuRoutesStore: 'routes-main-menu', //registered via application.stores, but id explicitly enforced by a store def

            /**
             * store with non main nav menu routes to be registered; should contain mh.data.model.Route models
             */
            nonMenuRoutesStore: 'routes-non-main-menu', //registered via application.stores, but id explicitly enforced by a store def

            /**
             * app switcher module; takes care of handling app switching; defaults to mh.module.appSwitcher.AppSwitcherDesktop;
             * when not provided, setting is ignored;
             * navMenu is passed to the constructor; expects the navMenu module to expose a 'addAppSwitcherBtn' method in order to pass own UI back
             */
            appSwitcher: 'mh.module.appSwitcher.AppSwitcherDesktop',

            /**
             * org context switcher module; takes care of handling organization context switching; defaults to mh.module.mainViewDesktop.OrgContextSwitcherDesktop;
             * when not provided, setting gets ignored;
             * navMenu is passed to the constructor; expects the navMenu module to expose a 'addOrgContextSwitcherBtn' method in order to pass own UI back
             */
            orgContextSwitcher: 'mh.module.orgContextSwitcher.OrgContextSwitcherDesktop'
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