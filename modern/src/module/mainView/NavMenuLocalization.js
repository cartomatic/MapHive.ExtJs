//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainView.NavMenuLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                logOff: {
                    en: 'Log off',
                    pl: 'Wyloguj'
                },
                profile: {
                    en: 'Profile',
                    pl: 'Profil'
                },
                logOffConfirmTitle: {
                    en: 'Log off',
                    pl: 'Wylogowywanie'
                },
                logOffConfirmMsg: {
                    en: 'Are you sure you want to log off?',
                    pl: 'Czy na pewno chcesz się wylogować?'
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