//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.DataView', {
        extend: 'mh.module.dataView.users.DataView',
        xtype: 'mh-org-users-data-view',

        requires: [
            'mh.module.dataView.orgUsers.DataViewController',
            'mh.module.dataView.orgUsers.DataViewModel',
            'mh.module.dataView.orgUsers.EditView',
            'mh.module.dataView.orgUsers.RecordView',
            'mh.FontIconsDictionary',
            'mh.module.dataView.orgUsers.DataViewToolbar',
            'mh.data.model.OrganizationUser',
            'mh.module.dataView.orgUsers.Renderers'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'org-users'
        },

        controller: 'mh-org-users-data-view',

        viewModel: {
            type: 'mh-org-users-data-view'
        },

        tbar: {
            xtype: 'mh-org-users-data-view-toolbar'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),
        bind: {
            title: '{localization.viewName}'
        },
        gridCfg: {
            xtype: 'mh-data-view-grid',
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
                        '<a class="mh-data-view-link mh-data-view-img" href="#' + mh.data.model.OrganizationUser.getEntityNavigationUrlBase() + '/{uuid}"><span style="background-image: url(\'{profilePicture}\')"></span>{username}</a>'
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
                    renderer: mh.module.dataView.orgUsers.Renderers.externalUserRenderer
                },
                {
                    cell: {
                        xtype: 'gridcell',
                        encodeHtml: false
                    },
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    renderer: mh.module.dataView.orgUsers.Renderers.orgRoleRenderer
                }
            ]
        }
    });

}());