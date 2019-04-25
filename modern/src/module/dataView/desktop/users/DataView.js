//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.DataView', {
        extend: 'mh.module.dataView.desktop.DataView',

        requires: [
            'mh.module.dataView.desktop.users.Icons',
            'mh.module.dataView.desktop.users.DataViewController',
            'mh.module.dataView.desktop.users.DataViewModel',
            'mh.module.dataView.desktop.users.EditView',
            'mh.module.dataView.desktop.users.RecordView',
            'mh.FontIconsDictionary',
            'mh.data.model.User'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'users'
        },

        xtype: 'mh-desktop-users-data-view',

        controller: 'mh-desktop-users-data-view',

        viewModel: {
            type: 'mh-desktop-users-data-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),
        bind: {
            title: '{localization.viewName}'
        },
        gridCfg: {
            xtype:'mh-desktop-data-view-grid',
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
                        '<a class="mh-data-view-link mh-data-view-img"',
                        'href="#' + mh.data.model.User.getEntityNavigationUrlBase() + '/{uuid}"',
                        'onclick="return mh.module.dataView.desktop.DataViewController.handleLinkRedirectRespectingModalMode(\'[src-component-id]\',\'[reload-fn]\',\'' + mh.data.model.User.getEntityNavigationUrlBase() + '/{uuid}' + '\');"',
                        '>',
                        '<span style="background-image: url(\'{profilePictureGeneric}\')"></span>{username}',
                        '</a>'
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