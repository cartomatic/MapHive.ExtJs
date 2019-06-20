//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Localization for the generic editor controller
     */
    Ext.define('mh.module.dataView.GenericEditFormLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                failedNew: {
                    en: 'Failed to create a record.',
                    pl: 'Utworzenie rekordu nie powiodło się.'
                },
                failedEdit: {
                    en: 'Failed to update a record.',
                    pl: 'Aktualizacja rekordu nie powiodła się.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());