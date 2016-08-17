//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.PassChangeLocalisation', {
        requires: [
            'mh.localisation.Localisation',
            'mh.module.auth.AuthBaseLocalisation'
        ],
        statics: {
            inherits: 'mh.module.auth.AuthBaseLocalisation',
            localisation: {
                title: {
                    en: 'Change password',
                    pl: 'Zmiana hasła'
                },
                currentPass: {
                    en: 'Current pass',
                    pl: 'Obecne hasło'
                },
                newPass: {
                    en: 'New pass',
                    pl: 'Nowe hasło'
                },
                repeatPass: {
                    en: 'Repeat pass',
                    pl: 'Powtórz hasło'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                btnChangePass: {
                    en: 'Change pass',
                    pl: 'Zmień hasło'
                },
                changePassMask: {
                    en: 'Changing pass...',
                    pl: 'Zmiana hasła...'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());