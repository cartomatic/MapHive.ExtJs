//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.simpleDictionary.RecordView', {
        extend: 'mh.module.dataView.desktop.RecordView',

        requires: [
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.simpleDictionary.Icons',
            'mh.module.dataView.desktop.simpleDictionary.RecordViewController',
            'mh.module.dataView.desktop.simpleDictionary.RecordViewModel',
            'mh.util.AliasMapper'
        ],

        xtype: 'mh-desktop-simple-dictionary-record-view',

        statics: {
            /**
             * aliases this view can be searched by
             */
            aliases: [
                'dicts-record-view'
            ],
            /**
             * dictionary of titles this view can apply when loading records for particular routes
             */
            titles: {},

            /**
             * dictionary of icons this view can apply when loading records for particular routes
             */
            icons: {}
        },

        controller: 'mh-desktop-simple-dictionary-record-view',

        viewModel: {
            type: 'mh-desktop-simple-dictionary-record-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhDictionariesViewHeader'),

        bind: {
            title: '{localization.viewName} :: {record.name}'
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
                                    html: '<h3>{record.name}</h3>'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.description}',
                                    html: '{record.description}'
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