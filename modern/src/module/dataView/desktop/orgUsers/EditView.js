//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.orgUsers.EditView', {
        extend: 'mh.module.dataView.desktop.EditView',

        requires: [
            'Ext.field.Text',
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.orgUsers.EditViewController',
            'mh.module.dataView.desktop.orgUsers.EditViewModel',
            'mh.module.dataView.desktop.orgUsers.Icons',
            'mh.util.AliasMapper',
            'mh.widget.RoundImage'
        ],

        xtype: 'mh-org-users-edit-view',

        statics: {
            aliases: [
                'org-users-edit-view',
                'org-users-create-view'
            ]
        },

        controller: 'mh-org-users-edit-view',

        viewModel: {
            type: 'mh-org-users-edit-view'
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
                                xtype: 'combobox',
                                bind: {
                                    label: '{localization.organizationRole}',
                                    store: '{organizationRoles}',
                                    value: '{record.organizationRole}',
                                    readOnly: '{!canModifyOrgRole}'
                                },
                                queryMode: 'local',
                                editable: false,
                                displayField: 'name',
                                valueField: 'id'
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.forename}',
                                    value: '{record.forename}',
                                    readOnly: '{isExtUser}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.surname}',
                                    value: '{record.surname}',
                                    readOnly: '{isExtUser}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.email}',
                                    value: '{record.email}',
                                    readOnly: '{isExtUser}'
                                },
                                required: true
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.slug}',
                                    value: '{record.slug}',
                                    readOnly: '{isExtUser}'
                                }
                            },
                            {
                                xtype: 'togglefield',
                                bind: {
                                    label: '{localization.visibleInCatalogue}',
                                    value: '{record.visibleInCatalogue}',
                                    disabled: '{isExtUser}'
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
