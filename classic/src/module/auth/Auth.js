(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Lock screen used to lock the UI from user interaction; adds item to centered vbox layout
     */
    Ext.define('mh.module.auth.Auth', {
        extend: 'mh.module.auth.LockingScreen',

        xtype: 'mh.auth-screen',

        controller: 'mh-auth',

        viewModel: true,

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Card',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.TextItem',
        'mh.module.auth.AuthController',
        'mh.module.auth.AccountCreator'
    ],

    config: {

            /**
             * @cfg AccountCreator UI; should be required if redefined
             */
            accountCreatorUi: 'mh.module.auth.AccountCreator',

            /**
             * if true, the account creation entry point will be hidden
             */
            disableAccountCreation: false,

            //some configurable styles
            //----------------------------

            /**
             * @cfg {string} [loginView|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'loginView|setUI': null,

            /**
             * @cfg {string} [btnForgotPass|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnForgotPass|setUI': null,

            /**
             * @cfg {string} [btnForgotPass|setScale]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnForgotPass|setScale': null,

            /**
             * @cfg {string} [btnForgotPass|setIconCls]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnForgotPass|setIconCls': null,

            /**
             * @cfg {string} [btnLogin|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnLogin|setUI': null,

            /**
             * @cfg {string} [btnLogin|setScale]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnLogin|setScale': null,

            /**
             * @cfg {string} [btnLogin|setIconCls]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnLogin|setIconCls': null,

            /**
             * @cfg {string} [forgotPassView|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'forgotPassView|setUI': null,

            /**
             * @cfg {string} [btnResetPass|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnResetPass|setUI': null,

            /**
             * @cfg {string} [btnResetPass|setScale]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnResetPass|setScale': null,

            /**
             * @cfg {string} [btnResetPass|setIconCls]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnResetPass|setIconCls': null,

            /**
             * @cfg {string} [btnResetPassCancel|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnResetPassCancel|setUI': null,

            /**
             * @cfg {string} [btnResetPassCancel|setScale]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnResetPassCancel|setScale': null,

            /**
             * @cfg {string} [btnResetPassCancel|setIconCls]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'btnResetPassCancel|setIconCls': null
        },

        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },

        items: [
            {
                xtype: 'panel',
                border: true,
                width: 400,

                layout: 'card',

                reference: 'cardLayout',

                items: [
                    {
                        xtype: 'panel',
                        header: {
                            bind: {
                                title: '{localisation.titleLogin}'
                            },
                            iconCls: 'x-i54c i54c-lock-1',
                            height: 45
                        },

                        reference: 'loginView',

                        bodyPadding: '10 10 0 10',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtEmail',
                                height: 35,
                                bind: {
                                    emptyText: '{localisation.emailEmptyText}'
                                },
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtPass',
                                height: 35,
                                inputType: 'password',
                                bind: {
                                    emptyText: '{localisation.passEmptyText}'
                                },
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            }
                        ],
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                reference: 'createAccountBar',
                                dock: 'bottom',
                                items: [
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localisation.createAccountBtn}'
                                        },
                                        iconCls: 'x-li li-user-plus mh-auth-icon-right',
                                        ui: 'mh-auth-gray-btn',
                                        flex: 1,
                                        listeners: {
                                            click: 'onBtnCreateAccountClick'
                                        }
                                    }
                                ]
                            },
                            //separator bar
                            {
                                xtype: 'toolbar',
                                reference: 'createAccountSeparatorBar',
                                dock: 'bottom',
                                padding: '0 0 0 10',
                                items: [
                                    { xtype: 'container', flex: 1, cls: 'mh-auth-separator-bar-line'},
                                    { xtype: 'tbtext', bind: {text: '{localisation.or}'}, cls: 'mh-auth-separator-bar-text'},
                                    { xtype: 'container', flex: 1, cls: 'mh-auth-separator-bar-line'}
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localisation.btnLogin}'
                                        },
                                        reference: 'btnLogin',
                                        //iconCls: 'x-i54c i54c-enter-1 mh-auth-icon-right',
                                        iconCls: 'x-li li-chevron-right-circle  mh-auth-icon-right',
                                        listeners: {
                                            click: 'onLoginBtnClick'
                                        },
                                        flex: 1,
                                        iconAlign: 'right',
                                        ui: 'mh-auth-green-btn',
                                    }
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                padding: '0 0 0 10',
                                items: [
                                    '->',
                                    {
                                        xtype: 'button',
                                        reference: 'btnForgotPass',
                                        bind: {
                                            text: '{localisation.btnForgotPass}'
                                        },
                                        listeners: {
                                            click: 'onForgotPassBtnClick'
                                        },
                                        padding: '0 0 0 0',
                                        ui: 'mh-auth-forgot-pass-button'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        header: {
                            bind: {
                                title: '{localisation.titleForgotPass}'
                            },
                            iconCls: 'x-i54c i54c-pin-code',
                            height: 45
                        },
                        bodyPadding: '10 10 0 10',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        reference: 'forgotPassView',
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtForgotPassEmail',
                                height: 35,
                                bind: {
                                    emptyText: '{localisation.emailEmptyText}'
                                },
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            }
                        ],
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [
                                    {
                                        xtype: 'button',
                                        reference: 'btnResetPassRequest',
                                        bind: {
                                            text:  '{localisation.btnResetPassRequest}'
                                        },
                                        listeners: {
                                            click: 'onPassResetRequestBtnClick'
                                        },
                                        iconCls: 'x-i54c i54c-pin-code'
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localisation.btnResetPassCancel}'
                                        },
                                        reference: 'btnResetPassCancel',
                                        iconCls: 'x-li li-chevron-left-circle',
                                        listeners: {
                                            click: 'onResetPassCancelBtnClick'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        header: {
                            bind: {
                                title: '{localisation.titleActivateAccount}'
                            },
                            iconCls: 'x-i54c i54c-key-22',
                            height: 45
                        },
                        reference: 'activateAccountView',
                        bodyPadding: 10,
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtVerificationKey',
                                height: 35,
                                inputType: 'password',
                                bind: {
                                    emptyText: '{localisation.verificationKeyEmptyText}',
                                    fieldLabel: '{localisation.verificationKeyEmptyText}'
                                },
                                labelAlign: 'top',
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtInitialPassword',
                                height: 35,
                                inputType: 'password',
                                labelAlign: 'top',
                                bind: {
                                    emptyText: '{localisation.passEmptyText}',
                                    fieldLabel: '{localisation.passEmptyText}'
                                },
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            }
                        ],
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [
                                    '->',
                                    {
                                        xtype: 'button',
                                        iconCls: 'x-i54c i54c-key-22',
                                        bind: {
                                            text: '{localisation.btnActivateAccount}'
                                        },
                                        reference: 'btnActivateAccount',
                                        listeners: {
                                            click: 'onActivateAccountBtnClick'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        header: {
                            bind: {
                                title: '{localisation.titleResetPass}'
                            },
                            iconCls: 'x-li li-refresh',
                            height: 45
                        },
                        bodyPadding: 10,
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        reference: 'resetPassView',
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtPassResetVerificationKey',
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtPassReset',
                                height: 35,
                                inputType: 'password',
                                labelAlign: 'top',
                                bind: {
                                    emptyText: '{localisation.passNewEmptyText}',
                                    fieldLabel: '{localisation.passNewEmptyText}'
                                },
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                reference: 'txtPassResetRepeat',
                                height: 35,
                                inputType: 'password',
                                labelAlign: 'top',
                                bind: {
                                    emptyText: '{localisation.passRepeatEmptyText}',
                                    fieldLabel: '{localisation.passRepeatEmptyText}'
                                },
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            }
                        ],
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [
                                    '->',
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localisation.btnResetPass}'
                                        },
                                        iconCls: 'x-li li-refresh',
                                        reference: 'btnResetPass',
                                        listeners: {
                                            click: 'onResetPassBtnClick'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
}());