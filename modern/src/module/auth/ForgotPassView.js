//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.auth.ForgotPassView', {
        extend: 'Ext.Container',

        xtype: 'mh-auth-forgot-pass',

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
                header: {
                    bind: {
                        title: '{localization.titleForgotPass}'
                    },
                    iconCls: 'x-li li-question-circle'
                },
                items: [
                    {
                        xtype: 'emailfield',
                        reference: 'txtForgotPassEmail',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.emailEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 5 0' //trbl
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnResetPassRequest}'
                                },
                                iconAlign: 'left',
                                iconCls: 'x-i54c i54c-key-22',
                                ui: 'action',
                                margin: '0 0 0 0', //trbl
                                listeners: {
                                    tap: 'onPassResetRequestBtnClick'
                                }
                            },
                            {
                                xtype: 'container',
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnResetPassCancel}'
                                },
                                iconAlign: 'right',
                                iconCls: 'x-li li-chevron-right-circle',
                                ui: 'confirm',
                                listeners: {
                                    tap: 'onResetPassCancelBtnClick'
                                }
                            }
                        ]
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
