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
                                    html: '{localisation.titleLogin}'
                                }
                            },
                            {
                                xtype: 'emailfield',
                                reference: 'txtEmail',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localisation.emailEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 0 0' //trbl
                            },
                            {
                                xtype: 'passwordfield',
                                reference: 'txtPass',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localisation.passEmptyText}'
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
                                            text: '{localisation.btnForgotPass}'
                                        },
                                        iconAlign: 'left',
                                        iconCls: 'x-fa fa-key',
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
                                            text: '{localisation.btnLogin}'
                                        },
                                        iconAlign: 'right',
                                        iconCls: 'x-fa fa-angle-right',
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
                                    html: '{localisation.titleForgotPass}'
                                }
                            },
                            {
                                xtype: 'emailfield',
                                reference: 'txtForgotPassEmail',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localisation.emailEmptyText}'
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
                                            text: '{localisation.btnResetPassRequest}'
                                        },
                                        iconAlign: 'left',
                                        iconCls: 'x-fa fa-key',
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
                                            text: '{localisation.btnResetPassCancel}'
                                        },
                                        iconAlign: 'right',
                                        iconCls: 'x-fa fa-angle-right',
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
                                    html: '{localisation.titleResetPass}'
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
                                    placeHolder: '{localisation.passNewEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'passwordfield',
                                reference: 'txtPassResetRepeat',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localisation.passRepeatEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localisation.btnResetPass}'
                                },
                                iconAlign: 'right',
                                iconCls: 'x-fa fa-angle-right',
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
                                    html: '{localisation.titleActivateAccount}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtVerificationKey',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localisation.verificationKeyEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtInitialPassword',
                                clearIcon: true,
                                bind: {
                                    placeHolder: '{localisation.passEmptyText}'
                                },
                                cls: 'mh-auth-text-border',
                                margin: '5 0 5 0' //trbl
                            },
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localisation.btnActivateAccount}'
                                },
                                iconAlign: 'right',
                                iconCls: 'x-fa fa-angle-right',
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