//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.UsersDataEditForm', {

        extend: 'mh.module.dataView.desktop.users.UsersDataViewForm',
    
        xtype: 'mh-desktop-users-data-edit-form',

        viewModel: {
            type: 'mh-desktop-users-data-edit-form'
        },

        controller: 'mh-desktop-users-data-edit-form',

    requires: [
        'mh.module.dataView.desktop.users.UsersDataEditFormController',
        'mh.module.dataView.desktop.users.UsersDataEditFormModel'
    ]
});

}());