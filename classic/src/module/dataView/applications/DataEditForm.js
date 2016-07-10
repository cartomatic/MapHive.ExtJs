//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.applications.DataEditForm', {

        extend: 'mh.module.dataView.applications.DataViewForm',
    
        xtype: 'mofp-applications-data-edit-form',

        viewModel: {
            type: 'mofp-applications-data-edit-form'
        },

        controller: 'mofp-applications-data-edit-form',

        requires: [
            'mh.module.dataView.applications.DataEditFormController',
            'mh.module.dataView.applications.DataEditFormModel'
        ]
});

}());