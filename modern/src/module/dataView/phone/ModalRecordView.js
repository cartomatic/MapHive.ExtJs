//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 18.10.2018.
     */
    Ext.define('mh.module.dataView.phone.ModalRecordView', {
        extend: 'Ext.Panel',

        xtype: 'mh-phone-modal-record-view',

        requires: [
            'mh.module.dataView.phone.ModalRecordViewController',
            'mh.module.dataView.phone.ModalRecordViewModel',
            'mh.module.dataView.phone.ModalNavigationToolbar'
        ],

        controller: 'mh-phone-modal-record-view',
        viewModel: {
            type: 'mh-phone-modal-record-view'
        },

        config: {
            /**
             * an array of form items that are to be rendered;
             * this view uses a simple vertically scrollable content panel
             */
            viewItems: null,

            /**
             * edit view lookupKey to be used to find an edit view via the mh.module.dataView.phone.ModalRecordViewSharedController apis
             */
            editViewLookupKey: null,

            /**
             * whether or not edit btn should be enabled for this view
             */
            enableEdit: true,

            /**
             * whether or not a dismiss btn should be enabled
             */
            enableDismiss: true
        },

        items: [
            {
                xtype: 'mh-phone-modal-navigation-toolbar'
            },
            {
                xtype: 'panel',
                reference: 'viewItemsHolder',
                scrollable: 'y',
                bodyPadding: 10
            },
            {
                xtype: 'button',
                reference: 'editBtn',
                right: 15,
                bottom: 15,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewEdit'),
                ui: 'mh-phone-modal-record-view-edit-btn raised',
                listeners: {
                    tap: 'onEditBtnTap'
                }
            },
            {
                xtype: 'button',
                reference: 'dismissBtn',
                left: 15,
                bottom: 15,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDismiss'),
                ui: 'mh-phone-modal-record-view-dismiss-btn raised',
                listeners: {
                    tap: 'onDismissBtnTap'
                }
            }
        ]
    });
}());
