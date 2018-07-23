//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.DataViewBaseLocalization',
            localization: {
                viewName: {
                    en: 'Users',
                    pl: 'Użytkownicy'
                },
                email:{
                    en: 'E-mail',
                    pl: 'E-mail'
                },
                forename: {
                    en: 'Forename',
                    pl: 'Imię'
                },
                surname:{
                    en: 'Surname',
                    pl: 'Nazwisko'
                },
                username: {
                    en: 'User',
                    pl: 'Użytkownik'
                },
                slug: {
                    en: 'Slug',
                    pl: 'Slug'
                },
                department: {
                    en: 'Department',
                    pl: 'Dział'
                },
                bio:{
                    en: 'Bio',
                    pl: 'Bio'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());