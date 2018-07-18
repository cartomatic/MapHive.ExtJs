//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * pass change view for the modern toolkit
     */
    Ext.define('mh.module.auth.PassChange', {
        extend: 'Ext.Panel',
    
        xtype: 'mh-auth-pass-change',

        requires: [
            'mh.module.auth.PassChangeController'
        ],

        controller: 'mh-auth-pass-change',
        viewModel: true,

        modal: true,

        hideOnMaskTap: false,

        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        centered: true,

        bodyPadding: 10,

        height: 270,

        items: [
            {
                margin: '10 0 10 0', //trbl
                bind: {
                    html: '{localization.title}'
                }
            },
            {
                xtype: 'passwordfield',
                reference: 'txtOldPass',
                clearable: true,
                bind: {
                    placeholder: '{localization.oldPass}'
                },
                cls: 'mh-auth-text-border',
                margin: '5 0 0 0' //trbl
            },
            {
                xtype: 'passwordfield',
                reference: 'txtNewPass',
                clearable: true,
                bind: {
                    placeholder: '{localization.newPass}'
                },
                cls: 'mh-auth-text-border',
                margin: '5 0 0 0' //trbl
            },
            {
                xtype: 'passwordfield',
                reference: 'txtRepeatPass',
                clearable: true,
                bind: {
                    placeholder: '{localization.repeatPass}'
                },
                cls: 'mh-auth-text-border',
                margin: '5 0 10 0' //trbl
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localization.btnChangePass}'
                        },
                        iconAlign: 'left',
                        iconCls: 'x-li li-refresh',
                        ui: 'action',
                        margin: '0 10 0 0', //trbl
                        listeners: {
                            tap: 'onBtnChangePassClick'
                        }
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localization.btnCancel}'
                        },
                        iconAlign: 'right',
                        iconCls: 'x-li li-cross-circle',
                        ui: 'confirm',
                        listeners: {
                            tap: 'onBtnCancelClick'
                        }
                    }
                ]
            }
        ]
    });

}());