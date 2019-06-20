//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.DataEditForm', {

        extend: 'mh.module.dataView.localizations.emailTemplates.DataViewForm',
    
        xtype: 'mh-email-templates-data-edit-form',

        viewModel: {
            type: 'mh-email-templates-data-edit-form'
        },

        controller: 'mh-email-templates-data-edit-form',

    requires: [
        'mh.module.dataView.localizations.emailTemplates.DataEditFormController',
        'mh.module.dataView.localizations.emailTemplates.DataEditFormModel'
    ]
});

}());