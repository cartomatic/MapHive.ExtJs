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
                    en: 'Back',
                    pl: 'Wstecz'
                },
                btnActivateAccount: {
                    en: 'Activate account',
                    pl: 'Aktywuj konto'
                },
                btnResetPass: {
                    en: 'Reset pass',
                    pl: 'Resetuj hasło'
                },
                or: {
                    en: 'OR',
                    pl: 'LUB'
                },
                createAccountBtn: {
                    en: 'Create account',
                    pl: 'Załóż konto'
                },
                btnCancelAuth: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                cancelAuthWithReloadTitle: {
                    en: 'Cancel auth',
                    pl: 'Rezygnacja z logowania'
                },
                cancelAuthWithReloadMsg: {
                    en: 'Active application requires auth. Dismissing authentication prompt will load the default application instead.<br/>Are you sure you want to proceed?',
                    pl: 'Aktywna aplikacja wymaga zalogowania. Rezygnacja z logowania spowoduje zmianę aplikacji, na aplikację domyślną.<br/>Czy na pewno chcesz kontynuować?'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());