//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on

    'use strict';
    Ext.define('mh.module.dataView.phone.EditView', {
        extend: 'Ext.Panel',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.EditViewModel',
            'mh.module.dataView.phone.EditViewController',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-phone-edit-view',

        viewModel: {
            type: 'mh-edit-view'
        },

        config: {
            /**
             * by default models use whatever url is defined on their proxies.
             * This enables customising urls but only for the needed save operation (either create or update)
             */
            customUrl: null,

            /**
             * whether or not the default edit view save btn should be visible
             */
            enableSave: true,

            /**
             * whether or not dismiss btn should be enabled
             */
            enableDismiss: true,

            /**
             * view items to be added to this view
             */
            viewItems: null,

            /**
             * whether or not mobile nav menu back navigation from this view should be prevented
             */
            preventBackNavigation: false,

            /**
             * whether or not edit view should observe dirty mode; observing dirty mode means that whenever an edit view has modified a record and user changes url without
             * saving rec changes (for example by pressing back button), there will be a prompt that lets user cancel an operation or proceed with the dismiss
             */
            dirtyModeOn: true
        },

        bind: {
            iconCls: '{viewIcon}'
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
                reference: 'saveBtn',
                ui: 'mh-phone-green-btn raised',
                right: 15,
                bottom: 15,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnSave'),
                listeners: {
                    tap: 'onBtnSaveTap'
                }
            },
            {
                xtype: 'button',
                reference: 'dismissBtn',
                ui: 'mh-phone-red-btn raised',
                left: 15,
                bottom: 15,
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