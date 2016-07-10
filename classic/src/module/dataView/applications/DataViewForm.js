//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.applications.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mofp-applications-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'Ext.tab.Panel',
        'mh.data.model.Application',
        'mh.mixin.ApiMap'
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
                        xtype: 'textfield',
                        reference: 'shortName',
                        bind: {
                            fieldLabel: '{localisation.shortName}',
                            value: '{rec.shortName}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'description',
                        bind: {
                            fieldLabel: '{localisation.description}',
                            value: '{rec.description}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'url',
                        bind: {
                            fieldLabel: '{localisation.url}',
                            value: '{rec.url}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'useSplashscreen',
                        bind: {
                            fieldLabel: '{localisation.useSplashscreen}',
                            value: '{rec.useSplashscreen}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'requiresAuth',
                        bind: {
                            fieldLabel: '{localisation.requiresAuth}',
                            value: '{rec.requiresAuth}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isCommon',
                        bind: {
                            fieldLabel: '{localisation.isCommon}',
                            value: '{rec.isCommon}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isDefault',
                        bind: {
                            fieldLabel: '{localisation.isDefault}',
                            value: '{rec.isDefault}'
                        },
                        readOnly: true
                    }
                ]
            }
        ]

    });

}());