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
        let basePath = `${Ext.manifest.resources.path}/mh/jsLibs/ol/6.3.1`;
        mh.util.Loader.load({
            fileList: [
                `${basePath}/ol.css`,
                `${basePath}/ol.js`
            ]
        });
    });

}());