//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a modal editor that wraps up standardised link picker with user defined dataviews
     */
    Ext.define('mh.module.dataView.desktop.linksPicker', {
        extend: 'Ext.window.Window',

    requires: [
        'mh.module.dataView.desktop.linksPickerController',
        'mh.module.dataView.desktop.linksPickerModel'
    ],

    viewModel: {
            type: 'mh-desktop-links-picker'
        },

        /**
         * @event linkspicked
         * @param {Ext.data.Model[]} records
         */

        modal: true,

        closable: false,

        controller: 'mh-desktop-links-picker',

        layout: 'fit',

        closeAction: 'hide',

        width: 600,
        height: 500,

        iconCls: 'x-li li-link',

        config: {
            'btnAdd|setUI': null,
            'btnAdd|setScale': null,
            'btnAdd|setIconCls': null,
            'btnCancel|setUI': null,
            'btnCancel|setScale': null,
            'btnCancel|setIconCls': null,

            /**
             * @cfg {Boolean|Number}
             * whether or not links picker refresh should be deferred. On some occassions a view that is used for picking up links may do some own setup
             * that takes some time. this is a customisation point to let the links picker wait as long as required
             * when true, defers by 1ms, when number defers by the specified number
             */
            deferLinksPickerRefresh: false
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
                        iconCls: 'x-li li-plus-circle',
                        bind: {
                            text: '{localization.btnAdd}'
                        },
                        listeners: {
                            click: 'onBtnAddClick'
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
                            click: 'onBtnCancelClick'
                        }
                    }
                ]
            }
        ]
    });

}());