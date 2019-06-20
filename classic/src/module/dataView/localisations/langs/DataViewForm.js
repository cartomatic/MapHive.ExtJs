//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.langs.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mh-langs-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox'
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
                        reference: 'langCode',
                        bind: {
                            fieldLabel: '{localization.langCode}',
                            value: '{rec.langCode}'
                        },
                        readOnly: true
                    },
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
                        xtype: 'checkbox',
                        reference: 'isDefault',
                        bind: {
                            fieldLabel: '{localization.isDefault}',
                            value: '{rec.isDefault}'
                        },
                        readOnly: true
                    }
                ]
            }
        ]
    });

}());