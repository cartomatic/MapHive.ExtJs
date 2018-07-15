//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.langs.Langs', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localizations.langs.LangsController',
        'mh.module.dataView.localizations.langs.LangsModel',
        'mh.module.dataView.localizations.langs.DataEditForm',
        'mh.module.dataView.localizations.langs.DataViewForm'
    ],

    xtype: 'mh-langs',

        viewModel: {
            type: 'mh-langs'
        },
    
        controller: 'mh-langs',

        margin: 0,

        gridIconCls: 'x-i54 i54-speach-bubbles-8',

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
                {
                    bind: {text: '{localization.langCode}'},
                    dataIndex: 'langCode',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.name}'},
                    dataIndex: 'name',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.description}'},
                    dataIndex: 'description',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.isDefault}'},
                    dataIndex: 'isDefault',
                    flex: 1,
                    filter: {
                        type: 'boolean'
                    }
                }
            ]
        },
        form: 'mh.module.dataView.localizations.langs.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localizations.langs.DataEditForm'
    });

}());