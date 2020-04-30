//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
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
            let scripts = [
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
                callback = () => {
                if(
                    typeof Jsonix === 'undefined' ||
                    typeof XLink_1_0 === 'undefined' ||
                    typeof XSD_1_0 === 'undefined' ||
                    typeof OWS_1_0_0 === 'undefined' ||
                    typeof OWS_1_1_0 === 'undefined' ||
                    typeof Filter_1_1_0 === 'undefined' ||
                    typeof Filter_2_0 === 'undefined' ||
                    typeof GML_3_1_1 === 'undefined' ||
                    typeof SMIL_2_0 === 'undefined' ||
                    typeof SMIL_2_0_Language === 'undefined' ||
                    typeof WFS_1_1_0 === 'undefined' ||
                    typeof WFS_2_0 === 'undefined'
                ){
                    Ext.defer(loadScripts, 250, this);
                    return;
                }
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
         * fetches wfs capabilities
         * @param url someServer/ows
         * @param preferredVersion
         * @returns {Promise<string | never>}
         */
        getCapabilities: function(url, preferredVersion){

            let baseUrl = mh.module.ogc.Utils.extractBaseUrl(url),
                params = mh.module.ogc.Utils.extractUrlParams(url, ['service', 'version', 'request']) || [];

            params.push('service=wfs');
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
         * describes feature types available
         * @param url
         * @param preferredVersion
         * @returns {Promise<string | never>}
         */
        describeFeatureType: function(url, preferredVersion){
            let baseUrl = mh.module.ogc.Utils.extractBaseUrl(url),
                params = mh.module.ogc.Utils.extractUrlParams(url, ['service', 'version', 'request']) || [];

            params.push('service=wfs');
            params.push('request=DescribeFeatureType');
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
         * gets WFS feature type description from capabilities
         * @param caps
         * @param tName
         * @returns {number | never | bigint | T | T | *}
         */
        getFeatureTypeDescriptionFromCapabilities: function(caps, tName){
            //truncate Type part - featureType name is taken from the describeFeatureType and seems to have Type word appended (at least geoserver does so)
            let tNameFixed = tName;
            if(tNameFixed.endsWith('Type')){
                tNameFixed = tNameFixed.substring(0, tNameFixed.length - 4);
            }

            return (
                caps.featureTypeList.featureType //1.1.0
                || caps.featureTypeList.featureTypeArray //2.0.0
            ).find(x=>x.name.localPart === tNameFixed);
        },


        /**
         * returns a wgs 84 extent for feature type in a form of [l,b,r,t]
         * @param caps
         * @param tName
         * @returns {null|*[]}
         */
        getFeatureTypeWgs84ExtentFromCaps: function(caps, tName){
            let f = mh.module.ogc.Wfs.getFeatureTypeDescriptionFromCapabilities(caps, tName);

            //Note: applies to wfs 1.1.0
            if(f && f.wgs84BoundingBox[0]){
                let bb = f.wgs84BoundingBox[0];
                return [bb.lowerCorner[0], bb.lowerCorner[1], bb.upperCorner[0], bb.upperCorner[1]];
            }

            return null;
        },

        /**
         * gets namespaced type name
         * @param caps
         * @param tName
         */
        getTypeNameWithNamespaceFromCaps: function(caps, tName){
            let f = mh.module.ogc.Wfs.getFeatureTypeDescriptionFromCapabilities(caps, tName);

            if(f){
                return `${f.name.prefix}:${f.name.localPart}`;
            }

            //uuh, not found, so return whatever has been extracted from describeFeatureType
            return tName;
        },

        /**
         * extracts WFS get feature url from the caps doc
         * @param caps
         */
        getFeatureUrlFromCaps: function(caps){
            let getFeatureOp = caps.operationsMetadata.operation.find(o => o.name === 'GetFeature') || {},
                dcp = (getFeatureOp.dcp || [])[0];

            if(dcp && dcp.http && dcp.http.getOrPost){
                let get = dcp.http.getOrPost.find(x => x.name.localPart === 'Get');
                if(get){
                    return get.value.href;
                }
            }
        },

        /**
         * checks if a WFS service supports outputting data as geojson
         * @param caps
         */
        outputsGeoJson: function(caps){
            let getFeatureOp = caps.operationsMetadata.operation.find(o=> o.name === 'GetFeature'),
                outputFormats = getFeatureOp
                    ? ((getFeatureOp.parameter.find(p => p.name === 'outputFormat') || {}).allowedValues || {}).valueOrRange || //2.0.0
                      (getFeatureOp.parameter.find(p => p.name === 'outputFormat') || {}).value || //1.1.0
                      []
                    : [],
                supportsGeoJson = !!outputFormats.find(f => {
                    let format = f.value //2.0.0
                        || f; //1.1.0

                    return format === 'application/json' || format === 'json';
                });

            return supportsGeoJson;
        }

    });

}());