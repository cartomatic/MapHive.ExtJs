//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    /**
     * mobile navigation menu - this is a toolbar docked to top that offers access to the routes main menu items and also to user info, logoff, etc;
     * it also displays icons / titles, etc.
     */
    Ext.define('mh.module.navMenu.NavMenuMobile', {

        extend: 'Ext.Toolbar',

        xtype: 'mh-main-view-nav-menu-mobile',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.navMenu.Icons',
            'mh.module.commonConfig.CommonConfig'
        ],

        controller: 'mh-main-view-nav-menu-mobile',

        config: {
            /**
             * side to expand the menu from
             */
            menuSide: 'right',

            /**
             * id of a store to be used as a source for creating menu items
             */
            menuStore: 'routes-main-menu',

            /**
             * @cfg - route to load for user profile edits
             */
            userProfileRoute: 'mh-user-profile',

            /**
             * instead of the default redirect to a common app (dashboard or home, etc), app will just force reload
             */
            logOffReload: false
        },

        items: [
            {
                xtype: 'button',
                reference: 'backBtn',
                iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuBack'),
                width: (mh.module.commonConfig.CommonConfig.navMenu || {}).width,
                height: (mh.module.commonConfig.CommonConfig.navMenu || {}).height,
                listeners: {
                    tap: 'onBackBtnTap'
                }
            },
            '->',
            {
                xtype: 'label',
                reference: 'activeViewTitle',
                flex: 1
            },
            '->',
            {
                xtype: 'button',
                reference: 'menuBtn',
                iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuSandwich'),
                width: (mh.module.commonConfig.CommonConfig.navMenu || {}).width,
                height: (mh.module.commonConfig.CommonConfig.navMenu || {}).height,
                listeners: {
                    tap: 'onMenuBtnTap'
                }
            }
        ]
    });
}());
