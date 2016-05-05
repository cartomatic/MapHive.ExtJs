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

        requires: [
            'Ext.layout.container.VBox',
            'mh.module.auth.LockingScreen',
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
             * @cfg {string} [forgotPassView|setUI]
             * see mh.mixin.CustomConfig.applyCustomViewConfig for details
             */
            'forgotPassView|setUI': null
        },

        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },

        items: [
            {
                xtype: 'container',
                width: 300,

                layout: 'card',

                reference: 'cardLayout',

                items: [
                    {
                        xtype: 'form',
                        title: 'Login',
                        reference: 'loginView',
                        layout: 'form',
                        iconCls: 'x-fa fa-lock',
                        items: [
                            {
                                xtype: 'textfield',
                                height: 30,
                                hideLabel: true,
                                hideEmptyLabel: true,
                                emptyText: 'Email',
                                enableKeyEvents: true,
                                listeners: {
                                    keydown: 'trapLoginEnter'
                                }
                            },
                            {
                                xtype: 'textfield',
                                height: 30,
                                hideLabel: true,
                                hideEmptyLabel: true,
                                emptyText: 'Password',
                                inputType: 'password',
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
                                        text:  'Forgot pass?',
                                        listeners: {
                                            click: 'onForgotPassBtnClick'
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        text: 'Login',
                                        reference: 'btnLogin'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'Forgot pass?',
                        reference: 'forgotPassView',
                        items: [
                            {
                                xtype: 'textfield'
                            }
                        ]
                    }
                ]
            }
        ]
    });
}());