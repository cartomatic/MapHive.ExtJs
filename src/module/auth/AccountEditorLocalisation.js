(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.auth.AccountEditorLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                email: {
                    en: 'Email',
                    pl: 'Email'
                },
                gravatarEmail: {
                    en: 'Gravatar',
                    pl: 'Gravatar'
                },
                slug: {
                    en: 'Profile identifier (slug)',
                    pl: 'Identyfikator profilu (slug)'
                },
                forename: {
                    en: 'Forename',
                    pl: 'Imię'
                },
                surname: {
                    en: 'Surname',
                    pl: 'Nazwisko'
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

                btnRemoveProfilePicture: {
                    en: 'Remove',
                    pl: 'Usuń'
                },
                btnUploadProfilePicture: {
                    en: 'Add',
                    pl: 'Dodaj'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });
    
}());