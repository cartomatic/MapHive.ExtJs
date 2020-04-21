//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.settings.UserSettingsLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                viewName:
                {
                    en: 'Settings',
                    pl: 'Ustawienia'
                },
                uiLang: {
                    en: 'UI lang',
                    pl: 'Język interfejsu'
                },
                uiMode: {
                    en: 'Enable UI dark mode',
                    pl: 'Włącz tryb ciemny interfejsu użytkownika'
                },
                mapMode: {
                    en: 'Enable map dark mode',
                    pl: 'Włącz tryb ciemny dla mapy'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
