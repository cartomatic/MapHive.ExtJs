//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.phone.map.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhMapGps: 'x-i54c i54c-map-pin4',
                mhMapPositionPin: 'x-i54c i54c-location-4 i54c-3x',
                mhMapPositionConfirm: 'x-i54c i54c-done-location',
                mhMapPositionCancel: 'x-i54c i54c-clear-location',
                mhMapPositionEdit: 'x-i54c i54c-add-location'
            });
        }
    });
    
}());