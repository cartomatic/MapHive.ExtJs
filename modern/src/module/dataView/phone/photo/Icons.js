//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.phone.photo.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhPhotoSnap: 'x-li li-camera2',
                mhPhotoDelete: 'x-li li-cross-circle',
                mhPhotoCancel: 'x-li li-circle-minus',
                mhPhotoSwap: 'x-li li-camera-flip',
                mhPhotoIconDefault: 'x-li li-picture'
            });
        }
    });
    
}());