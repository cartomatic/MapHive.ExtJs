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

        xtype: 'mh-auth-screen',

        controller: 'mh-auth',

        viewModel: true,

        config: {

            /**
             * @cfg AccountCreator UI; should be required if redefined
             */
            accountCreatorUi: 'Ext.Panel', //'mh.module.auth.AccountCreator',

            /**
             * if true, the account creation entry point will be hidden
             */
            disableAccountCreation: false
        },

        // layout: {
        //     type: 'vbox',
        //     align: 'center',
        //     pack: 'center'
        // },

        layout: 'center',

        items: [
            {
                xtype: 'container',
                reference: 'cardLayout',
                layout: 'card',
                width: '90%',
                maxWidth: 400,
                minHeight: 255,
                //minHeight: 270,
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
                                clearable: true,
                                bind: {
                                    placeholder: '{localization.emailEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 0 0' //trbl
                            },
                            {
                                xtype: 'passwordfield',
                                reference: 'txtPass',
                                clearable: true,
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
                                        ui: 'action',
                                        margin: '0 0 0 0', //trbl
                                        listeners: {
                                            tap: 'onForgotPassBtnClick'
                                        }
                                    }
                                ]
                            },
                            {
                                layout: 'hbox',
                                margin: '10 0 0 0',
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
                                margin: '10 0 0 0',
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
                                clearable: true,
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
                                clearable: true,
                                bind: {
                                    placeholder: '{localization.verificationKeyEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtInitialPassword',
                                clearable: true,
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