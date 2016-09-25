//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.localisationClasses.LocalisationClasses', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localisations.localisationClasses.DataEditForm',
        'mh.module.dataView.localisations.localisationClasses.LocalisationClassesController',
        'mh.module.dataView.localisations.localisationClasses.LocalisationClassesModel'
    ],

    xtype: 'mh-localisation-classes',

        viewModel: {
            type: 'mh-localisation-classes'
        },
    
        controller: 'mh-localisation-classes',

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
                    bind: {text: '{localisation.inheritedClassName}'},
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
        editForm: 'mh.module.dataView.localisations.localisationClasses.DataEditForm'
    });

}());