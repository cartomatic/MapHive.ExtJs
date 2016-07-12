//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var apiMapConfigured = false,

        defaultParentIdentifier = '{parent_uuid}',

        //Note: this is overridable through the web.config... see the MhApiMap key for details
        apiMap = {

            //auth
            login: 'auth/letmein',
            logout: 'auth/letmeoutofhere',
            tokenValidation: 'auth/tokenvalidation',

            //apps
            applications: 'applications',
            userapps: 'applications/userapps',

            //users
            users: 'users',

            appLocalisations: 'applocalisations',
            langs: 'langs',
            emailTemplateLocalisations: 'emailtemplatelocalisations'
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

            return this.getMhCfgProperty('apiEndPoint') + apiMap[endPoint];
        },

        getDefaultParentIdentifier: function(){
            return defaultParentIdentifier;
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
        },

        /**
         * Extends or updates the api map
         * @param newApis
         */
        extendOrUpdateApiMap: function(newApis){
            var newKeys = Ext.Object.getKeys(newApis),
                nk = 0, nklen = newKeys.length;

            for(nk; nk < nklen; nk++){
                apiMap[newKeys[nk]] = newApis[newKeys[nk]];
            }

            //make sure to recofigure api map. after all, server supplied changes should take precedence!
            this.configureApiMap();
        }

    });

}());