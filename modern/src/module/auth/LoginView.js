//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.auth.LoginView', {
        extend: 'Ext.Container',

        xtype:'mh-auth-login',

        requires: [
            'mh.module.langSwitcher.LangSwitcherMini'
        ],

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
                reference: 'loginForm',
                header: {
                    bind: {
                        title: '{localization.titleLogin}'
                    },
                    iconCls: 'x-i54c i54c-open-lock'
                },
                tools: [
                    {
                        xtype: 'mh-lang-switcher-mini'
                    }
                ],
                items: [
                    {
                        xtype: 'emailfield',
                        reference: 'txtEmail',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.emailEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 0 0', //trbl
                        listeners: {
                            keyup: 'trapLoginEnter'
                        }
                    },
                    {
                        xtype: 'passwordfield',
                        reference: 'txtPass',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.passEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 5 0', //trbl
                        listeners: {
                            keyup: 'trapLoginEnter'
                        }
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                reference: 'btnCancelAuth',
                                bind: {
                                    text: '{localization.btnCancelAuth}'
                                },
                                listeners: {
                                    tap: 'onBtnCancelAuthClick'
                                },
                                ui: 'decline'
                            },
                            {
                                xtype: 'container',
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnForgotPass}'
                                },
                                iconAlign: 'left',
                                iconCls: 'x-i54c i54c-key-22', //FIXME - icon from dict
                                //ui: 'action',
                                margin: '0 0 0 0', //trbl
                                listeners: {
                                    tap: 'onForgotPassBtnClick'
                                }
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        margin: '10 0 5 0',
                        items: [
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnLogin}'
                                },
                                iconAlign: 'right',
                                iconCls: 'x-li li-chevron-right-circle', //FIXME - icon from dict
                                ui: 'confirm',
                                flex: 1,
                                listeners: {
                                    tap: 'onLoginBtnClick'
                                }
                            }
                        ]
                    },
                    {
                        reference: 'createAccountSeparatorBar',
                        padding: '0 0 0 10',
                        layout: 'hbox',
                        items: [
                            { xtype: 'container', flex: 1, cls: 'mh-auth-separator-bar-line'},
                            { xtype: 'label', bind: {html: '{localization.or}'}, cls: 'mh-auth-separator-bar-text'},
                            { xtype: 'container', flex: 1, cls: 'mh-auth-separator-bar-line'}
                        ]
                    },
                    {
                        layout: 'hbox',
                        margin: '5 0 0 0',
                        reference: 'createAccountBar',
                        items: [
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.createAccountBtn}'
                                },
                                iconCls: 'x-li li-user-plus mh-auth-icon-right', //FIXME - icon from dict
                                //ui: 'mh-auth-gray-btn', TODO - new ui
                                flex: 1,
                                listeners: {
                                    tap: 'onBtnCreateAccountClick'
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
