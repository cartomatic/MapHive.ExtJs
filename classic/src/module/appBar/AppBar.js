//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * A generic app toolbar that gets shown / hidden based on the context (host vs hosted app). Automated show / hide is the main advantage of using this class.
     * By default it provides the following functionality:
     * * app switcher
     * * authenticated user info
     * * app cfg / user cfg entry point - logout, change pass, change details
     *
     * Note: the default ExtJs theme for MapHive is Codaxy's Azzurra theme, and UIs based on that theme are used. So it may be the case some of the components,
     * such as styled buttons, etc do not display if Azzura or derived themes are not there.
     * In such case, just use the toolbar as one would normally do, but reassemble the contents and give them proper UI's as required
     *
     */
    Ext.define('mh.module.appBar.AppBar', {
        extend: 'Ext.toolbar.Toolbar',

        xtype: 'mh-app-bar',

    requires: [
        'mh.module.appBar.AppBarController',
        'mh.module.appBar.AppSwitcherButton',
        'mh.module.appBar.UserProfileButton'
    ],


    controller: 'mh-app-bar',

        cls: 'mh-app-bar-shadow',


        dock: 'top',

        items: [
            {
                xtype: 'mh-app-switcher-button'
            },
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'container',
                        html: 'TODO - App name...'
                    }
                ]
            },
            {
                xtype: 'image',
                glyph: '\ecbe@icon54com',
                width: 30,
                height: 30,
                margin: '0 10 0 10'
            },
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'container',
                        html: 'TODO - Org context switcher'
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'mh-user-profile-button'
            }
        ],

        hidden: true
    });

}());