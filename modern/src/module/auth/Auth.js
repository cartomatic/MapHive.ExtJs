//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.Auth', {
        extend: 'mh.module.auth.LockingScreen',
    
        requires: [
            'mh.module.auth.AuthController',
            'Ext.field.Email',
            'Ext.field.Password'
        ],

        xtype: 'mh.auth-screen',

        controller: 'mh-auth',

        viewModel: true,

        config: {

            /**
             * @cfg AccountCreator UI; should be required if redefined
             */
            accountCreatorUi: null, //'mh.module.auth.AccountCreator',

            /**
             * if true, the account creation entry point will be hidden
             */
            disableAccountCreation: true
        },

        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },

        items: [
            {
                xtype: 'container',
                reference: 'cardLayout',
                layout: 'card',
                width: '90%',
                height: 400,
                items: [
                    //login view
                    {
                        reference: 'loginView',
                        xtype: 'panel',
                        padding: 10,
                        height: 210,
                        items: [
                            {
                                margin: '10 0 10 0', //trbl
                                bind: {
                                    html: '{localization.titleLogin}'
                                }
                            },
                            {
                                xtype: 'emailfield',
                                reference: 'txtEmail',
                                clearIcon: true,
                                bind: {
                                    placeholder: '{localization.emailEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 0 0' //trbl
                            },
                            {
                                xtype: 'passwordfield',
                                reference: 'txtPass',
                                clearIcon: true,
                                bind: {
                                    placeholder: '{localization.passEmptyText}'
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
                                            text: '{localization.btnForgotPass}'
                                        },
                                        iconAlign: 'left',
                                        iconCls: 'x-i54c i54c-key-22',
                                        ui: 'action',
                                        margin: '0 0 0 0', //trbl
                                        listeners: {
                                            tap: 'onForgotPassBtnClick'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localization.btnLogin}'
                                        },
                                        iconAlign: 'right',
                                        iconCls: 'x-li li-chevron-right-circle',
                                        ui: 'confirm',
                                        listeners: {
                                            tap: 'onLoginBtnClick'
                                        }
                                    }
                                ]
                            }
                        ]
                    },

                    //pass reset request view
                    {
                        reference: 'forgotPassView',
                        xtype: 'panel',
                        padding: 10,
                        height: 155,
                        items: [
                            {
                                margin: '10 0 10 0', //trbl
                                bind: {
                                    html: '{localization.titleForgotPass}'
                                }
                            },
                            {
                                xtype: 'emailfield',
                                reference: 'txtForgotPassEmail',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localization.emailEmptyText}'
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

                    //pass reset view
                    {
                        reference: 'resetPassView',
                        xtype: 'panel',
                        padding: 10,
                        height: 210,
                        items: [
                            {
                                margin: '10 0 10 0', //trbl
                                bind: {
                                    html: '{localization.titleResetPass}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtPassResetVerificationKey',
                                hidden: true
                            },
                            {
                                xtype: 'passwordfield',
                                reference: 'txtPassReset',
                                clearIcon: true,
                                bind: {
                                    placeholder: '{localization.passNewEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'passwordfield',
                                reference: 'txtPassResetRepeat',
                                clearIcon: true,
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

                    //account activation view
                    {
                        reference: 'activateAccountView',
                        xtype: 'panel',
                        padding: 10,
                        height: 210,
                        items: [
                            {
                                margin: '10 0 10 0', //trbl
                                bind: {
                                    html: '{localization.titleActivateAccount}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtVerificationKey',
                                clearIcon: true,
                                bind: {
                                    placeholder: '{localization.verificationKeyEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtInitialPassword',
                                clearIcon: true,
                                bind: {
                                    placeholder: '{localization.passEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnActivateAccount}'
                                },
                                iconAlign: 'right',
                                iconCls: 'x-li li-chevron-right-circle',
                                ui: 'confirm',
                                listeners: {
                                    tap: 'onActivateAccountBtnClick'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });

}());