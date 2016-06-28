//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 5/18/2016.
     */
    Ext.define('mh.module.data.EditorLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        inheritableStatics: {
            localisation: {
                btnSaveNew: {
                    en: 'Create',
                    pl: 'Utwórz'
                },
                btnSaveEdit: {
                    en: 'Update',
                    pl: 'Aktualizuj'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                titleNew: {
                    en: 'New record',
                    pl: 'Nowy rekord'
                },
                titleEdit: {
                    en: 'Edit record',
                    pl: 'Edycja rekordu'
                },
                saveMaskNew: {
                    en: 'Creating record',
                    pl: 'Dodawanie rekordu'
                },
                saveMaskEdit: {
                    en: 'Updating record',
                    pl: 'Aktualizacja rekordu'
                },
                validationErrorServer: {
                    en: 'Server error :: Invalid form data',
                    pl: 'Błąd servera :: Błędne dane formularza'
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
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());