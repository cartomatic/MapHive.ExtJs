//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.DataEditForm', {

        extend: 'mh.module.dataView.localisations.emailTemplates.DataViewForm',
    
        xtype: 'mh-email-templates-data-edit-form',

        viewModel: {
            type: 'mh-email-templates-data-edit-form'
        },

        controller: 'mh-email-templates-data-edit-form',

    requires: [
        'mh.module.dataView.localisations.emailTemplates.DataEditFormController',
        'mh.module.dataView.localisations.emailTemplates.DataEditFormModel'
    ]
});

}());