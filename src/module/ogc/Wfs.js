//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    let context, unmarshaller;

    /**
     * WFS capabilities .
     * based on http://bl.ocks.org/ThomasG77/3a136ebb9895d4b73231c5f5782636ae
     */
    Ext.define('mh.module.ogc.Wfs', {

        requires: [
            'mh.module.ogc.Utils'
        ],

        singleton: true,

        constructor: function() {
            mh.module.ogc.Utils.loadScripts(
                [
                    'jsonix/3.0.0/Jsonix-min.js',
                    'w3c-schemas/1.4.0/lib/XLink_1_0.js',
                    'w3c-schemas/1.4.0/lib/XSD_1_0.js', //this is for unmarshalling DescribeFeatureType schema
                    'ogc-schemas/2.6.1/lib/OWS_1_0_0.js',
                    'ogc-schemas/2.6.1/lib/OWS_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/Filter_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/Filter_2_0.js',
                    'ogc-schemas/2.6.1/lib/GML_3_1_1.js',
                    'ogc-schemas/2.6.1/lib/SMIL_2_0.js',
                    'ogc-schemas/2.6.1/lib/SMIL_2_0_Language.js',
                    'ogc-schemas/2.6.1/lib/WFS_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/WFS_2_0.js'
                ],
                function(){
                    context =  new Jsonix.Context([
                        XLink_1_0,
                        XSD_1_0,
                        OWS_1_0_0,
                        OWS_1_1_0,
                        Filter_1_1_0,
                        Filter_2_0,
                        GML_3_1_1,
                        SMIL_2_0,
                        SMIL_2_0_Language,
                        WFS_1_1_0,
                        WFS_2_0
                    ]);
                    unmarshaller = context.createUnmarshaller();
                },
                this
            );
        },

        /**
         * fetches wfs capabilities
         * @param url someServer/ows
         * @returns {Promise<string | never>}
         */
        getCapabilities: function(url){

            let baseUrl = mh.module.ogc.Utils.extractBaseUrl(url),
                params = mh.module.ogc.Utils.extractUrlParams(url, ['service', 'version', 'request']) || [];

            params.push('service=wfs');
            params.push('request=GetCapabilities');

            url = `${baseUrl}?${params.join('&')}`;

            return fetch(url).then(function(response) {
                return response.text();
            }).then(function(text) {
                return unmarshaller.unmarshalString(text);
            });
        },

        /**
         * describes feature types available
         * @param url
         */
        describeFeatureType: function(url){
            let baseUrl = mh.module.ogc.Utils.extractBaseUrl(url),
                params = mh.module.ogc.Utils.extractUrlParams(url, ['service', 'version', 'request']) || [];

            params.push('service=wfs');
            params.push('version=1.1.0');
            params.push('request=DescribeFeatureType');

            url = `${baseUrl}?${params.join('&')}`;

            return fetch(url).then(function(response) {
                return response.text();
            }).then(function(text) {
                return unmarshaller.unmarshalString(text);
            });
        }
    });

}());