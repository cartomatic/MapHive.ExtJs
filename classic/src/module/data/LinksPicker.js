//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a modal editor that wraps up standardised link picker with user defined dataviews
     */
    Ext.define('mh.module.data.LinksPicker', {
        extend: 'Ext.window.Window',

    requires: [
        'mh.module.data.LinksPickerController',
        'mh.module.data.LinksPickerModel'
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