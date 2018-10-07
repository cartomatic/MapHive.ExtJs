//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.simpleDictionary.RecordViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.simpleDictionary.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.simpleDictionary.DataViewLocalization',
            localization: {
                genericViewName: {
                    en: 'Dictionary entry',
                    pl: 'Wartość słownika'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());