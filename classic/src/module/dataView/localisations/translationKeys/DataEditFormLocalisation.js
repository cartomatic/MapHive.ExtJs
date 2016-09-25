//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localisations.translationKeys.DataEditFormLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.localisations.translationKeys.TranslationKeysLocalisation'
        ],
        statics: {
            inherits: 'mh.module.dataView.localisations.translationKeys.TranslationKeysLocalisation',
            localisation: {}
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());