//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.ApplicationLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
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
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());