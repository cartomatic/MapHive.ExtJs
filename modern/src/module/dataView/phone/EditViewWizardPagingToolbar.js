//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.EditViewWizardPagingToolbar', {
        extend: 'Ext.Toolbar',

        requires: [
            'mh.module.commonConfig.CommonConfig'
        ],

        xtype: 'mh-phone-edit-view-wizard-paging-toolbar',

        docked: 'bottom',
        items: [
            {
                xtype: 'button',
                reference: 'btnPrev',
                ui: 'mh-phone-purple-btn',
                iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnPrev'),
                width: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnHeight,
                listeners: {
                    element: 'element', //because longpress can be observed at an element lvl, not a btn
                    tap: 'displayPreviousView',
                    longpress: 'displayFirstView'
                }
            },
            '->',
            {
                xtype: 'button',
                reference: 'btnCancel',
                ui: 'mh-phone-gray-btn',
                listeners: {
                    tap: 'onBtnCancelTap'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnCancel'),
                width: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnHeight,
                margin: '0 15 0 0' //trbl
            },
            {
                xtype: 'button',
                reference: 'btnSave',
                ui: 'mh-phone-soft-green-btn',
                listeners: {
                    tap: 'onBtnSaveTap'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnSave'),
                width: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnHeight
            },
            '->',
            {
                xtype: 'button',
                reference: 'btnNext',
                ui: 'mh-phone-purple-btn',
                iconCls: mh.FontIconsDictionary.getIcon('mhEditViewWizardBtnNext'),
                width: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.wizardPagingToolbar || {}).btnHeight,
                listeners: {
                    element: 'element', //because longpress can be observed at an element lvl, not a btn
                    tap: 'displayNextView',
                    longpress: 'displayLastView'
                }
            }
        ]
    });
}());
