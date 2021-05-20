//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.imgGallery.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhImgGallery: 'x-i54c i54c-picture-folder',
                mhImgGalleryImgStd: 'x-i54c i54c-insert-image i54c-2x',
                mhImgGalleryImg360: 'x-li li-3d-rotate li-2x'
            });
        }
    });
    
}());