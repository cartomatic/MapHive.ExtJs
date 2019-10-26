//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Whether or not the API map has already been configured
     */
    var apiMapConfigured = false,

        /**
         * the actual API map used by the application; see the configureApiMap for details on how this is instantiated
         */
        apiMap = null,

        /**
         * Organization context set for org apis url assembly
         * @type {null}
         */
        orgContextUuid = null,

        /**
         * static instance
         * @type {null}
         */
        staticInstance = null,

        /**
         * gets a static instance
         * @returns {null}
         */
        getStaticInstance = function(){
            if(!staticInstance){
                staticInstance = Ext.create('mh.mixin.ApiMap');
            }
            return staticInstance;
        },

        /**
         * a collection of models to take care of when an organization context changes, and their need proxy url updates
         * @type {Array}
         */
        orgChangesModelWatches = [];

    /**
     * Provides a centralised access point to the API endpoints;
     * The basic MapHive API map is defined in the mh.ApiMap
     *
     * This class is intended to be used as a mixin
     */
    Ext.define('mh.mixin.ApiMap', {

        statics: {
            getApiEndPointUrl: function(endPoint, skipOrgCtxReplace){
                return getStaticInstance().getApiEndPointUrl(endPoint, skipOrgCtxReplace)
            },

            getApiEndPointBaseUrl: function(endPoint){
                return getStaticInstance().getApiEndPointBaseUrl(endPoint)
            },

            getApiEndPoint: function(endPoint){
                return getStaticInstance().getApiEndPoint(endPoint)
            },

            getApiEndPointToken: function(endPoint){
                return getStaticInstance().getApiEndPointToken(endPoint)
            },

            getParentIdentifier: function(){
                return mh.ApiMap.getParentIdentifier();
            },

            getOrgIdentifier: function(){
                return mh.ApiMap.getOrgIdentifier();
            },

            getAppShortNameIdentifier: function(){
                return mh.ApiMap.getAppShortNameIdentifier();
            },

            getOrgContextUuid: function(){
                return orgContextUuid;
            },

            getResourceIdentifier: function(){
                return mh.ApiMap.getResourceIdentifier();
            },

            watchOrgContextChanges: function(model){
                getStaticInstance().watchOrgContextChanges(model);
            }
        },

        requires: [
            'mh.ApiMap'
        ],

        mixins: [
            'mh.mixin.InitialCfg',
            'mh.communication.MsgBus'
        ],


        constructor: function(){
            this.watchGlobal('org::changed', this.onOrgContextChange, this);
        },

        /**
         * org context change callback
         * @param org
         */
        onOrgContextChange: function(org){
            orgContextUuid = org.get('uuid');

            var modelNames = Ext.Object.getKeys(orgChangesModelWatches),
                m = 0, len = modelNames.length,
                model;

            for(m; m < len; m++){
                model = orgChangesModelWatches[modelNames[m]];

                if(model){
                    //force create a model if proxy not there yet;
                    //this is important, because can only access a proxy on a model once it has been instantiated. And obviously not always a model
                    //is instantiated straight away, while we still want it to watch org ctx changes
                    if(!model.proxy){
                        try{
                            Ext.create(modelNames[m]).getProxy();
                        }
                        catch(e){}
                    }
                }

                if(model && model.proxy){

                    if(!model.proxy.apiMapKey){
                        console.error(modelNames[m] + ' proxy does not define an apiMapKey!');
                    }

                    model.proxy.url = this.getApiEndPointUrl(model.proxy.apiMapKey);

                    //if a proxy requires some extra setup after org context's changed, let it do the job
                    if(Ext.isFunction(model.proxy.onOrgContextChanged)){
                        model.proxy.onOrgContextChanged();
                    }
                }
            }
        },

        /**
         * works out an api endpoint to call - uses api map key to work out a full api path
         * @param apiMapKey
         * @param skipOrgCtxReplace
         * @returns {string}
         */
        getApiEndPointUrl: function(apiMapKey, skipOrgCtxReplace){

            if(!apiMapConfigured){
                this.configureApiMap();
            }

            var ep = (apiMap[apiMapKey] || 'misconfiguredEndpoint::' + apiMapKey),

                apiEndPoint = this.getApiEndPoint(ep.apiEndPointKey),

                //finally a route
                route = ep.route ? ep.route : ep;

            return (apiEndPoint || {}).url + (skipOrgCtxReplace ? route : route.replace(this.getApiMapOrgIdentifier(), orgContextUuid || 'undefined_org_context'));
        },

        /**
         * gets an api endpoint object
         * @param apiKey
         */
        getApiEndPoint: function(apiKey){
            var apiEndpoints = this.getMhCfgProperty('apiEndPoints') || {};
            return apiEndpoints[apiKey];
        },

        /**
         * gets api endpoint base url
         * @param apiKey
         */
        getApiEndPointBaseUrl: function(apiKey){
            return (this.getApiEndPoint(apiKey) || {}).url;
        },

        /**
         * gets an api token if configured
         */
        getApiEndPointToken: function(apiKey){
            return (this.getApiEndPoint(apiKey) || {}).token;
        },

        /**
         * applies a specified api endpoint key to a passed api map
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

            //<debug>
            console.warn('ApiMap with reapplied api end point key: ', apiMap);
            //</debug>

            return apiMap;
        },

        /**
         * Overrides the default API map with the configuration that could have been extracted from the webclient config
         */
        configureApiMap: function(){

            //grab the cfg off the global initial cfg
            var apiMaps = mh.ApiMap.apiMaps;

            //register apis defined in the mh.ApiMap;
            apiMap = apiMap || {};

            Ext.Array.each(Ext.Object.getKeys(apiMaps), function(apiMapKey){
                this.extendOrUpdateApiMap(this.applyApiEndPointKey(apiMaps[apiMapKey], apiMapKey), true);
            }, this);


            //once the default api map is prepared, can apply changes delivered via the webclient cfg and mhApiMap property
            this.applyApiMapOverrides();

            apiMapConfigured = true;
        },

        /**
         * applies server side supplied api map overrides
         */
        applyApiMapOverrides: function(){
            //grab the cfg off the global initial cfg
            var apiMapChanges = this.getMhCfgProperty('mhApiMap'),
                keys, key, k = 0, klen;

            //note: this is not used very often but leaves a hook for redirecting some apis
            if(apiMapChanges){
                keys = Ext.Object.getKeys(apiMapChanges);
                klen = keys.length;

                for(k; k < klen; k++){
                    key = keys[k];

                    apiMap[key] = this.prepareApiMapValue(apiMap[key], apiMapChanges[key]);
                }
            }
        },

        /**
         * Extends or updates the api map
         * @param newApis
         * @param skipOverrides whether or not should avoid the api overrides re-application; defaults to true;
         */
        extendOrUpdateApiMap: function(newApis, skipOverrides){
            var newKeys = Ext.Object.getKeys(newApis),
                nk = 0, nklen = newKeys.length;

            for(nk; nk < nklen; nk++){
                apiMap[newKeys[nk]] = this.prepareApiMapValue(apiMap[newKeys[nk]], newApis[newKeys[nk]]);
            }

            //make sure to re-configure api map if needed. after all, server supplied changes should take precedence!
            if(skipOverrides !== true){
                this.applyApiMapOverrides();
            }
        },

        /**
         * takes care of preparing an overwritten api map value; overwrites url, apiEndPoint or both
         * @param oldV
         * @param newV
         * @returns {*} a simple string api map value representing route or an object with route / apiEndPoint keys
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
         *
         * @returns {*|string}
         */
        getApiMapResourceIdentifier: function(){
            return mh.ApiMap.getResourceIdentifier();
        },

        /**
         * gets a parent identifier token
         * @returns {string}
         */
        getApiMapParentIdentifier: function(){
            return mh.ApiMap.getParentIdentifier();
        },

        /**
         * gets an org indentifier token
         * @returns {string}
         */
        getApiMapOrgIdentifier: function(){
            return mh.ApiMap.getOrgIdentifier();
        },

        /**
         * gets an org context uuid
         * @returns {*}
         */
        getApiMapOrgContextUuid: function(){
            return orgContextUuid;
        },

        /**
         * collects the object
         * @param model
         */
        watchOrgContextChanges: function(model){

            var className = Ext.getClassName(model);

            if(!orgChangesModelWatches[className]){
                orgChangesModelWatches[className] = model;
            }
        }

    });

}());