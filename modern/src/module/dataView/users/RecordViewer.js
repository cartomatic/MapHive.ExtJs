//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.RecordViewer', {
        extend: 'mh.module.dataView.RecordViewer',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.users.Icons'
        ],

        xtype: [
            'mh-users-record-viewer'
        ],

        controller: {
            type: 'mh-users-record-viewer'
        },

        viewModel: {
            type: 'mh-users-record-viewer'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),

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
    });
}());