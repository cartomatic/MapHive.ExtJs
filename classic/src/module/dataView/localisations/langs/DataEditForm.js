//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.langs.DataEditForm', {

        extend: 'mh.module.dataView.localisations.langs.DataViewForm',
    
        xtype: 'mofp-app-langs-data-edit-form',

        viewModel: {
            type: 'mofp-langs-data-edit-form'
        },

        controller: 'mofp-langs-data-edit-form',

    requires: [
        'mh.module.dataView.localisations.langs.DataEditFormController',
        'mh.module.dataView.localisations.langs.DataEditFormModel'
    ]
});

}());