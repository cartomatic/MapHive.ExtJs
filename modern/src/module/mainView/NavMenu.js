//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainView.NavMenu', {
        extend: 'Ext.Container',

        xtype: 'mh-main-view-nav-menu',

        requires: [
            'Ext.dataview.DataView',
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.mainView.NavMenuController',
            'mh.module.mainView.NavMenuModel'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        config: {
            /**
             * whether or not the view is expanded
             */
            expanded: false,

            /**
             * currently selected item
             */
            selection: null,

            /**
             * @cfg should contain mh.data.model.NavRoute models
             * @required
             */
            menuStore: null,

            /**
             * @cfg - route to load for user profile edits
             */
            userProfileRoute: 'user-profile',

            /**
             * whether or not logout btn should be hidden
             */
            hideLogOffBtn: false,

            /**
             * whether or not profile btn should be hidden
             */
            hideProfileBtn: false
        },

        controller: 'mh-main-view-nav-menu',

        viewModel: {
            type: 'mh-main-view-nav-menu'
        },

        classCls: 'navmenu-sidebar',

        cls: 'navmenu',

        layout: 'vbox',
        weighted: true,

        initialize: function() {
            this.callMeParent('initialize', arguments);
        },

        items: {

            //TODO - add maphive left menu sliding btn!

            navigator: {
                xtype: 'dataview',
                cls: 'sliding-menu',

                scrollable: 'y',

                weight: 0,
                flex: 1,

                ui: 'navmenu-dark navmenu-large',
                selectable: {
                    deselectable: false
                },
                itemTpl: [
                    '<span class="icon {[mh.FontIconsDictionary.getIcon(values.iconCls)]}"></span>',
                    '<span class="text">{text}</span>'
                ],
                listeners: {
                    childtap: 'onMenuChildTap',
                    initialize: 'onMenuInitialize'
                }
            },

            //small expander container - expand / collapse menu
            expanderContainer: {
                xtype: 'container',
                cls: 'navmenu-expander-container',
                height: 30,
                items: [
                    {
                        xtype: 'button',
                        reference: 'navMenuExpander',
                        handler: 'onNavMenuExpanderTap',
                        iconCls: mh.FontIconsDictionary.getIcon('navMenuExpand'),
                        cls: 'navmenu-expander'
                    }
                ]
            },

            //profile btn
            profile: {
                xtype: 'button',
                reference: 'profileButton',
                ui: 'navmenu-flat navmenu-dark navmenu-picture',

                iconCls: mh.FontIconsDictionary.getIcon('navMenuUser'),

                textAlign: 'left',
                weight: 10,
                listeners: {
                    tap: 'onProfileButtonTap'
                }
            },

            //log out btn
            logoff: {
                xtype: 'button',
                handler: 'onLogOffTap',
                reference: 'logOffBtn',
                iconCls: mh.FontIconsDictionary.getIcon('navMenuLogOff'),

                bind: {
                    text: '{localization.logOff}'
                },

                textAlign: 'left',
                ui: 'navmenu-large navmenu-flat navmenu-dark',
                weight: 20
            }
        },

        updateSelection: function(value) {
            this.child('#navigator').setSelection(value);
        }
    });
    
}());