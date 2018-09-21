(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 10.02.2017.
     */
    Ext.define('mh.module.auth.AccountCreatorLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                title: {
                    en: 'Create account',
                    pl: 'Załóż konto'
                },
                emailEmptyText: {
                    en: 'Email',
                    pl: 'Email'
                },
                slugEmptyText: {
                    en: 'Profile identifier (slug)',
                    pl: 'Identyfikator profilu (slug)'
                },
                forenameEmptyText: {
                    en: 'Forename',
                    pl: 'Imię'
                },
                surnameEmptyText: {
                    en: 'Surname',
                    pl: 'Nazwisko'
                },
                btnCreate: {
                    en: 'Create account',
                    pl: 'Załóż konto'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                accountCreateInProgress: {
                    en: 'Creating account...',
                    pl: 'Zakładania konta...'
                },
                accountCreationSuccessTitle: {
                    en: 'Account created',
                    pl: 'Konto założone'
                },
                accountCreationSuccessMsg: {
                    en: 'An account has been successfuly created for you. Please review your mailbox for further instructions.',
                    pl: 'Twoje konto zostało założone. Dalsze instrukcje znajdziesz niebawem w swojej skrzynce pocztowej.'
                },
                accountCreationFailureTitle: {
                    en: 'Account creation failure',
                    pl: 'Błąd zakładania konta'
                },
                accountCreationFailureMsg: {
                    en: 'It was not possible to create an account for you at this time. Please try again or contact system administrator.',
                    pl: 'Założenie konta nie powiodło się. Spróbuj ponownie, lub skontaktuj się z administratorem systemu.'
                },
                accountCreationFailureDetailedMsg: {
                    en: 'It was not possible to create an account for you at this time. Please review the encountered errors:',
                    pl: 'Założenie konta nie powiodło się. Zweryfikuj poniższe błędy:'
                },
                invalid_email: {
                    en: 'Invalid email',
                    pl: 'Niepoprawny adres email'
                },
                unknown_error: {
                    en: 'Unknown error',
                    pl: 'Nieznany błąd'
                },
                email_in_use: {
                    en: 'Provided email has already been reserved',
                    pl: 'Podany email jest już zarezerwowany'
                },
                slug_taken: {
                    en: 'Provided Profile identifier (slug) has already been reserved by another user.',
                    pl: 'Podany identyfikator profilu (slug) został już zarezerwowany przez innego użytkownika'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
    
}());