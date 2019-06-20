//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.EditorLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
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
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());