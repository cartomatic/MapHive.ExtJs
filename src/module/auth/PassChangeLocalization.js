//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.PassChangeLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.auth.AuthBaseLocalization'
        ],
        statics: {
            inherits: 'mh.module.auth.AuthBaseLocalization',
            localization: {
                title: {
                    en: 'Change password',
                    pl: 'Zmiana hasła'
                },
                oldPass: {
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
        mh.localization.Localization.registerTranslations(this);
    });

}());