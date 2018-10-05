//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * basic list view cfg for mobile views
     */
    Ext.define('mh.module.dataView.DataViewMobile', {
        extend: 'Ext.Panel',

        xtype: 'mh-data-view-mobile',

        requires: [
            'mh.module.dataView.DataViewMobileController',
            'mh.module.dataView.DataViewMobileModel'
        ],

        controller: 'mh-data-view-mobile',
        viewModel: {
            type: 'mh-data-view-mobile'
        },

        header: false,

        config: {
            /**
             * the actual view configuration for mh-data-view-list
             */
            viewCfg: {
                xtype: 'mh-data-view-list'
            },

            // /**
            //  * whether or the grid should automatically load; overrides whatever may have been configured on the store
            //  */
            // autoLoad: true,

            /**
             * whether or not create btn should be visible
             */
            enableCreate: false,

            /**
             * whether or not edit btn should be visible
             */
            enableEdit: false,

            /**
             * whether or not delete btn should be visible
             */
            enableDestroy: false

            // gridBtnEditUi: 'mh-data-view-grid-btn-edit',
            // gridBtnDestroyUi: 'mh-data-view-grid-btn-destroy',

        },

        layout: 'fit',

        listeners: {
            activate: 'onViewActivate'
        }
    });
}());
