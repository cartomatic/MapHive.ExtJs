//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mh-users',

    requires: [
        'mh.data.dictionaries.OrganisationRoles',
        'mh.data.model.User',
        'mh.data.proxy.Rest',
        'mh.mixin.ApiMap'
    ],

    stores: {
            gridstore:{
                model: 'mh.data.model.User',
                data: [],
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here
                //initially sort users on accountClosed
                sorters: [
                    {
                        property: 'isAccountClosed', direction: 'ASC'
                    }
                ]
            },
            orgRoles: mh.data.dictionaries.OrganisationRoles.getOrgRolesStore()
        }
    });

}());