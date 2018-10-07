//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.DataViewToolbar', {

        extend: 'Ext.Toolbar',

        xtype: 'mh-desktop-org-users-data-view-toolbar',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.Icons'
        ],

        ui: 'tools',

        defaults: {
            ui: 'base'
        },
        reference: 'dataviewtoolbar',

        items: [
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                reference: 'btnCreate',
                iconCls: mh.FontIconsDictionary.getIcon('mhOrgUsersAdd'),
                bind: { text: '{localization.btnCreate}'},
                menuAlign: 'tr-br?',
                arrowVisible: false,
                menu: {
                    items: [
                        {
                            bind: {
                                text: '{localization.btnAddNewOrgUser}'
                            },
                            iconCls: mh.FontIconsDictionary.getIcon('mhOrgUsersAddOwnUser'),
                            listeners: {
                                click: 'onAddNewOrgUser'
                            }
                        },
                        {
                            bind: {
                                text: '{localization.btnAddUserFromCatalogue}'
                            },
                            iconCls: mh.FontIconsDictionary.getIcon('mhOrgUsersAddExtUser'),
                            listeners: {
                                click: 'onAddUserFromCatalogue'
                            }
                        }
                    ]
                },
                listeners: {
                    click: function(btn){
                        btn.showMenu();
                    }
                }
            },
            {
                xtype: 'button',
                reference: 'btnEdit',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnEdit'),
                bind: {
                    text: '{localization.btnEdit}',
                    disabled: '{!editable}'
                },
                handler: 'onBtnEditTap'
            },
            {
                xtype: 'button',
                reference: 'btnDestroy',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDestroy'),
                handler: 'onBtnDestroyTap',
                bind: {
                    text: '{localization.btnDestroy}',
                    disabled: '{!deletable}'
                }
            }
        ]
    });
}());