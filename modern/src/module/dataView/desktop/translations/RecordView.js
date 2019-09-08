//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.RecordView', {
        extend: 'mh.module.dataView.desktop.RecordView',

        requires: [
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.translations.Icons',
            'mh.module.dataView.desktop.translations.RecordViewController',
            'mh.module.dataView.desktop.translations.RecordViewModel',
            'mh.util.AliasMapper',
            'mh.widget.RoundImage'
        ],

        xtype: 'mh-desktop-translations-record-view',

        statics: {
            aliases: [
                'translationkey-record-view'
            ]
        },

        controller: 'mh-desktop-translations-record-view',

        viewModel: {
            type: 'mh-desktop-translations-record-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhTranslationsViewHeader'),

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
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.overwrites}',
                                    html: '{record.overwrites}'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.translations}',
                                    html: '{expandTranslations}'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());