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
        'Ext.container.Container',
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
            gridIconCls: 'x-i54c i54c-isert-tabel',

            /**
             * whether or not grid header should be shown; hiding headers is useful when using the generic dataview in pickers
             */
            hideGridHeader: false,

            /**
             * whether or not form header should be hidden. useful when using in more specific layouts
             */
            hideFormHeader: false,

            /**
             * whether or not create btn should be visible
             */
            preventCreate: false,

            /**
             * whether or not edit btn should be visible
             */
            preventEdit: false,

            /**
             * whether or not delete btn should be visible
             */
            preventDelete: false,

            /**
             * @cfg {string|Object} form; used to inject form definition - can be a js object literal or a class name; to suppress form creation
             * provide a boolean false value
             */
            //TODO - make it instantiable via xtypes too!
            form: '',

            /**
             * form panel icon cls
             */
            formIconCls: 'x-i54 i54-detail-view',

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

            /**
             * whether or not the grid panel should be collapsible or not
             */
            collapsible: false,

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
                xtype: 'panel',
                layout: 'fit',
                reference: 'westFormHolder',
                region: 'west',
                width: 350,
                hidden: true,
                split: true,
                collapsible: true,
                items: []
            },
            {
                xtype: 'panel',
                layout: 'fit',
                reference: 'centerOuterHolder',
                region: 'center',
                split: true,
                bind: {
                    title: '{localisation.gridTitle}'
                },
                items: [
                    {
                        xtype: 'panel',
                        preventHeader: true,
                        reference: 'gridHolder',
                        layout: 'fit',
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
                                        iconCls: 'x-li li-plus-circle',
                                        bind: { text: '{localisation.btnCreate}'},
                                        listeners: {
                                            click: 'onBtnCreateClick'
                                        }
                                    },
                                    { xtype: 'tbseparator', reference: 'btnCreateSeparator' },
                                    {
                                        xtype: 'button',
                                        reference: 'btnEdit',
                                        iconCls: 'x-i54 i54-edit-app',
                                        bind: {
                                            text: '{localisation.btnEdit}',
                                            disabled: '{!editable}'
                                        },
                                        listeners: {
                                            click: 'onBtnEditClick'
                                        }
                                    },
                                    { xtype: 'tbseparator', reference: 'btnEditSeparator' },
                                    {
                                        xtype: 'button',
                                        reference: 'btnDelete',
                                        iconCls: 'x-li li-cross-circle',
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
                xtype: 'panel',
                bind: {
                    title: '{localisation.formTitle}'
                },
                layout: 'fit',
                reference: 'eastFormHolder',
                region: 'east',
                width: 350,
                split: true,
                collapsible: true,
                items: [
                    //need this inner wrapper so view model does not get disconnected when removing nested items.
                    {
                        xtype: 'container',
                        layout: 'fit',
                        reference: 'formInnerHolder',
                    }
                ]
            }
        ]
    });
}());