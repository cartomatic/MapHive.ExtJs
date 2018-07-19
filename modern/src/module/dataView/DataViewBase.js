//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * generic data view skeleton
     */
    Ext.define('mh.module.dataView.DataViewBase', {

        extend: 'Ext.Panel',
        xtype: 'mh-dataview-base',

        requires: [
            'Ext.layout.Fit',
            'mh.module.dataView.DataViewBaseController',
            'mh.module.dataView.DataViewBaseGrid',
            'mh.module.dataView.DataViewBaseModel',
            'mh.module.dataView.DataViewBaseToolbar',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-dataview-base',

        viewModel: {
            type: 'mh-dataview-base'
        },

        config: {

            /**
             * mh-dataview-base-grid cfg to be used for this view
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
            getPreventDestroy: false,

            /**
             * whether or not dbl taps on grid should be handled or not; default behavior is to open up a record in 'view' mode
             */
            disableGridDblTap: false
        },

        layout: 'fit',

        tbar: {
            xtype: 'mh-dataview-base-toolbar'
        },

        listeners: {
            activate: 'onViewActivate'
        }
    });
}());