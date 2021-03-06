//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on

    'use strict';

    Ext.define('mh.module.dataView.desktop.EditView', {
        extend: 'mh.module.dataView.desktop.RecordView',

        requires: [
            'Ext.layout.Fit',
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.EditViewModel',
            'mh.module.dataView.desktop.EditViewController',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-desktop-edit-view',

        viewModel: {
            type: 'mh-edit-view'
        },

        config: {
            /**
             * hook for providing definitions of child components. they are pushed into view's tab panel on init
             * this way it is not necessary to re-declare tab panel every time a view is extended
             */
            screens: null,

            /**
             * by default models use whatever url is defined on their proxies.
             * This enables customising urls but only for the needed save operation (either create or update)
             */
            customUrl: null,

            /**
             * whether or not edit view should observe dirty mode; observing dirty mode means that whenever an edit view has modified a record and user changes url without
             * saving rec changes (for example by pressing back button), there will be a prompt that lets user cancel an operation or proceed with the dismiss
             */
            dirtyModeOn: true
        },

        bind: {
            iconCls: '{viewIcon}'
        },

        tools: {
            action: {
                xtype: 'button',
                reference: 'btnEdit',
                bind: {
                    text: '{record.phantom? localization.create : localization.update}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnSave'),
                margin: '0 10 0 0',
                weight: 30,
                handler: 'onBtnSaveTap'
            },

            back: {
                xtype: 'button',
                reference: 'btnBack',
                bind: {
                    text: '{localization.btnBack}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnBack'),
                margin: '0 10 0 0',
                weight: 40,
                handler: 'onBtnCancelTap'
            }
        }

    });
}());