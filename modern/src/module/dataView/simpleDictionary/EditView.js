//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.simpleDictionary.EditView', {
        extend: 'mh.module.dataView.EditView',

    requires: [
        'Ext.field.Text',
        'Ext.layout.VBox',
        'mh.FontIconsDictionary',
        'mh.module.dataView.simpleDictionary.EditViewController',
        'mh.module.dataView.simpleDictionary.EditViewModel',
        'mh.module.dataView.simpleDictionary.Icons',
        'mh.util.AliasMapper'
    ],

    xtype: [
            'mh-simple-dictionary-edit-view'
        ],

        statics: {
            /**
             * aliases this view can be searched by
             */
            aliases: [
                'dicts-edit-view',
                'dicts-create-view'
            ],
            /**
             * dictionary of titles this view can apply when loading records for particular routes
             */
            titles: {}
        },

        controller: 'mh-simple-dictionary-edit-view',

        viewModel: {
            type: 'mh-simple-dictionary-edit-view'
        },

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
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.name}',
                                    value: '{record.name}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.description}',
                                    value: '{record.description}'
                                }
                            },
                            {
                                xtype: 'togglefield',
                                bind: {
                                    label: '{localization.isDefault}',
                                    value: '{record.isDefault}'
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
