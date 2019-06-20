//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.localizationClasses.LocalizationClasses', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localizations.localizationClasses.DataEditForm',
        'mh.module.dataView.localizations.localizationClasses.LocalizationClassesController',
        'mh.module.dataView.localizations.localizationClasses.LocalizationClassesModel'
    ],

    xtype: 'mh-localization-classes',

        viewModel: {
            type: 'mh-localization-classes'
        },
    
        controller: 'mh-localization-classes',

        gridIconCls: 'x-i54c i54c-computer-network2',

        margin: 0,

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
                {
                    bind: {text: '{localization.applicationName}'},
                    dataIndex: 'applicationName',
                    width: 200,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.className}'},
                    dataIndex: 'className',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.inheritedClassName}'},
                    dataIndex: 'inheritedClassName',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                }
            ]
        },

        form: false,
        //formWidth: 300,
        editForm: 'mh.module.dataView.localizations.localizationClasses.DataEditForm'
    });

}());