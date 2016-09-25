//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.localisationClasses.DataEditForm', {

        extend: 'Ext.container.Container',
    
        xtype: 'mh-localisation-classes-data-edit-form',

        viewModel: {
            type: 'mh-localisation-classes-data-edit-form'
        },

        controller: 'mh-localisation-classes-data-edit-form',

    requires: [
        'mh.module.dataView.localisations.localisationClasses.DataEditFormController',
        'mh.module.dataView.localisations.localisationClasses.DataEditFormModel'
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
                            fieldLabel: '{localisation.applicationName}',
                            value: '{rec.applicationName}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'className',
                        bind: {
                            fieldLabel: '{localisation.className}',
                            value: '{rec.className}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'inheritedClassName',
                        bind: {
                            fieldLabel: '{localisation.inheritedClassName}',
                            value: '{rec.inheritedClassName}'
                        }
                    }
                ]
            }
        ]
});

}());