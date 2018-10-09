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
            'Ext.carousel.Carousel'
        ],

        viewModel: {
            type: 'mh-edit-view'
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
                xtype: 'container',
                docked: 'top',
                style: {
                    marginTop: '10px',
                    padding: '5px'
                },
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    { xtype: 'container', flex: 1},
                    {
                        xtype: 'label',
                        reference: 'titleBarLabel',
                        html: '&nbsp'
                    },
                    { xtype: 'container', flex: 1}
                ]
            },

            {
                xtype: 'carousel',
                indicator: false,
                reference: 'viewSwitcher',
                layout: {
                    type: 'card'
                    //,animation: 'fade'
                }
            }
        ],

        bbar: {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                {
                    xtype: 'button',
                    reference: 'btnPrev',
                    ui: 'mh-phone-edit-view-wizard-soft-purple',
                    iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnPrev'),
                    listeners: {
                        tap: 'displayPreviousView'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'mh-phone-edit-view-wizard-gray-button',
                    listeners: {
                        tap: 'onBtnCancelTap'
                    },
                    iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnCancel'),
                    margin: '0 15 0 0' //trbl
                },
                {
                    xtype: 'button',
                    ui: 'mh-phone-edit-view-wizard-soft-green',
                    listeners: {
                        tap: 'onBtnSaveTap'
                    },
                    iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnSave')
                },
                '->',
                {
                    xtype: 'button',
                    reference: 'btnNext',
                    ui: 'mh-phone-edit-view-wizard-soft-purple',
                    iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnNext'),
                    listeners: {
                        tap: 'displayNextView'
                    }
                }
            ]
        }

    });
}());
