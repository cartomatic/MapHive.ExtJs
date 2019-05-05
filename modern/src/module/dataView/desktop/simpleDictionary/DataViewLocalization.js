//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.simpleDictionary.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.DataViewLocalization',
            localization: {
                name:{
                    en: 'Name',
                    pl: 'Nazwa'
                },
                description: {
                    en: 'Description',
                    pl: 'Opis'
                },
                err_title: {
                    en: 'Delete failure',
                    pl: 'Bład usuwania'
                },
                err_unknown: {
                    en: 'Unknown error',
                    pl: 'Nieznany wyjątek'
                },
                err_dictionary_value_in_use: {
                    en: 'Dictionary value you are trying to delete is used elsewhere in the application.',
                    pl: 'Wartość słownikowa, którą próbujesz usunąć jest wykorzystywana przez aplikację.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());