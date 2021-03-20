//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * ol map container that automatically loads all the required ol scripts.
     * usually will load a current ol version
     */
    Ext.define('mh.module.map.ol.MapContainer', {
        extend: 'mh.module.map.ol.MapContainerBase',

        requires: [
            'mh.util.Loader'
        ],
    
        xtype: 'mh-ol-map-container'
    },
    function(){
        let basePath = `${Ext.manifest.resources.path}/mh/jsLibs/`,
            olSubPath = 'ol/6.5.0/';
        mh.util.Loader.load({
            fileList: [
                `${basePath}${olSubPath}ol.css`,
                `${basePath}${olSubPath}ol.js`,
                `${basePath}proj4js/2.7.2/proj4.js`
            ]
        });
    });

}());