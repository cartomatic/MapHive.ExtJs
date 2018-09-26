//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a modal editor that wraps up standardised link picker with user defined dataviews
     */
    Ext.define('mh.module.dataView.links.LinksPicker', {
        extend: 'Ext.Dialog',

        requires: [
            'mh.module.dataView.links.LinksPickerController',
            'mh.module.dataView.links.LinksPickerModel'
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

        iconCls: 'x-li li-link',

        bodyPadding: 0,

        config: {
            /**
             * @cfg {Boolean|Number}
             * whether or not links picker refresh should be deferred. On some occasions a view that is used for picking up links may do some own setup
             * that takes some time. this is a customisation point to let the links picker wait as long as required
             * when true, defers by 1ms, when number defers by the specified number
             */
            deferLinksPickerRefresh: false
        },

        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        reference: 'btnAdd',
                        iconCls: 'x-li li-plus-circle',
                        bind: {
                            text: '{localization.btnAdd}'
                        },
                        listeners: {
                            tap: 'onBtnAddClick'
                        }
                    },
                    {
                        xtype: 'button',
                        reference: 'btnCancel',
                        iconCls: 'x-li li-cross-circle',
                        bind: {
                            text: '{localization.btnCancel}'
                        },
                        listeners: {
                            tap: 'onBtnCancelClick'
                        }
                    },
                    '->'
                ]
            }
        ]
    });

}());