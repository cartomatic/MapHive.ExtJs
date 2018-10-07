//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.UsersDataEditFormModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-desktop-users-data-edit-form',

    requires: [
        'mh.data.dictionaries.OrganizationRoles'
    ],

    stores: {
            orgRoles: mh.data.dictionaries.OrganizationRoles.getOrgRolesStore()
        },
    
        data: {
            
        }
    });

}());