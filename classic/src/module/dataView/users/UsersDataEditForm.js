//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersDataEditForm', {

        extend: 'mh.module.dataView.users.UsersDataViewForm',
    
        xtype: 'mh-users-data-edit-form',

        viewModel: {
            type: 'mh-users-data-edit-form'
        },

        controller: 'mh-users-data-edit-form',

    requires: [
        'mh.module.dataView.users.UsersDataEditFormController',
        'mh.module.dataView.users.UsersDataEditFormModel'
    ]
});

}());