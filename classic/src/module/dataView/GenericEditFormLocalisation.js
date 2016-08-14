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
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());