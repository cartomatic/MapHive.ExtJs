//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.localizationClasses.DataEditForm', {

        extend: 'Ext.container.Container',
    
        xtype: 'mh-localization-classes-data-edit-form',

        viewModel: {
            type: 'mh-localization-classes-data-edit-form'
        },

        controller: 'mh-localization-classes-data-edit-form',

    requires: [
        'mh.module.dataView.localizations.localizationClasses.DataEditFormController',
        'mh.module.dataView.localizations.localizationClasses.DataEditFormModel'
    ],

    layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                layout: 'form',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'applicationName',
                        bind: {
                            fieldLabel: '{localization.applicationName}',
                            value: '{rec.applicationName}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'className',
                        bind: {
                            fieldLabel: '{localization.className}',
                            value: '{rec.className}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'inheritedClassName',
                        bind: {
                            fieldLabel: '{localization.inheritedClassName}',
                            value: '{rec.inheritedClassName}'
                        }
                    }
                ]
            }
        ]
});

}());