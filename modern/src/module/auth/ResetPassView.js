//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.auth.ResetPassView', {
        extend: 'Ext.Container',

        xtype: 'mh-auth-reset-pass',

        layout: 'vbox',

        style: {
            backgroundColor: 'transparent'
        },

        items: [
            {
                xtype: 'container',
                flex: 1
            },
            {
                xtype: 'panel',
                padding: 10,
                reference: 'resetPassForm',
                header: {
                    bind: {
                        title: '{localization.titleResetPass}'
                    },
                    iconCls: 'x-li li-question-circle'
                },
                items: [

                    {
                        xtype: 'textfield',
                        reference: 'txtPassResetVerificationKey',
                        hidden: true
                    },
                    {
                        xtype: 'passwordfield',
                        reference: 'txtPassReset',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.passNewEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 5 0' //trbl
                    },
                    {
                        xtype: 'passwordfield',
                        reference: 'txtPassResetRepeat',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.passRepeatEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 5 0' //trbl
                    },
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localization.btnResetPass}'
                        },
                        iconAlign: 'right',
                        iconCls: 'x-li li-chevron-right-circle',
                        ui: 'confirm',
                        listeners: {
                            tap: 'onResetPassBtnClick'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1
            }
        ]
    });
}());
