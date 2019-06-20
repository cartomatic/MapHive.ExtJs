//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.phone.photo.MultiSnapLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                noVideoDevicesFound: {
                    en: 'No video input devices found.',
                    pl: 'Nie znaleziono aparatu fotograficznego'
                },
                incompleteMissingPhoto: {
                    en: 'Missing photograph.',
                    pl: 'Nie zrobiono zdjęcia.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());