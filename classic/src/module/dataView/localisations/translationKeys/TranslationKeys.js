//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.TranslationKeys', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localizations.translationKeys.DataEditForm',
        'mh.module.dataView.localizations.translationKeys.DataViewForm',
        'mh.module.dataView.localizations.translationKeys.TranslationKeysController',
        'mh.module.dataView.localizations.translationKeys.TranslationKeysModel'
    ],

    xtype: 'mh-translation-keys',

        viewModel: {
            type: 'mh-translation-keys'
        },
    
        controller: 'mh-translation-keys',

        gridIconCls: 'x-i54 i54-speach-bubbles-8',

        margin: 0,

        autoLoad: false,

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
                {
                    bind: {text: '{localization.key}'},
                    dataIndex: 'key',
                    width: 200,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.translations}'},
                    dataIndex: 'translations',
                    flex: 1,
                    filter: {
                        type: 'string'
                    },
                    renderer: 'translationsRenderer'
                }
            ]
        },

        form: 'mh.module.dataView.localizations.translationKeys.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localizations.translationKeys.DataEditForm'
    });

}());