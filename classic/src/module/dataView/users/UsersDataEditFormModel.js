//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersDataEditFormModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-users-data-edit-form',

    requires: [
        'mh.data.dictionaries.OrganisationRoles'
    ],

    stores: {
            orgRoles: mh.data.dictionaries.OrganisationRoles.getOrgRolesStore()
        },
    
        data: {
            
        }
    });

}());