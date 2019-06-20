//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.EmailTemplates', {
        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.localizations.emailTemplates.DataEditForm',
        'mh.module.dataView.localizations.emailTemplates.DataViewForm',
        'mh.module.dataView.localizations.emailTemplates.EmailTemplatesController',
        'mh.module.dataView.localizations.emailTemplates.EmailTemplatesModel'
    ],

    xtype: 'mh-email-templates',

        viewModel: {
            type: 'mh-email-templates'
        },
    
        controller: 'mh-email-templates',

        margin: 0,

        gridIconCls: 'x-i54c i54c-mail-at',

        grid: {
            xtype: 'grid',
            border: false,
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            columns: [
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
                    bind: {text: '{localization.applicationName}'},
                    dataIndex: 'applicationName',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.identifier}'},
                    dataIndex: 'identifier',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.isBodyHtml}'},
                    dataIndex: 'isBodyHtml',
                    width: 75,
                    filter: {
                        type: 'boolean'
                    }
                },
                {
                    bind: {text: '{localization.translations}'},
                    dataIndex: 'translations',
                    width: 0, //so the column is effectively hidden, but searchable at the same time
                    filter: {
                        type: 'string'
                    }
                }
            ]
        },
        form: 'mh.module.dataView.localizations.emailTemplates.DataViewForm',
        //formWidth: 300,
        editForm: 'mh.module.dataView.localizations.emailTemplates.DataEditForm'
    });

}());