//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.DataView', {
        extend: 'mh.module.dataView.desktop.DataView',

        requires: [
            'mh.module.dataView.desktop.translations.Icons',
            'mh.module.dataView.desktop.translations.DataViewController',
            'mh.module.dataView.desktop.translations.DataViewModel',
            'mh.module.dataView.desktop.translations.EditView',
            'mh.module.dataView.desktop.translations.RecordView',
            'mh.FontIconsDictionary',
            'mh.data.model.TranslationKey'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'translations'
        },

        xtype: 'mh-desktop-translations-data-view',

        controller: 'mh-desktop-translations-data-view',

        viewModel: {
            type: 'mh-desktop-translations-data-view'
        },

        preventDestroy: true,
        preventCreate: true,

        iconCls: mh.FontIconsDictionary.getIcon('mhTranslationsViewHeader'),
        bind: {
            title: '{localization.viewName}'
        },
        gridCfg: {
            xtype:'mh-desktop-data-view-grid',
            columns: [
                {
                    bind: {
                        text: '{localization.fullKey}'
                    },
                    dataIndex: 'fullKey',
                    cell: {
                        encodeHtml: false
                    },
                    tpl: [
                        //user is a part of record view edit url!!!
                        '<a class="mh-data-view-link mh-data-view-img"',
                        'href="#' + mh.data.model.TranslationKey.getEntityNavigationUrlBase() + '/{uuid}"',
                        'onclick="return mh.module.dataView.desktop.DataViewController.handleLinkRedirectRespectingModalMode(\'[src-component-id]\',\'[reload-fn]\',\'' + mh.data.model.TranslationKey.getEntityNavigationUrlBase() + '/{uuid}' + '\');"',
                        '>',
                        '{fullKey}',
                        '</a>'
                    ],
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                },
                {
                    bind: {
                        text: '{localization.inheritedClassName}'
                    },
                    dataIndex: 'inheritedClassName',
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                },
                {
                    bind: {
                        text: '{localization.inherited}'
                    },
                    dataIndex: 'inherited',
                    width: 100
                },
                {
                    bind: {
                        text: '{localization.overwrites}'
                    },
                    dataIndex: 'overwrites',
                    width: 100
                },
                {
                    bind: {
                        text: '{localization.translations}'
                    },
                    dataIndex: 'translationsSerialized', //needed for string search
                    cell: {
                        encodeHtml: false
                    },
                    flex: 2,
                    renderer: 'translationsRenderer',
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                }
            ]
        }
    });

}());