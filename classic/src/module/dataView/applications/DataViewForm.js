//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.applications.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mh-applications-data-view-form',

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
                            fieldLabel: '{localization.name}',
                            value: '{rec.name}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'shortName',
                        bind: {
                            fieldLabel: '{localization.shortName}',
                            value: '{rec.shortName}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'description',
                        bind: {
                            fieldLabel: '{localization.description}',
                            value: '{rec.description}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textarea',
                        reference: 'urls',
                        bind: {
                            fieldLabel: '{localization.urls}',
                            value: '{rec.urls}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'useSplashscreen',
                        bind: {
                            fieldLabel: '{localization.useSplashscreen}',
                            value: '{rec.useSplashscreen}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'requiresAuth',
                        bind: {
                            fieldLabel: '{localization.requiresAuth}',
                            value: '{rec.requiresAuth}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isCommon',
                        bind: {
                            fieldLabel: '{localization.isCommon}',
                            value: '{rec.isCommon}'
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