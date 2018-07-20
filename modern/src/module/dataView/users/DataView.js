//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.DataView', {
        extend: 'mh.module.dataView.DataViewBase',
        xtype: [
            'mh-users-data-view',
            'users'
        ],

        requires: [
            'mh.module.dataView.users.Icons',
            'mh.module.dataView.users.DataViewController',
            'mh.module.dataView.users.DataViewModel',
            //'mh.module.dataView.users.Editor',
            //'mh.module.dataView.users.RecordViewer',
            'mh.FontIconsDictionary'
        ],

        controller: 'mh-users-data-view',

        viewModel: {
            type: 'mh-users-data-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),
        bind: {
            title: '{localization.viewName}'
        },
        gridCfg: {
            xtype: 'mh-dataview-base-grid',
            columns: [
                {
                    bind: {
                        text: '{localization.username}'
                    },
                    dataIndex: 'username',
                    cell: {
                        encodeHtml: false
                    },
                    tpl: [
                        '<a class="data-view-link data-view-img" href="#users/{uuid}"><span style="background-image: url(\'{profilePicture}\')"></span>{username}</a>'
                    ],
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                }
            ]
        }
    });

}());