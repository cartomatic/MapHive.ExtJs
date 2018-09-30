//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordView', {
        extend: 'mh.module.dataView.RecordView',

        requires: [
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.users.Icons',
            'mh.module.dataView.orgUsers.RecordViewController',
            'mh.module.dataView.orgUsers.RecordViewModel',
            'mh.util.AliasMapper'
        ],

        xtype: 'mh-org-users-record-view',

        statics: {
            aliases: [
                'org-users-record-view'
            ]
        },

        controller: 'mh-org-users-record-view',

        viewModel: {
            type: 'mh-org-users-record-view'
        },

        //iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),

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
                                xtype: 'label',
                                bind: {
                                    html: '<h3>{record.username}</h3>'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.forename}',
                                    html: '{record.forename}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.surname}',
                                    html: '{record.surname}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.email}',
                                    html: '{record.email}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.slug}',
                                    html: '{record.slug}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.organizationRole}',
                                    html: '{organizationRole}'
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