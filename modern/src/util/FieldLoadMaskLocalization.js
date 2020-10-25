//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.util.FieldLoadMaskLocalization', {

        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                loadingMsg: {
                    en: 'Loading...',
                    pl: 'Ładowanie...',
                    nl: 'Loading...'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());