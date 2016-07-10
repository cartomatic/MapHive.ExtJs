//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.AppLocalisations', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localisations.appLocalisations.DataEditForm',
        'mh.module.dataView.localisations.appLocalisations.DataViewForm',
        'mh.module.dataView.localisations.appLocalisations.AppLocalisationsController',
        'mh.module.dataView.localisations.appLocalisations.AppLocalisationsModel'
    ],

    xtype: 'mofp-app-localisations',

        viewModel: {
            type: 'mofp-app-localisations'
        },
    
        controller: 'mofp-app-localisations',

        gridIconCls: 'x-fa fa-desktop',

        margin: 0,

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
                {
                    bind: {text: '{localisation.applicationName}'},
                    dataIndex: 'applicationName',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.className}'},
                    dataIndex: 'className',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.translationKey}'},
                    dataIndex: 'translationKey',
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

        form: 'mh.module.dataView.localisations.appLocalisations.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localisations.appLocalisations.DataEditForm'
    });

}());