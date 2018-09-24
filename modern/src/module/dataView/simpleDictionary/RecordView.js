//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function () {
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.simpleDictionary.RecordView', {
        extend: 'mh.module.dataView.RecordView',

        requires: [
            'Ext.layout.VBox',
            'mh.FontIconsDictionary',
            'mh.module.dataView.simpleDictionary.Icons',
            'mh.module.dataView.simpleDictionary.RecordViewController',
            'mh.module.dataView.simpleDictionary.RecordViewModel',
            'mh.util.AliasMapper'
        ],

        xtype: [
            'mh-simple-dictionary-record-view'
        ],

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
            titles: {}
        },

        controller: 'mh-simple-dictionary-record-view',

        viewModel: {
            type: 'mh-simple-dictionary-record-view'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhiProjectsViewHeader'),

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
                            },
                            {
                                xtype: 'displayfield',
                                bind: {
                                    label: '{localization.isDefault}',
                                    html: '{record.isDefault}'
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