//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    let context, unmarshaller;

    /**
     * WMS capabilities .
     */
    Ext.define('mh.module.ogc.Wms', {

        requires: [
            'mh.module.ogc.Utils'
        ],

        singleton: true,

        constructor: function() {
            let scripts = [
                    'jsonix/3.0.0/Jsonix-min.js',
                    'w3c-schemas/1.4.0/lib/XLink_1_0.js',
                    'inspire-schemas/1.0.0/lib/INSPIRE_VS_1_0.js',
                    'ogc-schemas/2.6.1/lib/OWS_1_0_0.js',
                    'ogc-schemas/2.6.1/lib/OWS_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/SMIL_2_0.js',
                    'ogc-schemas/2.6.1/lib/SMIL_2_0_Language.js',
                    'ogc-schemas/2.6.1/lib/GML_3_1_1.js',
                    'ogc-schemas/2.6.1/lib/Filter_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/SE_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/SLD_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_0_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_1_1.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_3_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_3_0_Exceptions.js'
                ],
                callback = () => {
                    if(
                        typeof Jsonix === 'undefined' ||
                        typeof XLink_1_0 === 'undefined' ||
                        typeof INSPIRE_VS_1_0 === 'undefined' ||
                        typeof OWS_1_0_0 === 'undefined' ||
                        typeof OWS_1_1_0 === 'undefined' ||
                        typeof SMIL_2_0 === 'undefined' ||
                        typeof SMIL_2_0_Language === 'undefined' ||
                        typeof GML_3_1_1 === 'undefined' ||
                        typeof Filter_1_1_0 === 'undefined' ||
                        typeof SE_1_1_0 === 'undefined' ||
                        typeof SLD_1_1_0 === 'undefined' ||
                        typeof WMS_1_0_0 === 'undefined' ||
                        typeof WMS_1_1_1 === 'undefined' ||
                        typeof WMS_1_3_0 === 'undefined' ||
                        typeof WMS_1_3_0_Exceptions === 'undefined'
                    ){
                        Ext.defer(loadScripts, 250, this);
                        return;
                    }
                    context =  new Jsonix.Context([
                        XLink_1_0,
                        INSPIRE_VS_1_0,
                        OWS_1_0_0,
                        OWS_1_1_0,
                        SMIL_2_0,
                        SMIL_2_0_Language,
                        GML_3_1_1,
                        Filter_1_1_0,
                        SE_1_1_0,
                        SLD_1_1_0,
                        WMS_1_0_0,
                        WMS_1_1_0,
                        WMS_1_1_1,
                        WMS_1_3_0,
                        WMS_1_3_0_Exceptions
                    ]);
                    unmarshaller = context.createUnmarshaller();
                },
                loadScripts = () => {
                    mh.module.ogc.Utils.loadScripts(
                        scripts,
                        callback,
                        this
                    );
                };

           loadScripts();
        },

        /**
         * fetches wms capabilities
         * @param url someServer/ows
         * @param preferredVersion
         * @returns {Promise<string | never>}
         */
        getCapabilities: function(url, preferredVersion){

            let baseUrl = mh.module.ogc.Utils.extractBaseUrl(url),
                params = mh.module.ogc.Utils.extractUrlParams(url, ['service', 'version', 'request']) || [];

            params.push('service=wms');
            params.push('request=GetCapabilities');
            if(preferredVersion){
                params.push(`version=${preferredVersion}`);
            }

            url = `${baseUrl}?${params.join('&')}`;

            return fetch(url).then(function(response) {
                return response.text();
            }).then(function(text) {
                return unmarshaller.unmarshalString(text);
            });
        },

        /**
         * extracts WMS layer by name from service capabilities
         * @param caps
         * @param lName
         * @returns {number | never | bigint | T | T | *}
         */
        getLayerFromCaps: function(caps, lName){
            return caps.capability.layer.layer.find(l=>l.name === lName);
        },

        /**
         * extracts WMS GetMap url from capabilities document
         */
        getMapUrlFromCaps: function(caps){
            let dcp = caps.capability.request.getMap.dcpType[0];

            if(dcp && dcp.http && dcp.http.get){
                return dcp.http.get.onlineResource.href;
            }
        },

        /**
         * gets wms wgs84 extent for specified layers
         * @param caps
         * @param layers {string|string[]}
         * @returns {number[]}
         */
        getWgs84ExtentForLayers: function(caps, layers){
            let l,b,r,t;

            if(!Array.isArray(layers)){
                layers = layers.split(',');
            }

            layers.forEach((lName) => {
                let wmsL = mh.module.ogc.Wms.getLayerFromCaps(caps, lName);

                if(wmsL){
                    if(b === undefined){
                        l = wmsL.exGeographicBoundingBox.eastBoundLongitude;
                        b = wmsL.exGeographicBoundingBox.southBoundLatitude;
                        r = wmsL.exGeographicBoundingBox.westBoundLongitude;
                        t = wmsL.exGeographicBoundingBox.northBoundLatitude;
                    }
                    else {
                        l = Math.min(l, wmsL.exGeographicBoundingBox.eastBoundLongitude);
                        b = Math.min(b, wmsL.exGeographicBoundingBox.southBoundLatitude);
                        r = Math.max(r, wmsL.exGeographicBoundingBox.westBoundLongitude);
                        t = Math.max(t, wmsL.exGeographicBoundingBox.northBoundLatitude);
                    }
                }
            });

            if(l !== undefined){
                return [l,b,r,t];
            }
        }
    });

}());