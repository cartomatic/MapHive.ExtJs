//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.RecordView', {
        extend: 'mh.module.dataView.RecordView',

        requires: [
            'mh.util.AliasMapper',
            'mh.FontIconsDictionary',
            'mh.module.dataView.users.Icons',
            'mh.module.dataView.users.RecordViewController',
            'mh.module.dataView.users.RecordViewModel'
        ],

        xtype: [
            'mh-users-record-view'
        ],

        statics: {
            aliases: [
                'users-record-view'
            ]
        },

        controller: 'mh-users-record-view',

        viewModel: {
            type: 'mh-users-record-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),

        bind: {
            title: '{record.username}'
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
                items: [{
                    xtype: 'panel',
                    width: 400,
                    items: [{
                        xtype: 'label',
                        bind: {
                            html: '{record.name}'
                        }
                    }]
                }]
            }
        ]
    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());