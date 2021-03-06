//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.RecordView', {
        extend: 'mh.module.dataView.desktop.RecordView',

        requires: [
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.users.Icons',
            'mh.module.dataView.desktop.orgUsers.RecordViewController',
            'mh.module.dataView.desktop.orgUsers.RecordViewModel',
            'mh.util.AliasMapper',
            'mh.widget.RoundImage'
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

        //icon bound dynamically based on record data

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
                                editable: false,
                                bind: {
                                    image: '{record.profilePictureGeneric}'
                                }
                            },
                            {
                                xtype: 'label',
                                bind: {
                                    html: '<h2>{record.fullname}</h2>'
                                },
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                xtype: 'label',
                                bind: {
                                    html: '<h3 class="mh-record-view-rec-name">{organizationRole}</h3>'
                                },
                                style: {
                                    textAlign: 'center'
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
                                    label: '{localization.visibleInCatalogue}',
                                    html: '{record.visibleInCatalogue}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.isAccountVerified}',
                                    html: '{record.isAccountVerified}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.isAccountClosed}',
                                    html: '{record.isAccountClosed}'
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