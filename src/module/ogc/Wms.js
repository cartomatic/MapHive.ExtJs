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
            mh.module.ogc.Utils.loadScripts(
                [
                    'jsonix/3.0.0/Jsonix-min.js',
                    'w3c-schemas/1.4.0/lib/XLink_1_0.js',
                    'inspire-schemas/1.0.0/lib/INSPIRE_VS_1_0.js',
                    'ogc-schemas/2.6.1/lib/OWS_1_0_0.js',
                    'ogc-schemas/2.6.1/lib/OWS_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_0_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_1_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_1_1.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_3_0.js',
                    'ogc-schemas/2.6.1/lib/WMS_1_3_0_Exceptions.js'
                ],
                function(){
                    context =  new Jsonix.Context([
                        XLink_1_0,
                        INSPIRE_VS_1_0,
                        OWS_1_0_0,
                        OWS_1_1_0,
                        WMS_1_0_0,
                        WMS_1_1_0,
                        WMS_1_1_1,
                        WMS_1_3_0,
                        WMS_1_3_0_Exceptions
                    ]);
                    unmarshaller = context.createUnmarshaller();
                },
                this
            );
        },

        /**
         * fetches wms capabilities
         * @param url someServer/ows
         * @returns {Promise<string | never>}
         */
        getCapabilities: function(url){

            let baseUrl = mh.module.ogc.Utils.extractBaseUrl(url),
                params = mh.module.ogc.Utils.extractUrlParams(url, ['service', 'version', 'request']) || [];

            params.push('service=wms');
            params.push('request=GetCapabilities');

            url = `${baseUrl}?${params.join('&')}`;

            return fetch(url).then(function(response) {
                return response.text();
            }).then(function(text) {
                return unmarshaller.unmarshalString(text);
            });
        }
    });

}());