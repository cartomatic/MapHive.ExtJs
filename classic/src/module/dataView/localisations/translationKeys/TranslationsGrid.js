//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.TranslationsGrid', {
        extend: 'mh.module.dataView.BindableStoreGrid',
    
        xtype: 'mh-translationsgrid',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar',
        'mh.module.dataView.localizations.translationKeys.TranslationsGridController',
        'mh.module.dataView.localizations.translationKeys.TranslationsGridModel',
        'mh.module.dataView.localizations.emailTemplates.TranslationsGridController'
    ],

    plugins: {
            ptype: 'cellediting',
            clicksToEdit: 2
        },

        controller: 'mh-translationsgrid',

        viewModel: {
            type: 'mh-translationsgrid'
        },

        iconCls: 'x-i54 i54-speach-bubbles-8',
        flex: 1,
        minHeight: 250,
        minWidth: 300,
        //Note: width is required here even though the min width is used, as the container window auto adjusts itself to the content. without it grid will fail to do layout after record add. min width will get overriden when nesting in a parent that controls the width itself
        width: 100,
        bind: {
            title: '{localization.translations}',
            gridData: {
                bindTo: '{rec}'
                //,deep: true
            }
        },
        columns: [
            {
                bind: {text: '{localization.langCode}'},
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
                bind: {text: '{localization.translation}'},
                dataIndex: 'translation',
                flex: 1,
                editor: {
                    completeOnEnter: true,
                    field: {
                        xtype: 'textarea',
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
    });

}());