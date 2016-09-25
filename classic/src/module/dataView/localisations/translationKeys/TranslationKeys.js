//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.translationKeys.TranslationKeys', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localisations.translationKeys.DataEditForm',
        'mh.module.dataView.localisations.translationKeys.DataViewForm',
        'mh.module.dataView.localisations.translationKeys.TranslationKeysController',
        'mh.module.dataView.localisations.translationKeys.TranslationKeysModel'
    ],

    xtype: 'mh-translation-keys',

        viewModel: {
            type: 'mh-translation-keys'
        },
    
        controller: 'mh-translation-keys',

        gridIconCls: 'x-fa fa-comments-o',

        margin: 0,

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
                {
                    bind: {text: '{localisation.key}'},
                    dataIndex: 'key',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.translations}'},
                    dataIndex: 'translations',
                    flex: 1,
                    filter: {
                        type: 'string'
                    },
                    renderer: 'translationsRenderer'
                }
            ]
        },

        form: 'mh.module.dataView.localisations.translationKeys.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localisations.translationKeys.DataEditForm'
    });

}());