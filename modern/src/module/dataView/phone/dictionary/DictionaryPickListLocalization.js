//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.dictionary.DictionaryPickListLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                incompleteMissingValue: {
                    en: 'Missing dictionary value.',
                    pl: 'Nie wybrano wartości słownikowej.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
