//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.userProfile.UserProfileLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                forename: {
                    en: 'Forename',
                    pl: 'Imię'
                },
                surname: {
                    en: 'Surname',
                    pl: 'Nazwisko'
                },
                email: {
                    en: 'Email',
                    pl: 'Email'
                },
                slug: {
                    en: 'Slug',
                    pl: 'Slug'
                },
                changePass: {
                    en: 'Change password',
                    pl: 'Zmień hasło'
                },
                uiLang: {
                    en: 'UI lang',
                    pl: 'Język interfejsu'
                },
                saveChanges: {
                    en: 'Save changes',
                    pl: 'Zapisz zmiany'
                },
                profileSaveLoadMask: {
                    en: 'aving profile...',
                    pl: 'Zapisywanie profilu...'
                },
                profileSaveFailure: {
                    en: 'Failed to save user profile',
                    pl: 'Zapisanie profilu nie powiodło się'
                },
                profileLoadMask: {
                    en: 'Loading user profile...',
                    pl: 'Ładowanie profilu użytkownika'
                },
                profileLoadFailure: {
                    en: 'Failed to load user profile.',
                    pl: 'Załadowanie profilu użytkownika nie powiodło się.'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
