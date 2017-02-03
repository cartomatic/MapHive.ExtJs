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
                tooltipAnonymous: {
                    en: 'Anonymous user',
                    pl: 'Uzytkownik anonimowy'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());