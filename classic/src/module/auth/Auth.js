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
        'Ext.layout.container.Card',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'mh.module.auth.AuthController'
    ],

    config: {

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
                        xtype: 'form',
                        header: {
                            bind: {
                                title: '{localisation.titleLogin}'
                            },
                            iconCls: 'x-fa fa-lock',
                            height: 45
                        },

                        reference: 'loginView',
                        layout: 'form',

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
                                dock: 'bottom',
                                items: [
                                    {
                                        xtype: 'button',
                                        reference: 'btnForgotPass',
                                        bind: {
                                            text: '{localisation.btnForgotPass}'
                                        },
                                        listeners: {
                                            click: 'onForgotPassBtnClick'
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localisation.btnLogin}'
                                        },
                                        reference: 'btnLogin',
                                        listeners: {
                                            click: 'onLoginBtnClick'
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
                                title: '{localisation.titleForgotPass}'
                            },
                            iconCls: 'x-fa fa-exclamation-triangle',
                            height: 45
                        },
                        layout: 'form',
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
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{localisation.btnResetPassCancel}'
                                        },
                                        reference: 'btnResetPassCancel',
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
                            iconCls: 'x-fa fa-key',
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
                            iconCls: 'x-fa fa-refresh',
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