//Disable some of the JSLint warnings
/*global window,console,Ext*/
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