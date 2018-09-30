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
                btnAddUser: {
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
                unlinkExternalUserTitle: {
                    en: 'Remove external user',
                    pl: 'Usuwanie zewnętrznego użytkownika'
                },
                unlinkExternalUserMsg: {
                    en: 'You are about to remove an external user from your organisation. Continue?',
                    pl: 'Usuwasz zewnętrznego użytkownika ze swojej organizacji. Kontynuować?'
                },
                unlinkUserMask: {
                    en: 'Removing a user...',
                    pl: 'Usuwanie użytkownika...'
                },
                unlinkUserFailure: {
                    en: 'Failed to remove external user',
                    pl: 'Usunięcie zewnętrznego użytkownika nie powiodło się'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());