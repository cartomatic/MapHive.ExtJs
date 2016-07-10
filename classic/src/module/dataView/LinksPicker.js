//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a modal editor that wraps up standardised link picker with user defined dataviews
     */
    Ext.define('mh.module.dataView.LinksPicker', {
        extend: 'Ext.window.Window',

    requires: [
        'mh.module.dataView.LinksPickerController',
        'mh.module.dataView.LinksPickerModel'
    ],

    viewModel: {
            type: 'mh-links-picker'
        },

        /**
         * @event linkspicked
         * @param {Ext.data.Model[]} records
         */

        modal: true,

        closable: false,

        controller: 'mh-links-picker',

        layout: 'fit',

        closeAction: 'hide',

        width: 600,
        height: 500,

        iconCls: 'x-fa fa-link',

        config: {
            'btnAdd|setUI': null,
            'btnAdd|setScale': null,
            'btnAdd|setIconCls': null,
            'btnCancel|setUI': null,
            'btnCancel|setScale': null,
            'btnCancel|setIconCls': null
        },

        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        reference: 'btnAdd',
                        iconCls: 'x-fa fa-plus',
                        bind: {
                            text: '{localisation.btnAdd}'
                        },
                        listeners: {
                            click: 'onBtnAddClick'
                        }
                    },
                    {
                        xtype: 'button',
                        reference: 'btnCancel',
                        iconCls: 'x-fa fa-remove',
                        bind: {
                            text: '{localisation.btnCancel}'
                        },
                        listeners: {
                            click: 'onBtnCancelClick'
                        }
                    }
                ]
            }
        ]
    });

}());