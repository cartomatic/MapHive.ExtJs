//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.navMenu.NavMenuLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                logOff: {
                    en: 'Log off',
                    pl: 'Wyloguj'
                },
                logIn: {
                    en: 'Log in',
                    pl: 'Zaloguj'
                },
                profile: {
                    en: 'Profile',
                    pl: 'Profil'
                },
                anonymous: {
                    en: 'Anonymous user',
                    pl: 'Uzytkownik anonimowy'
                },
                logOffConfirmMsgNoReload: {
                    en: 'Are you sure you want to log off?',
                    pl: 'Czy na pewno chcesz się wylogować?'
                },
                logOffConfirmMsgWithReload: {
                    en: 'Active application requires auth. Logging off will load the default application instead.<br/>Are you sure you want to log off?',
                    pl: 'Aktywna aplikacja wymaga zalogowania. Wylogowanie spowoduje zmianę aplikacji, na aplikację domyślną.<br/>Czy na pewno chcesz się wylogować?'
                },
                logOffConfirmTitle: {
                    en: 'Log off',
                    pl: 'Wylogowanie'
                },
                logOffMask: {
                    en: 'Logging off...',
                    pl: 'Wylogowuję...'
                },
                yes: {
                    en: 'Yes',
                    pl: 'Tak'
                },
                no: {
                    en: 'No',
                    pl: 'Nie'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
    
}());