//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.translations.EditView', {
        extend: 'mh.module.dataView.desktop.EditView',

        requires: [
            'Ext.field.Text',
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.translations.EditViewController',
            'mh.module.dataView.desktop.translations.EditViewModel',
            'mh.module.dataView.desktop.translations.Icons',
            'mh.util.AliasMapper',
            'mh.widget.RoundImage'
        ],

        xtype: 'mh-desktop-translations-edit-view',

        statics: {
            aliases: [
                'translationkey-edit-view',
                'translationkey-create-view'
            ]
        },

        controller: 'mh-desktop-translations-edit-view',

        viewModel: {
            type: 'mh-desktop-translations-edit-view'
        },

        bind: {
            title: '{localization.viewName} :: {record.applicationName}.{record.className}.{record.key}'
        },

        screens: [
            {
                tab: {
                    iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBasicInfo'),
                    bind: {
                        title: '{localization.basicInfo}'
                    }
                },
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'panel',
                        width: 400,
                        reference: 'form',
                        items: [
                            {
                                xtype: 'label',
                                bind: {
                                    html: '<h3 class="mh-record-view-rec-name">{record.applicationName}.{record.className}</h3>'
                                },
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                xtype: 'label',
                                bind: {
                                    html: '<h4 class="mh-record-view-rec-name">{record.key}</h4>'
                                },
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.inherited}',
                                    html: '{record.inherited}'
                                }
                            },
                            {
                                xtype: 'togglefield',
                                labelWidth: 150,
                                bind: {
                                    label: '{localization.overwrites}',
                                    value: '{record.overwrites}',
                                    hidden: '{!record.inherited}'
                                }
                            }

                            //per language translation fields are injected dynamically upon class instantiation
                            //binding & data collection is also dynamic
                        ]
                    }
                ]
            }
        ]
    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());
