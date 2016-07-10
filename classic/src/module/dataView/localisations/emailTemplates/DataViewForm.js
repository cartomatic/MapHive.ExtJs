//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mofp-email-templates-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'mh.module.dataView.localisations.emailTemplates.TranslationsGrid'
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
                        reference: 'name',
                        bind: {
                            fieldLabel: '{localisation.name}',
                            value: '{rec.name}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textarea',
                        reference: 'description',
                        bind: {
                            fieldLabel: '{localisation.description}',
                            value: '{rec.description}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'applicationName',
                        bind: {
                            fieldLabel: '{localisation.applicationName}',
                            value: '{rec.applicationName}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'identifier',
                        bind: {
                            fieldLabel: '{localisation.identifier}',
                            value: '{rec.identifier}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isBodyHtml',
                        bind: {
                            fieldLabel: '{localisation.isBodyHtml}',
                            value: '{rec.isBodyHtml}'
                        },
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'mofp-email-templates-translationsgrid',
                reference: 'translations',
                flex: 1
            }
        ]
    });

}());