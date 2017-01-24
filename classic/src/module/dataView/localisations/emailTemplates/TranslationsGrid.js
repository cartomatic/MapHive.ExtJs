//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.TranslationsGrid', {
        
        extend: 'Ext.container.Container',
    
        xtype: 'mh-email-templates-translationsgrid',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Toolbar',
        'mh.module.dataView.localisations.emailTemplates.TranslationsGridController',
        'mh.module.dataView.localisations.emailTemplates.TranslationsGridModel'
    ],

    controller: 'mh-email-templates-translationsgrid',

        viewModel: {
            type: 'mh-email-templates-translationsgrid'
        },


        flex: 1,
        minHeight: 250,
        minWidth: 400,

        //Note: width is required here even though the min width is used, as the container window auto adjusts itself to the content. without it grid will fail to do layout after record add. min width will get overriden when nesting in a parent that controls the width itself
        width: 100,

        setGridData: function(data){
            this.getController().setGridData(data);
        },

        bind: {
            gridData: {
                bindTo: '{rec}'
            }
        },

        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'grid',
                iconCls: 'x-i54 i54-speach-bubbles-8',
                bind: {
                    title: '{localisation.translations}'
                },
                reference: 'translationsgrid',
                plugins: {
                    ptype: 'cellediting',
                    clicksToEdit: 2
                },
                height: 175,
                columns: [
                    {
                        bind: {text: '{localisation.langCode}'},
                        dataIndex: 'langCode',
                        width: 100,
                        editor: {
                            xtype: 'combobox',
                            editable: false,
                            valueField: 'langCode',
                            displayField: 'langCode',
                            triggerAction: 'all',
                            bind: {
                                store: '{langsstore}'
                            }
                        }
                    },
                    {
                        bind: {text: '{localisation.title}'},
                        dataIndex: 'title',
                        flex: 1,
                        editor: {
                            completeOnEnter: true,
                            field: {
                                xtype: 'textfield',
                                allowBlank: false
                            }
                        }
                    },
                    {
                        xtype: 'actioncolumn',
                        reference: 'translationsgrid_coldelete',
                        handler: 'onTranslationDeleteClick',
                        width: 30,
                        iconCls: 'x-li li-cross-circle',
                        menuDisabled: true,
                        hidden: true,
                        tooltipTranslationKey: 'translationDeleteTooltip' //see the controller for the tip handler setup!
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        reference: 'translationsgrid_tbar',
                        hidden: true,
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'x-li li-plus-circle',
                                listeners: {
                                    click: 'onBtnAddTranslationClick'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'htmleditor',
                border: false,
                margin: '0 0 0 0',
                reference: 'htmleditor',
                flex: 1,
                readOnly: true,
                bind: {
                    value: '{translationsgrid.selection.body}'
                }
            }
        ]

    });

}());