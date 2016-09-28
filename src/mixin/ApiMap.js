//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var apiMapConfigured = false,

        parentIdentifier = '{parent_uuid}',

        //Note: this is overridable through the web.config... see the MhApiMap key for details
        apiMap = {

            //auth
            login: 'auth/letmein',
            logout: 'auth/letmeoutofhere',
            tokenValidation: 'auth/tokenvalidation',
            accountActivation: 'auth/accountactivation',
            passResetRequest: 'auth/passresetrequest',
            resetPass: 'auth/resetpass',
            changePass: 'auth/changepass',

            //apps
            applications: 'applications',
            userapps: 'applications/userapps',

            //users
            users: 'users',

            localisationClasses: 'localisationclasses',
            translationKeys: 'translationkeys',
            langs: 'langs',
            emailTemplateLocalisations: 'emailtemplatelocalisations',
            appLocalisationsBulkSave: 'applocalisations/bulksave'
        },

        staticInstance = null;

    /**
     * Provides a centralised access point to the API endpoints
     */
    Ext.define('mh.mixin.ApiMap', {

        statics: {
            getApiEndPoint: function(apiMapKey){
                if(!staticInstance){
                    staticInstance = Ext.create('mh.mixin.ApiMap');
                }
                return staticInstance.getApiEndPoint(apiMapKey)
            },

            getParentIdentifier: function(){
                return parentIdentifier;
            }
        },

        mixins: [
            'mh.mixin.InitialCfg'
        ],

        /**
         * Whether or not the API map has already been configured
         */
        apiMapConfigured: false,



        /**
         * works out an api endpoint to call
         * @param endPoint
         * @returns {string}
         */
        getApiEndPoint: function(apiMapKey){

            if(!apiMapConfigured){
                this.configureApiMap();
            }

            var ep = (apiMap[apiMapKey] || 'misconfiguredApiEndpoint::' + apiMapKey),
                apiEndpoints = this.getMhCfgProperty('apiEndPoints') || {},
                apiEndPoint =
                    ep.apiEndPointKey ?
                        apiEndpoints[ep.apiEndPointKey] :
                        apiEndpoints.mhApi,

                //finally a route
                route = ep.route ? ep.route : ep;

            return apiEndPoint + route;
        },

        /**
         * applies a specified api endpoint key to a passed api map
         * This is used when there is a need to extend the basic API map with some other APIs with or without own api endpoints (configured via ApiEndPoints web.config property)
         * @param apiMap
         * @param apiEndPointKey
         */
        applyApiEndPointKey: function(apiMap, apiEndPointKey){
            Ext.Array.each(Ext.Object.getKeys(apiMap), function(apiMapKey){
                if(!Ext.isObject(apiMap[apiMapKey])){
                    //if not object, assume it's string
                    apiMap[apiMapKey] = {
                        route: apiMap[apiMapKey]
                    };
                }
                apiMap[apiMapKey].apiEndPointKey = apiEndPointKey;
            });

            return apiMap;
        },

        /**
         * Overrides the default API map with the configuration defined in the web.config
         */
        configureApiMap: function(){

            //grab the cfg off the global initial cfg
            var apiMapChanges = this.getMhCfgProperty('apiMap'),
                keys, key, k = 0, klen;
            if(apiMapChanges){
                keys = Ext.Object.getKeys(apiMapChanges);
                klen = keys.length;

                for(k; k < klen; k++){
                    key = keys[k];

                    apiMap[key] = this.prepareApiMapValue(apiMap[key], apiMapChanges[key]);
                }
            }

            apiMapConfigured = true;
        },

        /**
         * Extends or updates the API map
         * @param newApis
         */
        extendOrUpdateApiMap: function(newApis){
            var newKeys = Ext.Object.getKeys(newApis),
                nk = 0, nklen = newKeys.length;

            for(nk; nk < nklen; nk++){
                apiMap[newKeys[nk]] = this.prepareApiMapValue(apiMap[newKeys[nk]], newApis[newKeys[nk]]);
            }

            //make sure to recofigure api map. after all, server supplied changes should take precedence!
            this.configureApiMap();
        },

        /**
         * takes care of preparing an overwritten api map value; overwrites url, apiEndPoint or both
         * @param oldV
         * @param newV
         * @returns {*} a simple string api map value representing route or an object with route / apiEndPointKey properties
         */
        prepareApiMapValue: function(oldV, newV){

            if(!oldV){
                return newV;
            }

            //out v based on the incoming value
            var outV = {
                route: oldV.route || oldV, //oldV may be a string or an object!
                apiEndPointKey: oldV.apiEndPointKey //will be undefined if string of course
            };

            outV.route = Ext.isObject(newV) ? newV.route || outV.route : newV;
            outV.apiEndPointKey = newV.apiEndPointKey || outV.apiEndPointKey;

            //make it a string again if no endPoint hs been provided
            if(!outV.apiEndPointKey){
                outV = outV.route;
            }
            return outV;
        },

        /**
         * gets a parent identifier token
         * @returns {string}
         */
        getApiMapParentIdentifier: function(){
            return parentIdentifier;
        },

        /**
         * gets a parent identifier token
         * @obsolete
         * @returns {string}
         */
        getParentIdentifier: function(){
            return this.getApiMapParentIdentifier();
        }

    });

}());