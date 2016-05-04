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
             * @cfg {string} [loginViewUi]
             */
            loginViewUi: null,

            /**
             * @cfg {string} [forgotPassVieUi]
             */
            forgotPassVieUi: null,

            /**
             * @cfg {string} [loginBtnUi]
             */
            loginBtnUi: null,

            /**
             * @cfg {string} [loginBtnScale]
             */
            loginBtnScale: null,

            /**
             * @cfg {string} [forgotPassBtnUi]
             */
            forgotPassBtnUi: null,

            /**
             * @cfg {string} [forgotPassBtnScale]
             */
            forgotPassBtnScale: null
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
                                        text:  'Forgot pass?',
                                        listeners: {
                                            click: 'onForgotPassBtnClick'
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        text: 'Login'
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