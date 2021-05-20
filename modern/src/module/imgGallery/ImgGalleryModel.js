//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.imgGallery.ImgGalleryModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-img-gallery',

        requires: [
        ],

        stores: {
            gridstore: {
                fields: [
                    { name: 'name', type: 'string'},
                    { name: 'url', type: 'string' },
                    { name: 'is360', type: 'bool'},
                    { name: 'width', type: 'number'},
                    { name: 'height', type: 'number'}
                ]
            }
        },

        data: {
            localization: null
        }
    });

}());