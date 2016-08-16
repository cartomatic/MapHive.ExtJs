//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * auth base localisation - contains localisation keys that are requested by the AuthController
     */
    Ext.define('mh.module.auth.AuthBaseLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
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
                initPassResetConfirmationTitle: {
                    en: 'Pass reset',
                    pl: 'Hasło zresetowane'
                },
                initPassResetConfirmationMsg: {
                    en: 'Your password has been reset. Please check your mailbox for further instructions.',
                    pl: 'Twoje hasło zostało zresetowane. Email z dalszymi instrukcjami powinien dotrzeć niebawem.'
                },
                initPassResetFailureTitle: {
                    en: 'Pass reset failed',
                    pl: 'Błąd'
                },
                initPassResetFailureMsg: {
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
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());