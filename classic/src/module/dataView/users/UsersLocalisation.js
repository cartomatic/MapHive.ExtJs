//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.DataViewBaseLocalization',
            localization: {
                gridTitle: {
                    en: 'Users',
                    pl: 'Użytkownicy'
                },
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
                    en: 'Profile identifier (slug)',
                    pl: 'Identyfikator profilu (slug)'
                },
                gravatarEmail: {
                    en: 'Gravatar',
                    pl: 'Gravatar'
                },
                bio: {
                    en: 'Bio',
                    pl: 'Bio'
                },
                company: {
                    en: 'Company',
                    pl: 'Firma'
                },
                department: {
                    en: 'Department',
                    pl: 'Dział'
                },
                location: {
                    en: 'Location',
                    pl: 'Lokalizacja'
                },
                isOrgUser: {
                    en: 'Org user',
                    pl: 'Uzytkownik organizacji'
                },
                visibleInCatalogue: {
                    en: 'Searchable in catalogue',
                    pl: 'Wyszukiwalny w katalogu'
                },
                isAccountClosed: {
                    en: 'Account closed',
                    pl: 'Konto zamknięte'
                },
                isAccountVerified: {
                    en: 'Account verified',
                    pl: 'Konto zweryfikowane'
                },
                orgRole: {
                    en: 'Role',
                    pl: 'Rola'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());