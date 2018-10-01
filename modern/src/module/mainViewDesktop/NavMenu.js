//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainViewDesktop.NavMenu', {
        extend: 'Ext.Container',

        xtype: 'mh-main-view-nav-menu',

        requires: [
            'Ext.dataview.DataView',
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.mainViewDesktop.NavMenuController',
            'mh.module.mainViewDesktop.NavMenuModel'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        config: {

            /**
             * currently selected item
             */
            selection: null,

            /**
             * @cfg should contain mh.data.model.Route models
             * @required
             */
            menuStore: null,

            /**
             * @cfg - route to load for user profile edits
             */
            userProfileRoute: 'mh-user-profile',

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

            //small expander container - expand / collapse menu
            expanderContainer: {
                xtype: 'container',
                cls: 'navmenu-expander-container',
                height: 30,
                items: [
                    {
                        xtype: 'button',
                        reference: 'navMenuExpanderBtn',
                        handler: 'onNavMenuExpanderBtnTap',
                        iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuExpand'),
                        cls: 'navmenu-expander'
                    }
                ]
            },

            navigator: {
                xtype: 'dataview',
                cls: 'sliding-menu',

                scrollable: 'y',

                //weight: 2,
                flex: 1,

                ui: 'navmenu-flat navmenu-dark navmenu-large',
                selectable: {
                    deselectable: false
                },
                itemTpl: [
                    '<span class="icon {[mh.FontIconsDictionary.getIcon(values.iconCls)]}"></span>',
                    '<span class="text">{text}</span>'
                ],
                listeners: {
                    childtap: 'onMenuItemTap',
                    initialize: 'onMenuInitialize'
                }
            },


            //profile btn
            profile: {
                xtype: 'button',
                reference: 'profileBtn',
                ui: 'navmenu-flat navmenu-dark navmenu-picture',

                iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuUserAnonymous'),

                textAlign: 'left',
                //weight: 20,
                listeners: {
                    tap: 'onprofileBtnTap'
                }
            },

            //log out btn
            logoff: {
                xtype: 'button',
                handler: 'onLogOffBtnTap',
                reference: 'logOffBtn',
                iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuLogOff'),

                bind: {
                    text: '{localization.logOff}'
                },

                textAlign: 'left',
                ui: 'navmenu-large navmenu-flat navmenu-dark',
               // weight: 30
            }
        },

        updateSelection: function(value) {
            try{
                this.child('#navigator').setSelection(value);
            }
            catch (e) {
                //ignore
                //console.warn('eee', e);
            }

        }
    });
    
}());