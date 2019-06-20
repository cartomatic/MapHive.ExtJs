//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.users.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.users.DataViewLocalization',
            localization: {
                viewName: {
                    en: 'Organization users',
                    pl: 'Użytkownicy'
                },
                btnCreate: {
                    en: 'Add user',
                    pl: 'Dodaj użytkownika'
                },
                btnAddNewOrgUser: {
                    en: 'Add new user',
                    pl: 'Dodaj nowego użytkownika'
                },
                btnAddUserFromCatalogue: {
                    en: 'Search for user',
                    pl: 'Wyszukaj użytkownika'
                },
                addUserMask: {
                    en: 'Adding a user...',
                    pl: 'Dodawanie użytkownika...'
                },
                addUserFailure: {
                    en: 'Failed to add a user.',
                    pl: 'Dodanie użytkownika nie powiodło się.'
                },
                linkUserMask: {
                    en: 'Linking a user...',
                    pl: 'Dodawanie użytkownika...'
                },
                linkUserFailure: {
                    en: 'Failed to link a user.',
                    pl: 'Dodanie użytkownika nie powiodło się.'
                },
                unlinkUserFailure: {
                    en: 'Failed to remove external user',
                    pl: 'Usunięcie zewnętrznego użytkownika nie powiodło się'
                },
                organizationRole: {
                    en: 'Organization role',
                    pl: 'Rola w organizacji'
                },
                visibleInCatalogue: {
                    en: 'Visible in catalogue',
                    pl: 'Widoczny w katalogu'
                },
                isAccountVerified: {
                    en: 'Account verified?',
                    pl: 'Konto zweryfikowane?'
                },
                isAccountClosed: {
                    en: 'Account closed?',
                    pl: 'Konto zamknięte?'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());