//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.users.EditView', {
        extend: 'mh.module.dataView.EditView',

    requires: [
        'Ext.field.Text',
        'Ext.layout.VBox',
        'mh.FontIconsDictionary',
        'mh.module.dataView.users.EditViewController',
        'mh.module.dataView.users.EditViewModel',
        'mh.module.dataView.users.Icons',
        'mh.util.AliasMapper'
    ],

    xtype: 'mh-users-edit-view',

        statics: {
            aliases: [
                'users-edit-view',
                'users-create-view'
            ]
        },

        controller: 'mh-users-edit-view',

        viewModel: {
            type: 'mh-users-edit-view'
        },

        bind: {
            title: '{localization.viewName} :: {record.username}'
        },

        screens: [
            {
                tab: {
                    iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBasicInfo'),
                    bind: {
                        title: '{localization.basicInfo}'
                    }
                },
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'panel',
                        width: 400,
                        items: [
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.forename}',
                                    value: '{record.forename}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.surname}',
                                    value: '{record.surname}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.email}',
                                    value: '{record.email}'
                                },
                                required: true
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.slug}',
                                    value: '{record.slug}'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());