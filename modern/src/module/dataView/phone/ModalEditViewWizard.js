//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalEditViewWizard', {
        extend: 'Ext.Panel',
    
        xtype: 'mh-phone-modal-edit-view-wizard',

        requires: [
            'mh.module.dataView.phone.ModalEditViewWizardController',
            'mh.module.dataView.phone.ModalEditViewWizardModel',
            'mh.module.dataView.phone.EditViewWizardPagingToolbar',
            'mh.module.dataView.phone.EditViewWizardTitleToolbar'
        ],

        controller: 'mh-phone-modal-edit-view-wizard',
        viewModel: {
            type: 'mh-phone-modal-edit-view-wizard'
        },

        config: {
            /**
             * an array of views to be used by the wizard
             */
            views: null
        },

        layout: 'fit',

        items: [
            {
                xtype: 'mh-phone-edit-view-wizard-title-toolbar'
            },
            {
                xtype: 'container',
                reference: 'viewSwitcher',
                layout: {
                    type: 'card',
                    animation: 'fade'
                }
            },
            {
                xtype: 'mh-phone-edit-view-wizard-paging-toolbar'
            }
        ],

        listeners: {
            activate: 'onViewActivate'
        }
    });
}());
