//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.RecordView', {
        extend: 'mh.module.dataView.desktop.RecordView',

    requires: [
        'Ext.layout.VBox',
        'mh.FontIconsDictionary',
        'mh.module.dataView.desktop.users.Icons',
        'mh.module.dataView.desktop.users.RecordViewController',
        'mh.module.dataView.desktop.users.RecordViewModel',
        'mh.util.AliasMapper',
        'mh.widget.RoundImage'
    ],

    xtype: 'mh-desktop-users-record-view',

        statics: {
            aliases: [
                'users-record-view'
            ]
        },

        controller: 'mh-desktop-users-record-view',

        viewModel: {
            type: 'mh-desktop-users-record-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),

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
                                    html: '<h3 class="mh-record-view-rec-name">{record.username}</h3>'
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