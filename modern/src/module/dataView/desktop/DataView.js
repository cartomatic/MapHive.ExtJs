//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * generic data view skeleton
     */
    Ext.define('mh.module.dataView.desktop.DataView', {

        extend: 'Ext.Panel',
        xtype: 'mh-desktop-data-view',

        requires: [
            'Ext.layout.Fit',
            'mh.module.dataView.desktop.DataViewController',
            'mh.module.dataView.desktop.DataViewGrid',
            'mh.module.dataView.DataViewModel',
            'mh.module.dataView.desktop.DataViewToolbar',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-desktop-data-view',

        viewModel: {
            type: 'mh-data-view'
        },

        config: {

            /**
             * mh-data-view-grid cfg to be used for this view
             */
            gridCfg: null,

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
             * whether or not grid should be auto reloaded on view being activated
             */
            autoReloadOnViewActivate: true,

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
            preventDestroy: false,

            /**
             * whether or not dbl taps on grid should be handled or not; default behavior is to open up a record in 'view' mode
             */
            disableGridDblTap: false,

            btnCreateUi: 'mh-data-view-btn-create',
            btnEditUi: 'mh-data-view-btn-edit',
            btnDestroyUi: 'mh-data-view-btn-destroy',

            gridBtnEditUi: 'mh-data-view-grid-btn-edit',
            gridBtnDestroyUi: 'mh-data-view-grid-btn-destroy',

            pageSizes: [25,50,75,100],

            /**
             * selection mode for the grid
             */
            selMode: 'single',

            /**
             * allows for customizing the retrieval of translations for this module; useful when dynamically creating an instance without inheritance
             */
            translationsNameSpace: null
        },

        layout: 'fit',

        tbar: {
            xtype: 'mh-desktop-data-view-toolbar'
        },

        listeners: {
            activate: '__onViewActivate'
        }
    });
}());