//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mh-email-templates-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'mh.module.dataView.localizations.emailTemplates.TranslationsGrid'
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
                            fieldLabel: '{localization.name}',
                            value: '{rec.name}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textarea',
                        reference: 'description',
                        bind: {
                            fieldLabel: '{localization.description}',
                            value: '{rec.description}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'applicationName',
                        bind: {
                            fieldLabel: '{localization.applicationName}',
                            value: '{rec.applicationName}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'identifier',
                        bind: {
                            fieldLabel: '{localization.identifier}',
                            value: '{rec.identifier}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isBodyHtml',
                        bind: {
                            fieldLabel: '{localization.isBodyHtml}',
                            value: '{rec.isBodyHtml}'
                        },
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'mh-email-templates-translationsgrid',
                reference: 'translations',
                flex: 1
            }
        ]
    });

}());