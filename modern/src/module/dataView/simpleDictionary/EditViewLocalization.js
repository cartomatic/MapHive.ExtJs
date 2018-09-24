//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.simpleDictionary.EditViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.simpleDictionary.RecordViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.simpleDictionary.RecordViewLocalization',
            localization: {
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
