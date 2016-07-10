//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.EmailTemplates', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localisations.emailTemplates.DataEditForm',
        'mh.module.dataView.localisations.emailTemplates.DataViewForm',
        'mh.module.dataView.localisations.emailTemplates.EmailTemplatesController',
        'mh.module.dataView.localisations.emailTemplates.EmailTemplatesModel'
    ],

    xtype: 'mofp-email-templates',

        viewModel: {
            type: 'mofp-email-templates'
        },
    
        controller: 'mofp-email-templates',

        margin: 0,

        gridIconCls: 'x-fa fa-envelope',

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
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
                    bind: {text: '{localisation.applicationName}'},
                    dataIndex: 'applicationName',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.identifier}'},
                    dataIndex: 'identifier',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localisation.isBodyHtml}'},
                    dataIndex: 'isBodyHtml',
                    width: 75,
                    filter: {
                        type: 'boolean'
                    }
                },
                {
                    bind: {text: '{localisation.translations}'},
                    dataIndex: 'translations',
                    width: 0, //so the column is effectively hidden, but searchable at the same time
                    filter: {
                        type: 'string'
                    }
                }
            ]
        },
        form: 'mh.module.dataView.localisations.emailTemplates.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localisations.emailTemplates.DataEditForm'
    });

}());