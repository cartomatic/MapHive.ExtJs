//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.links.SingleLinkFieldLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                loadMask: {
                    en: 'Loading...',
                    pl: 'Pobieranie danych...'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());