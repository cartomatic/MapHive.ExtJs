//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
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
            viewItems: null,

            swipeCfg: {
                /**
                 * whether or not swipe should be recognized and the wizard should switch cards on swipe
                 */
                enableSwipe: true,
                /**
                 * swiped distance before the swipe gets approved as a change card gesture
                 */
                swipeRecognitionDistance: 100

                //<debug>
                /**
                 * whether or not should log swipe events
                 */
                , logSwipeEvents: true
                //</debug>
            },

            /**
             * whether or not forms should be complete; each view of wizard can prevent scrolling further IF it has a isComplete fn and it returns false
             */
            enforceCompleteFormsOnViewChange: false,

            /**
             * whether or not should prevent saving until all forms are complete
             */
            enforceCompleteFormsOnSave: true
        },

        layout: 'fit',

        items: [
            {
                xtype: 'mh-phone-modal-navigation-toolbar'
            },
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
            show: 'onViewShow',
            hide: 'onViewHide'
        }
    });
}());
