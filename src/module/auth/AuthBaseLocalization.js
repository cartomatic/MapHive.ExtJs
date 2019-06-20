//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * auth base localization - contains localization keys that are requested by the AuthController
     */
    Ext.define('mh.module.auth.AuthBaseLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                authMask: {
                    en: 'Authenticating...',
                    pl: 'Autoryzacja...'
                },
                authFailureTitle: {
                    en: 'Authentication failed',
                    pl: 'Błąd autentykacji'
                },
                authFailureMsg: {
                    en: 'Either email or password is not valid.',
                    pl: 'Niepoprawny email lub hasło.'
                },
                initPassResetMask: {
                    en: 'Resetting pass...',
                    pl: 'Resetowanie hasła...'
                },
                passResetRequestConfirmationTitle: {
                    en: 'Pass reset',
                    pl: 'Hasło zresetowane'
                },
                passResetRequestConfirmationMsg: {
                    en: 'Your password has been reset. Please check your mailbox for further instructions.',
                    pl: 'Twoje hasło zostało zresetowane. Email z dalszymi instrukcjami powinien dotrzeć niebawem.'
                },
                passResetRequestFailureTitle: {
                    en: 'Pass reset failed',
                    pl: 'Błąd'
                },
                passResetRequestFailureMsg: {
                    en: 'Pass reset procedure failed.<br/>Please try again or contact the system administrator.',
                    pl: 'Zresetowanie hasła nie powiodło się.<br/>Spróbuj ponownie lub skontaktuj się z administratorem systemu.'
                },
                activateAccountMask: {
                    en: 'Activating account...',
                    pl: 'Aktywacja konta...'
                },
                activateAccountConfirmationTitle: {
                    en: 'Account activated',
                    pl: 'Konto aktywowane'
                },
                activateAccountConfirmationMsg: {
                    en: 'Your account has been successfuly activated.',
                    pl: 'Twoje konto zostało aktywowane.'
                },
                activateAccountFailureTitle: {
                    en: 'Account activation failed',
                    pl: 'Błąd aktywacji konta'
                },
                activateAccountFailureMsg: {
                    en: 'Account activation procedure failed<br/>Please try again or contact the system administrator.',
                    pl: 'Aktywacja konta nie powiodła.<br/>Spróbuj ponownie lub skontaktuj się z administratorem systemu.'
                },
                activateAccountVerificationKeyStaleTitle: {
                    en: 'Account activation failed',
                    pl: 'Błąd aktywacji konta'
                },
                activateAccountVerificationKeyStaleMsg: {
                    en: 'Account activation procedure failed due to the verification key having expired.<br/>An email with further instructions has been sent to you. Please follow the supplied instructions.',
                    pl: 'Aktywacja konta nie powiodła ponieważ klucz weryfikacyjny wygasł.<br/>Email z dalszymi instrukcjami powinien dotrzeć niebawem.'
                },
                passResetMask: {
                    en: 'Resetting pass...',
                    pl: 'Resetowanie hasła...'
                },
                passResetConfirmationTitle: {
                    en: 'Pass reset',
                    pl: 'Hasło zresetowane'
                },
                passResetConfirmationMsg: {
                    en: 'Your password has been reset.',
                    pl: 'Twoje hasło zostało zresetowane.'
                },
                passResetFailureTitle: {
                    en: 'Pass reset failed',
                    pl: 'Błąd'
                },
                passResetFailureMsg: {
                    en: 'Pass reset procedure failed.<br/>Please try again or contact the system administrator.',
                    pl: 'Zresetowanie hasła nie powiodło się.<br/>Spróbuj ponownie lub skontaktuj się z administratorem systemu.'
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
                passResetFailureTitle_too_short: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                passResetFailureMsg_too_short: {
                    en: 'Password is too short. Minimum password length is 6.', //TODO - make it serverside configurable!
                    pl: 'Hasło jest zbyt krótkie. Minimalna długość hasła to 6.'
                },
                passResetFailureTitle_not_complex_enough: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                passResetFailureMsg_not_complex_enough: {
                    en: 'Password is not complex enough. It must match at least 3 of the following criteria: <ul><li>contain a lower case character</li><li>contain a upper case character</li><li>contain a digit</li><li>contain a non alpha numeric character</li></ul>',
                    pl: 'Hasło nie jest wystarczająco skomplikowane. Hasło musi spełnić co najmniej 3 z podanych wymagań: <ul><li>zawiera małą literę</li><li>zawiera wielką literę</li><li>zawiera cyfrę</li><li>zawiera znak nie alfanmeryczny</li></ul>'
                },
                passResetFailureTitle_invalid_old_pass: {
                    en: 'Invalid password',
                    pl: 'Nieprawidłowe hasło'
                },
                passResetFailureMsg_invalid_old_pass: {
                    en: 'Your old password does not seem to be valid.',
                    pl: 'Obecne hasło jest nieprawidłowe.'
                },
                passResetFailureTitle_new_pass_same_as_old_pass: {
                    en: 'Passwords the same',
                    pl: 'Błąd'
                },
                passResetFailureMsg_new_pass_same_as_old_pass: {
                    en: 'Your new password cannot be the same as the old one.',
                    pl: 'Nowe hasło nie może być takie samo jak obecne.'
                },
                passChangeConfirmationTitle: {
                    en: 'Password changed',
                    pl: 'Hasło zmienione'
                },
                passChangeConfirmationMsg: {
                    en: 'Your password has been changed',
                    pl: 'Twoje hasło zostało zmienione'
                },
                passChangeFailureTitle: {
                    en: 'Pass change failed',
                    pl: 'Błąd'
                },
                passChangeFailureMsg: {
                    en: 'Pass change procedure failed.<br/>Please try again or contact the system administrator.',
                    pl: 'Zmiana hasła nie powiodła się.<br/>Spróbuj ponownie lub skontaktuj się z administratorem systemu.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());