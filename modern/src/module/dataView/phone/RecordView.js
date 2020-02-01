//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.RecordView', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.RecordViewController',
            'mh.module.dataView.RecordViewModel',
            'mh.module.dataView.Icons',
            'mh.FontIconsDictionary',
            'mh.module.commonConfig.CommonConfig'
        ],

        controller: 'mh-phone-record-view',

        viewModel: {
            type: 'mh-record-view'
        },

        config: {
            /**
             * whether or not edit btn should be enabled for this view
             */
            enableEdit: true,

            /**
             * whether or not a dismiss btn should be enabled
             */
            enableDismiss: true,

            /**
             * view items to be added to this view
             */
            viewItems: null,

            /**
             * whether or not mobile nav menu back navigation from this view should be prevented
             */
            preventBackNavigation: false
        },

        bind: {
            title: '{record.name}'
        },

        header: false,

        layout: 'fit',

        items: [
            {
                xtype: 'panel',
                bodyPadding: 10,
                reference: 'viewItemsHolder',
                scrollable: 'y'
            },
            {
                xtype: 'button',
                reference: 'editBtn',
                ui: 'mh-phone-blue-btn raised',
                right: 15,
                bottom: 15,
                width: (mh.module.commonConfig.CommonConfig.recView || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.recView || {}).btnHeight,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewEdit'),
                listeners: {
                    tap: 'onBtnEditTap'
                }
            },
            {
                xtype: 'button',
                reference: 'dismissBtn',
                ui: 'mh-phone-red-btn raised',
                left: 15,
                bottom: 15,
                width: (mh.module.commonConfig.CommonConfig.recView || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.recView || {}).btnHeight,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDismiss'),
                listeners: {
                    tap: 'onBtnDismissTap'
                }
            }
        ],

        listeners: {
            activate: '__onViewActivate',
            deactivate: '__onViewDeactivate'
        }
    });
}());