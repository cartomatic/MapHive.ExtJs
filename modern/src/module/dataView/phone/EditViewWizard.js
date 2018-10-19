//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 09.10.2018.
     */
    Ext.define('mh.module.dataView.phone.EditViewWizard', {
        extend: 'mh.module.dataView.phone.EditView',
        xtype: 'mh-phone-edit-view-wizard',
        controller: 'mh-phone-edit-view-wizard',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.Icons',
            'Ext.carousel.Carousel',
            'mh.module.dataView.phone.EditViewWizardPagingToolbar',
            'mh.module.dataView.phone.EditViewWizardTitleToolbar'
        ],

        viewModel: {
            type: 'mh-edit-view'
        },

        config: {
            /**
             * an array of views to be used by the wizard
             */
            viewItems: null
        },

        layout: 'fit',

        items: [
            {
                xtype: 'mh-phone-edit-view-wizard-title-toolbar'
            },
            {
                //Note: perhaps could make this dynamic?? so can choose the way layout works.
                //xtype: 'carousel',
                //indicator: false,
                xtype: 'container',
                reference: 'viewSwitcher',
                layout: {
                    type: 'card'
                    ,animation: 'fade'
                }
            },
            {
                xtype: 'mh-phone-edit-view-wizard-paging-toolbar'
            }
        ]

    });
}());
