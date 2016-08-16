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
                },
                resetPassFailureTitle_empty: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                resetPassFailureMsg_empty: {
                    en: 'Password cannot be empty.',
                    pl: 'Hasło nie może być puste'
                },
                resetPassFailureTitle_mismatch: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                resetPassFailureMsg_mismatch: {
                    en: 'Passwords must be the same.',
                    pl: 'Hasła muszą być jednakowe'
                },
                resetPassFailureTitle_too_short: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                passResetFailureMsg_too_short: {
                    en: 'Password is too short. Minimum password length is 6.', //TODO - make it serverside configurable!
                    pl: 'Hasło jest zbyt krótkie. Minimalna długość hasła to 6.'
                },
                resetPassFailureTitle_not_complex_enough: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                passResetFailureMsg_not_complex_enough: {
                    en: 'Password is not complex enough. It must match at least 3 of the following criteria: <ul><li>contain a lower case character</li><li>contain a upper case character</li><li>contain a digit</li><li>contain a non alpha numeric character</li></ul>',
                    pl: 'Hasło nie jest wystarczająco skomplikowane. Hasło musi spełnić co najmniej 3 z podanych wymagań: <ul><li>zawiera małą literę</li><li>zawiera wielką literę</li><li>zawiera cyfrę</li><li>zawiera znak nie alfanmeryczny</li></ul>'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());