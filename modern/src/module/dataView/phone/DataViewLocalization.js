//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.phone.DataViewLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                listEmptyText: {
                    en: 'No data',
                    pl: 'Brak danych'
                },
                btnEdit: {
                    en: 'Edit',
                    pl: 'Edytuj'
                },
                btnDestroy: {
                    en: 'Destroy',
                    pl: 'Usuń'
                },
                destroyRecordLoadMask: {
                    en: 'Destroying record...',
                    pl: 'Usuwanie rekordu...'
                },
                destroyFailureMsg: {
                    en: 'Failed to destroy a record',
                    pl: 'Usunięcie rekordu nie powiodło się'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());