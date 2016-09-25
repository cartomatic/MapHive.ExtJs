//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * simple generic data view that brings together a grid display and form record display and also provides some CRUD action hooks
     */
    Ext.define('mh.module.dataView.DataViewBase', {
        extend: 'Ext.container.Container',

    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Toolbar',
        'mh.module.dataView.DataViewBaseController',
        'mh.module.dataView.DataViewBaseModel'
    ],

    xtype: 'mh-dataview-base',

        viewModel: {
            type: 'mh-dataview-base'
        },
    
        controller: 'mh-dataview-base',

        config: {
            /**
             * @cfg {string|Object} grid; used to inject grid definition - can be a js object literal or a class name; to suppress grid creation
             * provide a boolean false value
             */
            //TODO - make it instantiable via xtypes too!
            grid: '',

            /**
             * Grid panel icon cls
             */
            gridIconCls: 'x-fa fa-table',

            /**
             * whether or not grid header should be shown; hiding headers is useful when using the generic dataview in pickers
             */
            hideGridHeader: false,

            /**
             * whether or not form header should be hidden. useful when using in more specific layouts
             */
            hideFormHeader: false,

            /**
             * @cfg {string|Object} form; used to inject form definition - can be a js object literal or a class name; to suppress form creation
             * provide a boolean false value
             */
            //TODO - make it instantiable via xtypes too!
            form: '',

            /**
             * form panel icon cls
             */
            formIconCls: 'x-fa fa-th-list',

            /**
             * Width of the edit form
             */
            formWidth: 350,

            /**
             * edit form if different than data view form which is likely to be the case in most scenarios;
             * IMPORTANT: edit form (or data view form) in order to be usable DOES HAVE to use a view controller that inherits from mh.module.dataView.EditFormController
             * or must provide the very same API otherwise. See mh.module.dataView.EditFormController.init for the APIs the controller publishes and the Editor relies on
             */
            //TODO - make it instantiable via xtypes too!
            editForm: '',

            /**
             * Editor class fully qualified name. if not provided, defaults to the default mh.module.dataView.Editor
             * editors should either extend mh.module.dataView.Editor or provide the api exposed by it. see the source code for details - in particular the apis
             * exposed (published to the view) by the view controller
             */
            editor: null,

            /**
             * Whether or not should attempt to include auto filter
             */
            useAutoFilter: true,

            /**
             * whether or the grid should automatically load; overrides whatever may have been configured on the store
             */
            autoLoad: true,

            /**
             * Whether or not filtering should be done on the serverside; overrides whatever may have been configured on the store
             */
            remoteSort: true,

            /**
             * whether or not filtering should happen on the serverside; overrides whatever may have been configured on the store
             */
            remoteFilter: true,

            /**
             * selection mode to be applied to the grid
             */
            selMode: 'SINGLE',

            //component visual customisation
            'btnCreate|setUI': null,
            'btnCreate|setScale': null,
            'btnCreate|setIconCls': null,
            'btnEdit|setUI': null,
            'btnEdit|setScale': null,
            'btnEdit|setIconCls': null,
            'btnDelete|setUI': null,
            'btnDelete|setScale': null,
            'btnDelete|setIconCls': null,

            'gridHolder|setIconCls': null,
            'gridHolder|setUI': null,
            'formHolder|setIconCls': null,
            'formHolder|setUI': null

        },

        layout: 'border',
        items: [
            {
                xtype: 'container',
                layout: 'fit',
                reference: 'westOuterHolder',
                region: 'west',
                width: 350,
                hidden: true,
                split: true,
                items: []
            },
            {
                xtype: 'container',
                layout: 'fit',
                reference: 'centerOuterHolder',
                region: 'center',
                split: true,
                items: [
                    {
                        xtype: 'panel',
                        reference: 'gridHolder',
                        layout: 'fit',
                        bind: {
                            title: '{localisation.gridTitle}'
                        },
                        dockedItems: [
                            {
                                dock: 'top',
                                xtype: 'toolbar',
                                reference: 'gridTbar',
                                hidden: true,
                                items: [
                                    '->',
                                    {
                                        xtype: 'button',
                                        reference: 'btnCreate',
                                        iconCls: 'x-fa fa-plus',
                                        bind: { text: '{localisation.btnCreate}'},
                                        listeners: {
                                            click: 'onBtnCreateClick'
                                        }
                                    },
                                    { xtype: 'tbseparator' },
                                    {
                                        xtype: 'button',
                                        reference: 'btnEdit',
                                        iconCls: 'x-fa fa-edit',
                                        bind: {
                                            text: '{localisation.btnEdit}',
                                            disabled: '{!editable}'
                                        },
                                        listeners: {
                                            click: 'onBtnEditClick'
                                        }
                                    },
                                    { xtype: 'tbseparator' },
                                    {
                                        xtype: 'button',
                                        reference: 'btnDelete',
                                        iconCls: 'x-fa fa-remove',
                                        bind: {
                                            text: '{localisation.btnDelete}',
                                            disabled: '{!deletable}'
                                        },
                                        listeners: {
                                            click: 'onBtnDeleteClick'
                                        }
                                    }
                                ]
                            },
                            {
                                dock: 'bottom',
                                reference: 'pagingToolbar',
                                xtype: 'pagingtoolbar',
                                bind: {
                                    store: '{gridstore}'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'fit',
                reference: 'eastOuterHolder',
                region: 'east',
                width: 350,
                split: true,
                items: [
                    {
                        xtype: 'panel',
                        region: 'east',
                        layout: 'fit',
                        reference: 'formHolder',
                        split: true,
                        width: 350,
                        bind: {
                            title: '{localisation.formTitle}'
                        }
                    }
                ]
            }
        ]
    });
}());