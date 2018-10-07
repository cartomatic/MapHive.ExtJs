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

        xtype: 'mh-mobile-data-view',

        requires: [
            'mh.module.dataView.phone.DataViewController',
            'mh.module.dataView.phone.DataViewModel'
        ],

        controller: 'mh-mobile-data-view',
        viewModel: {
            type: 'mh-mobile-data-view'
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

        items: [
            {
                xtype: 'button',
                reference: 'btnCreate',
                hidden: true,
                floated: true,
                ui: 'confirm round',
                right: 15,
                bottom: 15,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewNew'),
                listeners: {
                    tap: 'onBtnCreateTap'
                }
            }
        ],

        listeners: {
            activate: 'onViewActivate',
            deactivate: 'onViewDeactivate'
        }
    });
}());
