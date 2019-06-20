//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localizations.translationKeys.DataEditFormLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.localizations.translationKeys.TranslationKeysLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.localizations.translationKeys.TranslationKeysLocalization',
            localization: {}
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());