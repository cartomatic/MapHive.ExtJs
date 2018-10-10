//Disable some of the JSLint warnings
/*global window,console,Ext*/
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
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());