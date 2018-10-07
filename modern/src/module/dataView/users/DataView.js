//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.DataView', {
        extend: 'mh.module.dataView.DataViewDesktop',

        requires: [
            'mh.module.dataView.users.Icons',
            'mh.module.dataView.users.DataViewController',
            'mh.module.dataView.users.DataViewModel',
            'mh.module.dataView.users.EditView',
            'mh.module.dataView.users.RecordView',
            'mh.FontIconsDictionary',
            'mh.data.model.User'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'users'
        },

        xtype: 'mh-users-data-view',

        controller: 'mh-users-data-view',

        viewModel: {
            type: 'mh-users-data-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),
        bind: {
            title: '{localization.viewName}'
        },
        gridCfg: {
            xtype:'mh-data-view-grid-desktop',
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
                        //user is a part of record view edit url!!!
                        '<a class="mh-data-view-link mh-data-view-img" href="#' + mh.data.model.User.getEntityNavigationUrlBase() + '/{uuid}"><span style="background-image: url(\'{profilePicture}\')"></span>{username}</a>'
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