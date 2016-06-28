//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var apiMapConfigured = false,

        defaultParentIdentifier = '{parent_uuid}',

        //Note: this is overridable through the web.config... see the MhApiMap key for details
        apiMap = {

            login: 'auth/login',

            applications: 'applications',

            tokenValidation: 'auth/tokenvalidation'
        },

        staticInstance = null;

    /**
     * Provides a centralised access point to the API endpoints
     */
    Ext.define('mh.mixin.ApiMap', {

        statics: {
            getApiEndPoint: function(endPoint){
                if(!staticInstance){
                    staticInstance = Ext.create('mh.mixin.ApiMap');
                }
                return staticInstance.getApiEndPoint(endPoint)
            },

            getDefaultParentIdentifier: function(){
                return defaultParentIdentifier;
            }
        },

        mixins: [
            'mh.mixin.InitialCfg'
        ],

        /**
         * Whether or not the API map has already been configured
         */
        apiMapConfigured: false,



        getApiEndPoint: function(endPoint){

            if(!apiMapConfigured){
                this.configureApiMap();
            }

            return this.getMhCfgProperty('mhApiEndPoint') + apiMap[endPoint];
        },

        /**
         * Overrides the default API map with the configuration defined in the web.config
         */
        configureApiMap: function(){

            //grab the cfg off the global initial cfg
            var apiMapChanges = this.getMhCfgProperty('mhApiMap'),
                keys, key, k = 0, klen;
            if(apiMapChanges){
                keys = Ext.Object.getKeys(apiMapChanges);
                klen = keys.length;

                for(k; k < klen; k++){
                    key = keys[k];

                    apiMap[key] = apiMapChanges[key];
                }
            }

            apiMapConfigured = true;
        }

    });

}());