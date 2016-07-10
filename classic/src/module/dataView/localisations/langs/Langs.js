//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.langs.Langs', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localisations.langs.LangsController',
        'mh.module.dataView.localisations.langs.LangsModel',
        'mh.module.dataView.localisations.langs.DataEditForm',
        'mh.module.dataView.localisations.langs.DataViewForm'
    ],

    xtype: 'mofp-langs',

        viewModel: {
            type: 'mofp-langs'
        },
    
        controller: 'mofp-langs',

        margin: 0,

        gridIconCls: 'x-fa fa-comments-o',

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
                {
                    bind: {text: '{localisation.langCode}'},
                    dataIndex: 'langCode',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.name}'},
                    dataIndex: 'name',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.description}'},
                    dataIndex: 'description',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.isDefault}'},
                    dataIndex: 'isDefault',
                    flex: 1,
                    filter: {
                        type: 'boolean'
                    }
                }
            ]
        },
        form: 'mh.module.dataView.localisations.langs.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localisations.langs.DataEditForm'
    });

}());