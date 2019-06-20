//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Localization for the generic editor controller
     */
    Ext.define('mh.mixin.ResponseValidationErrorReaderLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                validationErrorServer: {
                    en: 'Invalid form data', //'Server error :: Invalid form data',
                    pl: 'Błędne dane formularza' //'Błąd servera :: Błędne dane formularza'
                },
                validationErrorTitle:{
                    en: 'Invalid form data',
                    pl: 'Błędne dane formularza'
                },
                validationErrorMsgMany: {
                    en: 'The form contains the following errors:',
                    pl: 'Formularz zawiera następujące błędy:'
                },
                validationErrorMsgSingle: {
                    en: 'The form contains the following error:',
                    pl: 'Formularz zawiera następujący błąd:'
                },
                validationErrorDefault: {
                    en: 'The form has some invalid fields. Please provide valid data before submitting the form.',
                    pl: 'Formularz zawiera nieprawidłowe dane. Aby zapisać formularz niezbędne jest ich poprawienie.'
                },

                unknownProperty: {
                    en: 'U N D E F I N E D',
                    pl: 'N I E Z D E F I N I O W A N E'
                },

                unknownErr: {
                    en: 'Unknown error triggered for "{field_name}" field.<br/>The error message is:<br/><i>{err_msg}</i>.',
                    pl: 'Nieznany wyjątek dla pola "{field_name}". <br/>Informacja o wyjątku: <br/><i>{err_msg}</i>.'
                },
                valueTooShortErr: {
                    en: 'Value for the "{field_name}" field is too short. The minimum length is {min_length}, while the length of a provided string was {total_length}.',
                    pl: 'Ciąg w polu "{field_name}" jest za krótki. Minimalna długość to {min_length}. Wysłany ciąg miał długość {total_length}.'
                },
                valueTooLongErr: {
                    en: 'Value for the "{field_name}" field is too long. The maximum length is {max_length}, while the length of a provided string was {total_length}.',
                    pl: 'Ciąg w polu "{field_name}" jest za długi. Maksymalna długość to {max_length}. Wysłany ciąg miał długość {total_length}.'
                },
                valueRequired: {
                    en: 'Value for the "{field_name}" field is required.',
                    pl: 'Pole "{field_name}" nie może być puste.'
                },
                invalidEmail: {
                    en: 'Value in the "{field_name}" field must be a valid email.',
                    pl: 'Pole "{field_name}" musi zawierać poprawny email.'
                },
                emailInUse: {
                    en: 'Email in the "{field_name}" field has already been reserved.',
                    pl: 'Email w polu "{field_name}" jest już zarezerwowany.'
                },
                uniqueConstraint: {
                    en: 'Value in the "{field_name}" field must be unique.',
                    pl: 'Wartość w polu "{field_name}" musi być unikalna.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());