//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalEditView', {
        extend: 'Ext.Container',
    
        xtype: 'mh-phone-modal-edit-view',

        requires: [
            'mh.module.dataView.phone.ModalEditViewController',
            'mh.module.dataView.phone.ModalEditViewModel',
            'mh.module.dataView.phone.ModalNavigationToolbar'
        ],

        controller: 'mh-phone-modal-edit-view',
        viewModel: {
            type: 'mh-phone-modal-edit-view'
        },

        config: {
            /**
             * an array of form items that are to be rendered;
             * this view uses a simple vertically scrollable content panel
             */
            viewItems: null,

            /**
             * whether or not the default edit view save btn should be visible
             */
            enableSave: true,

            /**
             * whether or not dismiss btn should be enabled
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
                reference: 'saveBtn',
                hidden: true,
                bottom: 15,
                right: 15,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnSave'),
                ui: 'mh-phone-modal-edit-view-edit-btn raised',
                listeners: {
                    tap: 'onSaveBtnTap'
                }
            },
            {
                xtype: 'button',
                reference: 'dismissBtn',
                hidden: true,
                bottom: 15,
                left: 15,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDismiss'),
                ui: 'mh-phone-modal-edit-view-dismiss-btn raised',
                listeners: {
                    tap: 'onDismissBtnTap'
                }
            }
        ]
    });
}());
