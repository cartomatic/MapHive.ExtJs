//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.users.EditView', {
        extend: 'mh.module.dataView.desktop.EditView',

    requires: [
        'Ext.field.Text',
        'Ext.layout.VBox',
        'mh.FontIconsDictionary',
        'mh.module.dataView.desktop.users.EditViewController',
        'mh.module.dataView.desktop.users.EditViewModel',
        'mh.module.dataView.desktop.users.Icons',
        'mh.util.AliasMapper',
        'mh.widget.RoundImage'
    ],

    xtype: 'mh-desktop-users-edit-view',

        statics: {
            aliases: [
                'users-edit-view',
                'users-create-view'
            ]
        },

        controller: 'mh-desktop-users-edit-view',

        viewModel: {
            type: 'mh-desktop-users-edit-view'
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
                                xtype: 'mh-roundimg',
                                imgWidth: 200,
                                imgHeight: 200,
                                editable: true,
                                bind: {
                                    image: '{record.profilePictureGeneric}'
                                },
                                listeners: {
                                    imgreset: 'onUserProfilePhotoReset',
                                    imgchanged: 'onUserProfilePhotoChanged'
                                }
                            },
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
