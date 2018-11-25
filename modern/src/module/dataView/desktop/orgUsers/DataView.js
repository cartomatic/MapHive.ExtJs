//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.DataView', {
        extend: 'mh.module.dataView.desktop.users.DataView',
        xtype: 'mh-desktop-org-users-data-view',

        requires: [
            'mh.module.dataView.desktop.orgUsers.DataViewController',
            'mh.module.dataView.desktop.orgUsers.DataViewModel',
            'mh.module.dataView.desktop.orgUsers.EditView',
            'mh.module.dataView.desktop.orgUsers.RecordView',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.orgUsers.DataViewToolbar',
            'mh.data.model.OrganizationUser',
            'mh.module.dataView.desktop.orgUsers.Renderers'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'org-users'
        },

        controller: 'mh-desktop-org-users-data-view',

        viewModel: {
            type: 'mh-desktop-org-users-data-view'
        },

        tbar: {
            xtype: 'mh-desktop-org-users-data-view-toolbar'
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
                        '<a class="mh-data-view-link mh-data-view-img" href="#' + mh.data.model.OrganizationUser.getEntityNavigationUrlBase() + '/{uuid}"><span style="background-image: url(\'{profilePictureGetter}\')"></span>{username}</a>'
                    ],
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                },
                {
                    cell: {
                        xtype: 'gridcell',
                        encodeHtml: false
                    },
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    renderer: mh.module.dataView.desktop.orgUsers.Renderers.externalUserRenderer
                },
                {
                    cell: {
                        xtype: 'gridcell',
                        encodeHtml: false
                    },
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    renderer: mh.module.dataView.desktop.orgUsers.Renderers.orgRoleRenderer
                }
            ]
        }
    });

}());