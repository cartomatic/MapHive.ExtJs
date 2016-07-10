//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Localisation for the generic editor controller
     */
    Ext.define('mh.module.dataView.GenericEditFormLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                failedNew: {
                    en: 'Failed to create a record.',
                    pl: 'Utworzenie rekordu nie powiodło się.'
                },
                failedEdit: {
                    en: 'Failed to update a record.',
                    pl: 'Aktualizacja rekordu nie powiodła się.'
                },
                unknownErr: {
                    en: 'Unknown error triggered for a "{field_name}" field. The error message is: {err_msg}.',
                    pl: 'Nieznany wyjątek dla pola "{field_name}". Informacja o wyjąku: {err_msg}.'
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
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());