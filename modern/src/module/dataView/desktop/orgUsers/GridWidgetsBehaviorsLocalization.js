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
                accountVerifiedTip: {
                    en: 'Account is verified',
                    pl: 'Konto zweryfikowane'
                },
                accountNotVerifiedTip: {
                    en: 'Account has not yet been verified. Click to re-send an activation email.',
                    pl: 'Konto nie zostało jeszcze zweryfikowane. Kliknij, żeby wysłać ponownie email aktywacyjny.'
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
                    en: 'Activate',
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