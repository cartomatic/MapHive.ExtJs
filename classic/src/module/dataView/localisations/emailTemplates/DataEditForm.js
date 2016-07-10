//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.DataEditForm', {

        extend: 'mh.module.dataView.localisations.emailTemplates.DataViewForm',
    
        xtype: 'mofp-email-templates-data-edit-form',

        viewModel: {
            type: 'mofp-email-templates-data-edit-form'
        },

        controller: 'mofp-email-templates-data-edit-form',

    requires: [
        'mh.module.dataView.localisations.emailTemplates.DataEditFormController',
        'mh.module.dataView.localisations.emailTemplates.DataEditFormModel'
    ]
});

}());