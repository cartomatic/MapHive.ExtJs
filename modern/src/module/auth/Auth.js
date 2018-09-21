//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.Auth', {
        extend: 'mh.module.auth.LockingScreen',

    requires: [
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.field.Text',
        'Ext.layout.Card',
        'Ext.layout.HBox',
        'mh.module.auth.AccountCreator',
        'mh.module.auth.ActivateAccountView',
        'mh.module.auth.AuthController',
        'mh.module.auth.ForgotPassView',
        'mh.module.auth.LoginView',
        'mh.module.auth.ResetPassView'
    ],

    xtype: 'mh-auth-screen',

        controller: 'mh-auth',

        viewModel: true,

        config: {

            /**
             * @cfg AccountCreator UI; should be required if redefined
             */
            accountCreatorUi: 'mh.module.auth.AccountCreator',

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

                //minHeight: 255,
                height: '100%',


                style: {
                    backgroundColor: 'transparent'
                },

                items: [
                    //login view
                    {
                        xtype: 'mh-auth-login',
                        reference: 'loginView'
                    },

                    //pass reset request view
                    {
                        xtype: 'mh-auth-forgot-pass',
                        reference: 'forgotPassView'
                    },

                    //pass reset view
                    {
                        xtype: 'mh-auth-reset-pass',
                        reference: 'resetPassView'
                    },

                    //account activation view
                    {
                        xtype: 'mh-auth-activate-account',
                        reference: 'activateAccountView'
                    }
                ]
            }
        ]
    });

}());