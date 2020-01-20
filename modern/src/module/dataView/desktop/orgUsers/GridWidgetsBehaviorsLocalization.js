//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviorsLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                externalUser: {
                    en: 'Global user',
                    pl: 'Użytkownik globalny'
                },
                orgUser: {
                    en: 'Local user',
                    pl: 'Użytkownik lokalny'
                },
                passForceSetTip: {
                    en: 'Change user password',
                    pl: 'Zmień hasło użytkownika'
                },
                passForceSetTitle: {
                    en: 'Change user pass',
                    pl: 'Zmień hasło użytkownika'
                },
                passForceSetMsg: {
                    en: 'This operation will force change user password to an arbitrary one. Continue?',
                    pl: 'Ta operacja zmieni hasło użytkownika na wskazane. Kontynuować?'
                },
                passForceSetLoadmask: {
                    en: 'Setting user password...',
                    pl: 'Ustawianie hasła użytkownika...'
                },
                newPassEmptyTitle: {
                    en: 'New password empty',
                    pl: 'Hasło puste'
                },
                newPassEmptyMsg: {
                    en: 'New password cannot be empty',
                    pl: 'Nowe hasło nie może być puste'
                },
                passForceChangedTitle: {
                    en: 'Password changed',
                    pl: 'Hasło zmienione'
                },
                passForceChangedMsg: {
                    en: 'User password has been changed',
                    pl: 'Hasło użytkownika zostało zmienione'
                },
                accountVerifiedTip: {
                    en: 'Account is verified',
                    pl: 'Konto zweryfikowane'
                },
                accountNotVerifiedTip: {
                    en: 'Account has not yet been verified. Click to activate it or re-send an activation email.',
                    pl: 'Konto nie zostało jeszcze zweryfikowane. Kliknij, żeby aktywować lub wysłać ponownie email aktywacyjny.'
                },
                resendActivationTitle: {
                    en: 'Account activation',
                    pl: 'Aktywacja konta'
                },
                resendActivationMsg: {
                    en: 'This account seems to not have been verified yet. You can either re-send an activation email or force activate it.',
                    pl: 'To konto zdaje się być niezweryfikowane. Możesz wysłać ponownie email aktywacyjny lub aktywować je manualnie.'
                },
                forceActivateBtn:{
                    en: 'Force activate',
                    pl: 'Aktywuj'
                },
                resendEmailBtn: {
                    en: 'Resend email',
                    pl: 'Wyślij email'
                },
                cancelBtn: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                resendingActivationEmailLoadMask: {
                    en: 'Resending activation email...',
                    pl: 'Wysyłanie emaila aktywacyjnego...'
                },
                forceAccountActivateLoadMask: {
                    en: 'Activating account...',
                    pl: 'Aktywacja konta...'
                },
                accountActiveTitle: {
                    en: 'Account verified',
                    pl: 'Konto zweryfikowane'
                },
                accountActiveMsg: {
                    en: 'This account has been verified by a user',
                    pl: 'To konto zostało zweryfikowane przez użytkownika'
                },
                accountActiveTip: {
                    en: 'Account is active',
                    pl: 'Konto aktywne'
                },
                accountClosedTip: {
                    en: 'Account closed',
                    pl: 'Konto zamknięte'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());