//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.applications.Applications', {

        extend: 'mh.module.dataView.DataViewBase',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.filters.Filters',
        'mh.module.dataView.applications.ApplicationsController',
        'mh.module.dataView.applications.ApplicationsModel',
        'mh.module.dataView.applications.DataEditForm',
        'mh.module.dataView.applications.DataViewForm'
    ],

    xtype: 'mh-applications',

        viewModel: {
            type: 'mh-applications'
        },

        controller: 'mh-applications',

        //Some custom ui cfg
        // 'btnCreate|setUI': 'green-button',
        // 'btnEdit|setUI': 'blue-button',
        // 'btnDelete|setUI': 'red-button',
        //
        // 'gridHolder|setUI': 'green-panel',

        grid: {
            xtype: 'grid',
            plugins: 'gridfilters',
            bind: {store: '{gridstore}'},
            border: false,
            columns: [
                {
                    bind: {text: '{localization.name}'},
                    dataIndex: 'name',
                    width: 175,
                    filter: {
                        // required configs
                        type: 'date',
                        dateFormat: 'C'
                    }
                },
                {
                    bind: {text: '{localization.shortName}'},
                    dataIndex: 'shortName',
                    width: 100,
                    filter: {
                        // required configs
                        type: 'string'
                    }
                },
                {
                    bind: {text: '{localization.description}'},
                    dataIndex: 'description',
                    flex: 2
                    //filter: {
                    //    // required configs
                    //    type: 'number',
                    //    itemDefaults: {
                    //        // any Ext.form.field.Text configs accepted
                    //    }
                    //}
                },
                {
                    bind: {text: '{localization.url}'},
                    dataIndex: 'url',
                    flex: 1
                },
                {
                    text: 'splash',
                    dataIndex: 'useSplashscreen',
                    flex: 1,
                    filter: {
                        // required configs
                        type: 'boolean'
                    },
                    hidden: true
                },
                {
                    xtype: 'actioncolumn',
                    handler: 'onAppNavigateToClick',
                    width: 30,
                    iconCls: 'x-li li-link',
                    menuDisabled: true,
                    
                    //Note: tips for active columns are a bit tricky, as they require a function here. Therefore in order to ensure view instance encapsulation, customisation is done in the controller; there are two ways of customising a tooltip - via a translation key - this will always apply the same tip to each row, or via specifying a function name, that if present on a controller, will be used as a customised getTip fn; for more details see mh.mixin.GridUtils.activateActiveColsTooltips
                    //getTip: 'getTipAppNavigateTo' //it would be lovely if it worked out of the box, huh?
       //             //
                    //this uses a translation key to obtain a tooltip via getTranslation(translationKey)
                    //tooltipTranslationKey: 'appNavigateToTooltip',
                    //
                    //and this provides a customised fn so each tooltip cna be customised on per row basis.
                    customGetTip: 'getTipAppNavigateTo'
                }
            ]
        },
        gridIconCls: 'x-i54c i54c-computer-network2',
        form: 'mh.module.dataView.applications.DataViewForm',
        //formWidth: 350,
        editForm: 'mh.module.dataView.applications.DataEditForm'
    });

}());