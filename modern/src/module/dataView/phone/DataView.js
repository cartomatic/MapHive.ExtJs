//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * basic list view cfg for mobile views
     */
    Ext.define('mh.module.dataView.phone.DataView', {
        extend: 'Ext.Panel',

        xtype: 'mh-phone-data-view',

        requires: [
            'mh.module.dataView.phone.DataViewController',
            'mh.module.dataView.phone.DataViewModel'
        ],

        controller: 'mh-phone-data-view',
        viewModel: {
            type: 'mh-phone-data-view'
        },

        header: false,

        config: {
            /**
             * the actual view configuration for mh-data-view-list
             */
            viewCfg: {
                xtype: 'mh-data-view-list',
                onItemDisclosure: 'onItemDisclosure'
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
            enableDestroy: false,

            /**
             * whether or not mobile nav menu back navigation from this view should be prevented
             */
            preventBackNavigation: false
        },

        layout: 'fit',

        items: [

        ],

        listeners: {
            activate: '__onViewActivate',
            deactivate: '__onViewDeactivate'
        }
    });
}());
