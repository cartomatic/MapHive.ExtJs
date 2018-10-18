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
            formItems: null,

            /**
             * edit view lookupKey to be used to find an edit view via the mh.module.dataView.phone.ModalRecordViewSharedController apis
             */
            editViewLookupKey: null
        },

        items: [
            {
                xtype: 'mh-phone-modal-navigation-toolbar'
            },
            {
                xtype: 'panel',
                reference: 'formHolder',
                scrollable: 'y',
                bodyPadding: 10
            },
            {
                xtype: 'button',
                reference: 'editBtn',
                hidden: true,
                bottom: 10,
                right: 10,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewEdit'),
                ui: 'confirm round raised', //TODO - change style to own style
                listeners: {
                    tap: 'onEditBtnTap'
                }
            },
            {
                xtype: 'button',
                bottom: 10,
                left: 10,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDismiss'),
                ui: 'decline round raised', //TODO - change style to own style
                listeners: {
                    tap: 'onDismissTap'
                }
            }
        ]
    });
}());
