//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mofp-app-localisations-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'mh.module.dataView.localisations.appLocalisations.TranslationsGrid'
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
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'className',
                        bind: {
                            fieldLabel: '{localisation.className}',
                            value: '{rec.className}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'translationKey',
                        bind: {
                            fieldLabel: '{localisation.translationKey}',
                            value: '{rec.translationKey}'
                        },
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'mofp-translationsgrid',
                reference: 'translations',
                flex: 1
            }
        ]
    });

}());