//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.translationKeys.DataEditForm', {

        extend: 'mh.module.dataView.localisations.translationKeys.DataViewForm',
    
        xtype: 'mh-translation-keys-data-edit-form',

        viewModel: {
            type: 'mh-translation-keys-data-edit-form'
        },

        controller: 'mh-translation-keys-data-edit-form',

    requires: [
        'mh.module.dataView.localisations.translationKeys.DataEditFormController',
        'mh.module.dataView.localisations.translationKeys.DataEditFormModel'
    ]
});

}());