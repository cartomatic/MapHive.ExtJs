//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.ApplicationLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                getClientCfgLoadMask: {
                    en: 'Configuring...',
                    pl: 'Konfiguracja...'
                },
                userCfgFailureTitle: {
                    en: 'Configuration failed',
                    pl: 'Konfiguracja nie powiodła się'
                },
                userCfgFailureMsg: {
                    en: 'Failed to obtain configuration details. Please try again.',
                    pl: 'Konfiguracja nie powiodła się. Spróbuj ponownie.'
                },
                noAppAccessForUserTitle: {
                    en: 'No access',
                    pl: 'Brak dostępu'
                },
                noAppAccessForUserMsg: {
                    en: 'You are not allowed to access this application. You will be redirected to your Dashboard.',
                    pl: 'Nie masz uprawnień do uruchomienia tej aplikacji. Zostanie uruchomiony Twój panel kontrolny.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());