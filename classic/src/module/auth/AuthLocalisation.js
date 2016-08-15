//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.AuthLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
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
                },
                authMask: {
                    en: 'Authenticating...',
                    pl: 'Autoryzacja...'
                },
                authResetPass: {
                    en: 'Resetting pass...',
                    pl: 'Resetowanie hasła...'
                },
                authFailureTitle: {
                    en: 'Authentication failed',
                    pl: 'Błąd autentykacji'
                },
                authFailureMsg: {
                    en: 'Either email or password is not valid.',
                    pl: 'Niepoprawny email lub hasło.'
                },
                resetPassFailureTitle: {
                    en: 'Pass reset failed',
                    pl: 'Błąd'
                },
                resetPassFailureMsg: {
                    en: 'Pass reset procedure failed.<br/>Please try again or contact the system administrator.',
                    pl: 'Zresetowanie hasła nie powiodło się.<br/>Spróbuj ponownie lub skontaktuj się z administratorem systemu.'
                },
                resetPassConfirmationTitle: {
                    en: 'Pass reset',
                    pl: 'Hasło zresetowane'
                },
                resetPassConfirmationMsg: {
                    en: 'Your password has been reset. Please check your mailbox for further instructions.',
                    pl: 'Twoje hasło zostało zresetowane. Email z dalszymi instrukcjami powinien dotrzeć niebawem.'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());