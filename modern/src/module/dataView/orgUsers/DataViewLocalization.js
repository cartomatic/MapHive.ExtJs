//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.users.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.users.DataViewLocalization',
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
                externalUser: {
                    en: 'Global user',
                    pl: 'Użytkownik globalny'
                },
                orgUser: {
                    en: 'Local user',
                    pl: 'Użytkownik lokalny'
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
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());