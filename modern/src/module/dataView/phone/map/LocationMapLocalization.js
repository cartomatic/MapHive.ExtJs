//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.phone.map.LocationMapLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                longitude: {
                    en: 'Longitude',
                    pl: 'Długość'
                },
                latitude: {
                    en: 'Latitude',
                    pl: 'Szerokość'
                },
                title: {
                    en: 'Location map',
                    pl: 'Lokalizacja'
                },
                incompleteLocationMsg: {
                    en: 'Geolocation not set.',
                    pl: 'Brak współrzędnych geograficznych.'
                },
                incompleteLocationNotSaved: {
                    en: 'Location has not been confirmed.',
                    pl: 'Współrzędne geograficzne nie zostały zatwierdzone.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());