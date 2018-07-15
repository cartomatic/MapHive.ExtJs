//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.DataEditForm', {

        extend: 'mh.module.dataView.localizations.translationKeys.DataViewForm',
    
        xtype: 'mh-translation-keys-data-edit-form',

        viewModel: {
            type: 'mh-translation-keys-data-edit-form'
        },

        controller: 'mh-translation-keys-data-edit-form',

    requires: [
        'mh.module.dataView.localizations.translationKeys.DataEditFormController',
        'mh.module.dataView.localizations.translationKeys.DataEditFormModel'
    ]
});

}());