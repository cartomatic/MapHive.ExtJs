//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 02.10.2018.
     */
    Ext.define('mh.module.mainView.MainViewMobile', {
        extend: 'Ext.Container',

        xtype: 'mh-main-view-mobile',
        requires: [
            'mh.module.mainView.MainViewController',
            'mh.module.mainView.MainViewModel'
        ],

        controller: 'mh-main-view',
        viewModel: {
            type: 'mh-main-view'
        },

        fullscreen: true,

        config: {

            /**
             * a cfg for the nav menu to be put as the lbar
             */
            navMenu: {
                xtype: 'mh-main-view-mobile-nav-menu',
                menuStore: 'routes-main-menu' //registered via application.stores, but id explicitly enforced by a store def
            },

            /**
             * store with non main nav menu routes to be registered; should contain mh.data.model.Route models
             */
            nonMenuRoutesStore: 'routes-non-main-menu', //registered via application.stores, but id explicitly enforced by a store def

            /**
             * app switcher module; takes care of handling app switching; defaults to mh.module.appSwitcher.AppSwitcherDesktop;
             * when not provided, setting is ignored;
             * navMenu is passed to the constructor; expects the navMenu module to expose a 'addAppSwitcherBtn' method in order to pass own UI back
             */
            appSwitcher: 'mh.module.mainViewMobile.AppSwitcher',

            /**
             * org context switcher module; takes care of handling organization context switching; defaults to mh.module.mainViewDesktop.OrgContextSwitcherDesktop;
             * when not provided, setting gets ignored;
             * navMenu is passed to the constructor; expects the navMenu module to expose a 'addOrgContextSwitcherBtn' method in order to pass own UI back
             */
            orgContextSwitcher: 'mh.module.mainViewMobile.OrgContextSwitcher'
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
