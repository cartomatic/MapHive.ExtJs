//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.DataEditForm', {

        extend: 'mh.module.dataView.localisations.appLocalisations.DataViewForm',
    
        xtype: 'mofp-app-localisations-data-edit-form',

        viewModel: {
            type: 'mofp-app-localisations-data-edit-form'
        },

        controller: 'mofp-app-localisations-data-edit-form',

    requires: [
        'mh.module.dataView.localisations.appLocalisations.DataEditFormController',
        'mh.module.dataView.localisations.appLocalisations.DataEditFormModel'
    ]
});

}());