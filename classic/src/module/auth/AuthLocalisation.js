//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.AuthLocalisation', {
        requires: [
            'mh.localisation.Localisation',
            'mh.module.auth.AuthBaseLocalisation'
        ],
        statics: {
            inherits: 'mh.module.auth.AuthBaseLocalisation',
            localisation: {
                titleLogin: {
                    en: 'Login',
                    pl: 'Logowanie'
                },
                titleForgotPass: {
                    en: 'Pass reset',
                    pl: 'Resetowanie hasła'
                },
                titleActivateAccount: {
                    en: 'Activate account',
                    pl: 'Aktywacja konta'
                },
                titleResetPass: {
                    en: 'Reset pass',
                    pl: 'Resetuj hasło'
                },
                btnLogin: {
                    en: 'Login',
                    pl: 'Zaloguj'
                },
                btnForgotPass: {
                    en: 'Forgot pass?',
                    pl: 'Zapomniałeś hasła?'
                },
                loginFormTitle: {
                    en: 'Login',
                    pl: 'Logowanie'
                },
                resetPassFormTitle:{
                    en: 'Reset pass',
                    pl: 'Resetowanie hasła'
                },
                emailEmptyText: {
                    en: 'Email',
                    pl: 'Email'
                },
                passEmptyText: {
                    en: 'Password',
                    pl: 'Hasło'
                },
                passNewEmptyText: {
                    en: 'New password',
                    pl: 'Nowe hasło'
                },
                passRepeatEmptyText: {
                    en: 'Repeat password',
                    pl: 'Powtórz hasło'
                },
                verificationKeyEmptyText: {
                    en: 'Verification key',
                    pl: 'Klucz weryfikacyjny'
                },
                btnResetPassRequest: {
                    en: 'Reset pass',
                    pl: 'Resetuj hasło'
                },
                btnResetPassCancel: {
                    en: 'Back to login',
                    pl: 'Logowanie'
                },
                btnActivateAccount: {
                    en: 'Activate account',
                    pl: 'Aktywuj konto'
                },
                btnResetPass: {
                    en: 'Reset pass',
                    pl: 'Resetuj hasło'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());