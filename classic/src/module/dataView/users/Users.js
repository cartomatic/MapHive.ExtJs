//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.Users', {
        extend: 'mh.module.dataView.DataViewBase',

        requires: [
            'Ext.grid.Panel',
            'Ext.grid.filters.Filters',
            'mh.module.dataView.users.UsersDataViewForm',
            'mh.module.dataView.users.UsersDataEditForm',
            'mh.module.dataView.users.UsersController',
            'mh.module.dataView.users.UsersModel'
        ],

        xtype: 'mh-users',

        viewModel: {
            type: 'mh-users'
        },
    
        controller: 'mh-users',

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: {
                items: [
                    {
                        bind: {text: '{localization.email}'},
                        dataIndex: 'email',
                        flex: 1,
                        filter: {
                            // required configs
                            type: 'string'
                        }
                    },
                    {
                        bind: {text: '{localization.forename}'},
                        dataIndex: 'forename',
                        flex: 1,
                        filter: {
                            // required configs
                            type: 'string'
                        }
                    },
                    {
                        bind: {text: '{localization.surname}'},
                        dataIndex: 'forename',
                        flex: 1,
                        filter: {
                            // required configs
                            type: 'string'
                        }
                    }
                ]
            }
        },
        gridIconCls: 'x-li li-users2',
        form: 'mh.module.dataView.users.UsersDataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.users.UsersDataEditForm'
    });

}());