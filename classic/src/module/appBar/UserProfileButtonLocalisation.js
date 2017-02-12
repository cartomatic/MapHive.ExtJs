//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.appBar.UserProfileButtonLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                btnLogOn: {
                    en: 'Log on',
                    pl: 'Zaloguj'
                },
                btnLogOff: {
                    en: 'Log off',
                    pl: 'Wyloguj'
                },
                anonymous: {
                    en: 'Anonymous user',
                    pl: 'Uzytkownik anonimowy'
                },
                logOffNoReload: {
                    en: 'Are you sure you want to log off?',
                    pl: 'Czy na pewno chcesz się wylogować?'
                },
                logOffWithReload: {
                    en: 'Active application requires auth. Logging off will load the default application instead.<br/>Are you sure you want to log off?',
                    pl: 'Aktywna aplikacja wymaga zalogowania. Wylogowanie spowoduje zmianę aplikacji, na aplikację domyślną.<br/>Czy na pewno chcesz się wylogować?'
                },
                logOffTitle: {
                    en: 'Log off',
                    pl: 'Wylogowanie'
                },
                logOffMask: {
                    en: 'Logging off...',
                    pl: 'Wylogowuję...'
                },
                btnChangePass: {
                    en: 'Change pass',
                    pl: 'Zmień hasło'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());