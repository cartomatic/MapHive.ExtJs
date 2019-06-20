//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.simpleDictionary.EditViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.simpleDictionary.RecordViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.simpleDictionary.RecordViewLocalization',
            localization: {
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
