//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.EditViewWizardPagingToolbar', {
        extend: 'Ext.Toolbar',

        xtype: 'mh-phone-edit-view-wizard-paging-toolbar',

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
    });
}());
