//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.langs.DataEditForm', {

        extend: 'mh.module.dataView.localizations.langs.DataViewForm',
    
        xtype: 'mh-app-langs-data-edit-form',

        viewModel: {
            type: 'mh-langs-data-edit-form'
        },

        controller: 'mh-langs-data-edit-form',

    requires: [
        'mh.module.dataView.localizations.langs.DataEditFormController',
        'mh.module.dataView.localizations.langs.DataEditFormModel'
    ]
});

}());