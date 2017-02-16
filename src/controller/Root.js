//Disable some of the JSLint warnings
/*global Ext,console,mh,window*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Controls the initial application setup and behavior; interacts with the Auth controller in order to authenticate a user;
     * responsible for starting up the application whenever user is authenticated
     */
    Ext.define('mh.controller.Root', {

        extend: 'Ext.app.Controller',

        mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters',
            'mh.data.Ajax',
            'mh.mixin.ModalMode',
            'mh.mixin.InitialCfg',
            'mh.mixin.ApiMap',
            'mh.mixin.UrlUtils'
        ],

        requires: [
            'Ext.app.Application',
            'mh.dummy.AppLauncher',
            'mh.data.model.Application'
        ],

        /**
         * @event auth::verifyauthstate
         * @param {string} [accessToken]
         */

        /**
         * @event root::launchapp
         * fired whenever the Root thinks the application is ready to start
         */

        /**
         * @event root::loadhostedapp
         * takes care of loading a default hosted app; tries to obtain the app off the hash, then a default to fallback for the first app in the apps collection
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * @event root::reloadapp
         * @param {mh.data.model.Application} app - app to redirect to
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * @event root::setuphostiframe
         * @param {string} iframeId
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * @event auth::gimmeauthtokens
         * fired in order to request the access token and refresh token off the Auth controller
         */

        /**
         * @event root::getcustomhashparam
         * @property {string} param-name
         * this is actually a watched event. it should be fired by the components that need to obtain custom hash params data off this controller
         */

        /**
         * @event root::customhashparam_param-name
         * @param {string} paramValue
         * response event to the watched root::getcustomhashparam; param-name is the actual param-name the caller asked for; param value is sent as a param
         */

        /**
         * @event root::getapps
         * this is actually a watched event. initiates apps retrieval procedure
         * @param {string} customCallback
         * if not empty, the event will reply with root::appsretrieved_customCallback; otherwise with just root::appsretrieved
         * callback customisation is used to provide direct communication between modules. This way other modules will ignore the evt even though in general they support it
         *
         * This event supports tunnelling
         */

        /**
         * @event root::appsretrieved / root::appsretrieved_customCallback
         * @param {mh.data.model.Application[]} apps
         * fired when new apps data is available
         */

        /**
         * @event root::appreloadstart
         * @param {mh.data.model.Application} app
         */

        /**
         * root::watchexternalroutes
         * @param {object} cfg
         * @param {boolean} cfg.host
         * watch host window route changes; advice own changes to host
         * @param {boolean} cfg.hosted
         * watch hosted window route changes; advise own changes to hosted window
         *
         * this is actually a watched event. it should be fired by the components that need to obtain custom hash params data off this controller
         */

        /**
         * root::applyexternalroute
         * @param {string} newRoute
         * fired in order to apply an external route at parent or child level
         */

        /**
         * Id of an iframe that hosts the apps
         * @private
         */
        iframeId: null,

        /**
         * @property {Object}
         * Custom params passed in the hash
         * @private
         */
        customHashParams: null,

        /**
         * @propery {Object} appHashProperties
         * @private
         * hash properties
         *
         * @property {string} appHashProperties.app
         * App name hash prefix; used in the url hash part to specify HOSTED application, that is / to be loaded by a HOST app
         *
         * @property {string} appHashProperties.route
         * the actual app rpute passed between host and hosted
         *
         * @property {string} appHashProperties.accessToken
         * access token as passed to the hosted app
         *
         * @property {string} appHashProperties.refreshToken
         * refresh token as passed to the hosted app
         *
         * @property {string} appHashProperties.suppressAppToolbar
         * suppress app toolbar
         *
         * @property {string} appHashProperties.hosted
         * whether or not the app is actually hosted. MUST be set in order to properly 'inform' the app about the fact it's being hosted, so it can properly handle this info when authenticating for example
         *
         * @property {string} appHashProperties.suppressSplash
         * suppress splash
         */
        appHashProperties: {
            //not used anymore - ap is now in the url as !appNameOrUuid and the route does not have a prefix anymore
            //app: 'a',
            //route: 'r',

            accessToken: 'at',
            refreshToken: 'rt',
            suppressAppToolbar: 'suppress-app-toolbar',
            hosted: 'hosted',
            suppressSplash: 'suppress-splash',
            auth: 'auth',
            initialPassword: 'ip',
            verificationKey: 'vk'
        },

        /**
         * @property
         * @private
         * hash param delimiter - used to split different hash params - for example a:app1;r:some/route
         */
        hashPropertyDelimiter: ';',

        /**
         * @property
         * @private
         * used to separate has property name and value - for example p1:v1
         */
        hashPropertyValueDelimiter: ':',


        /**
         * initializes controller
         */
        init: function(){

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'initialised');
            //</debug>

            this.setUpHashParams();

            this.extractTempParamsFromHash();

            //setup the required evt listeners
            //----------------------------------------------------------------------------------------------------------

            //Root ctlr handles url part param extraction on app launch and can broadcast param values as required
            this.watchGlobal('root::getcustomhashparam', this.onGetCustomHashParam, this);

            //in 'host' mode, whenever a host app is set up, it can ask ROOT to load an appropriate application
            this.watchGlobal('root::loadhostedapp', this.onLoadHostedApp, this);

            //app reload requests watch
            this.watchGlobal('root::reloadapp', this.onAppReload, this);

            //if this is the 'host' app provide functionality for app switching within an iframe. 'host' app just informs about an iframe it uses for app reloading
            this.watchGlobal('root::setuphostiframe', this.onSetupHostIframe, this);

            //whenever user is authenticated or auth changes, do some house keeping works
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticatedResetAppsCache, this);


            //triggers app retrieval
            this.watchGlobal('root::getapps', this.onGetApps, this);

            //if required, turns on xWindow route watch
            this.watchGlobal('root::watchexternalroutes', this.initXWindowRouteWatch, this);
        },

        /**
         * Sets up hash param names, based on the initial config output by the app entry point (aspx, etc)
         */
        setUpHashParams: function(){
            var appHashProperties = this.getMhCfgProperty('appHashProperties'),
                hashPropertyDelimiter = this.getMhCfgProperty('hashPropertyDelimiter'),
                hashPropertyValueDelimiter = this.getMhCfgProperty('hashPropertyValueDelimiter');

            if(appHashProperties){
                //Not used anymore - app ends up in the url as !appNameOrUuid and the actual route does not have the prefix anymore
                // this.appHashProperties.app = appHashProperties.app || this.appHashProperties.app;
                // this.appHashProperties.route = appHashProperties.route || this.appHashProperties.route;

                this.appHashProperties.accessToken = appHashProperties.accessToken || this.appHashProperties.accessToken;
                this.appHashProperties.refreshToken = appHashProperties.refreshToken || this.appHashProperties.refreshToken;
                this.appHashProperties.suppressAppToolbar = appHashProperties.suppressAppToolbar || this.appHashProperties.suppressAppToolbar;
                this.appHashProperties.hosted = appHashProperties.hosted || this.appHashProperties.hosted;
                this.appHashProperties.suppressSplash = appHashProperties.suppressSplash || this.appHashProperties.suppressSplash;
                this.appHashProperties.verificationKey = appHashProperties.verificationKey || this.appHashProperties.verificationKey;
                this.appHashProperties.initialPassword = appHashProperties.initialPassword || this.appHashProperties.initialPassword;
                this.appHashProperties.auth = appHashProperties.auth || this.appHashProperties.auth;
            }

            this.hashPropertyDelimiter = hashPropertyDelimiter || this.hashPropertyDelimiter;
            this.hashPropertyValueDelimiter = hashPropertyValueDelimiter || this.hashPropertyValueDelimiter;
        },

        /**
         * Controller kick in here
         */
        onLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('rot ctrl'), 'launched');
            //</debug>

            //need to check wht to do - basically app may require to start in the activate account mode or pass reset mode.
            //in such case need to poke the auth module to take over from here
            if(this.getCustomHashParam(this.appHashProperties.auth)){
                this.authActionLaunch();
            }
            else {
                this.noAuthActionLaunch();
            }
        },

        /**
         * auth action required app launch
         */
        authActionLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'AUTH ACTION launcher');
            //</debug>

            var action = this.getCustomHashParam(this.appHashProperties.auth),
                evt;
            switch(action){
                case 'activateaccount':
                    evt = 'auth::accountactivated';
                    break;

                case 'resetpass':
                    evt = 'auth::passreset';
                    break;
            }

            //when auth action has been completed, continue with the standard app launch
            if(evt){
                this.watchGlobal(
                    evt,
                    function(){
                        this.noAuthActionLaunch();
                    },
                    this,
                    {single: true}
                );
            }

            this.fireGlobal('auth::authaction', {
                action: action,
                ip: this.getCustomHashParam(this.appHashProperties.initialPassword),
                vk: this.getCustomHashParam(this.appHashProperties.verificationKey)
            });
        },

        /**
         * performs a standard app launch, when no auth action is required
         */
        noAuthActionLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'NO AUTH ACTION launcher');
            //</debug>

            //NOTE:
            //By default, the app entry point does an 'auth preflight' and checks if an app requires authentication. Depending on scenario, this may be
            //hardcoded within an application or worked out dynamically, etc.
            //the key point here is that even if an app that requires auth is allowed to start initially, some very first calls to backend should result in 401 that in
            //return will trigger appropriate authentication procedure.

            var tokens = {
                accessToken: this.getCustomHashParam(this.appHashProperties.accessToken),
                refreshToken: this.getCustomHashParam(this.appHashProperties.refreshToken)
            };

            //decide whether user should be authenticated or not. If so wire an evt listener and let the auth do its work first; if not just launch the app...
            //The prerequisite here is to know what to do in advance. There were no service calls and such yet, so need to depend on whatever has been worked out
            //on the serverside prior to returning the app entry point - default aspx;
            if(this.appRequiresAuth()){
                //and continue with the auth checkups
                this.initPreLaunchAuthentication();
            }
            else {
                //looks like we're good to go, so can trigger the app launch straight away

                //Note:
                //in a case this is false positive no-auth, such app should fail with a very first call to a web service that enforces authorization and in return
                //be kicked with 401.
                //In this scenario an app will trigger auth independently so this is safe to assume app allows anonymous access.

                //<debug>
                console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'Anonymous user allowed - launching the app...');
                //</debug>


                //The application does not require authorisation, but may actually have received authentication information
                //since the user should remain authenticated even though the app does not require auth, need to trigger silent token validation
                tokens.remoteAuthRequired = false;
                this.fireGlobal('auth::verifyauthstate', tokens);

                //obtain client configuration and launch when ready
                this.getUserConfiguration();
            }
        },

        /**
         * initiate pre-launch authentication
         * @param tokens
         */
        initPreLaunchAuthentication: function(tokens){
            if(!tokens){
                tokens = {
                    accessToken: this.getCustomHashParam(this.appHashProperties.accessToken),
                    refreshToken: this.getCustomHashParam(this.appHashProperties.refreshToken)
                };
            }

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'Auth required - passing control to the auth ctrl...');
            //</debug>

            this.watchGlobal('auth::userauthenticated', this.continueAppLaunchWhenUserAuthenticated, this, {single: true});

            //and when ready request the user auth!
            this.fireGlobal('auth::verifyauthstate', tokens);
        },

        /**
         * Checks if an app requires auth; It tries to identify the app through the hash params, url parts or the url the app loads with; the app is then tested against some data
         * collected and returned by the server upon app load (injected into the initial config).
         * If app is recognised incorrectly as not requiring auth, a very call to a secured backend should trigger the authentication procedure anyway
         */
        appRequiresAuth: function(){

            var requiresAuth = false,
                appIdentifiers = this.getMhCfgProperty('authRequiredAppIdentifiers') || [],
                ai = 0, ailen = appIdentifiers.length,

                //initially assume HOST mode, so the app should be specified in the url
                //note app is not in the hash anymore, but in the url now
                //appIdentifier = this.getCustomHashParam(this.appHashProperties.app),
                appIdentifier = this.getUrlAppIdentifier();

            //if an app identifier has been found in the URL this app is a host app
            //a hosted app should really return 404 when app identifier is present in the url.
            //this will allow the host app to start while a hosted app should trigger an auth upon its own launch.
            //when in 'standalone' mode it should seamlessly work too
            if(!appIdentifier){
                appIdentifier = this.standardiseAppIdentifyingUrl(this.getAppIdentifyingUrl());

                //Depending on mode - HOST / HOSTED app is recognised by url or the app id / short name
                for(ai; ai < ailen; ai++){
                    var localIdentifier = appIdentifiers[ai];
                    if(Ext.String.startsWith(localIdentifier, 'http')){
                        localIdentifier = this.standardiseAppIdentifyingUrl(localIdentifier);
                    }
                    if(localIdentifier === appIdentifier){
                        requiresAuth = true;
                        break;
                    }
                }
            }

            return requiresAuth;
        },

        /**
         * Extracts custom params from hash, and reassembles hash back without the custom params
         */
        extractTempParamsFromHash: function(){

            var urlParts = window.location.href.split('#'),
                url = urlParts[0],
                hash = urlParts[1],

                hashParts, hp, hplen, hashPart,
                outHashParts, outHash,

                at, rt, sat, sspl, hosted, auth, vk, ip;

            //only kick in if there was a hash part. otherwise there is no point really ;)
            if(hash){

                outHashParts = [];
                hashParts = hash.split(this.hashPropertyDelimiter);
                hp = 0;
                hplen = hashParts.length;

                at = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.accessToken);
                rt = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.refreshToken);
                sat = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.suppressAppToolbar);
                sspl = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.suppressSplash);
                hosted = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.hosted);
                auth = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.auth);
                vk = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.verificationKey);
                ip = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.initialPassword);


                for(hp; hp < hplen; hp++){

                    hashPart = hashParts[hp];

                    //trim the params that just mess in the toolbar.
                    if(!(
                        Ext.String.startsWith(hashPart, at) || Ext.String.startsWith(hashPart, rt) || Ext.String.startsWith(hashPart, sat) ||
                        Ext.String.startsWith(hashPart, sspl) || Ext.String.startsWith(hashPart, hosted)
                        || Ext.String.startsWith(hashPart, auth) || Ext.String.startsWith(hashPart, vk) || Ext.String.startsWith(hashPart, ip)
                        //pass reset token

                    )){
                        outHashParts.push(hashPart);
                    }

                    //extract all the params, so can consult them later
                    this.extractCustomHashParam(hashPart);
                }

                outHash = outHashParts.join(this.hashPropertyDelimiter);

                if(hash && hash !== outHash){

                    //Note: if there was a #, it must remain, otherwise a browser will trigger a reload, not a simple hash change!
                    //window.location.href = url + '#' + outHash;
                    //note: using history state instead, so history is cleaner
                    history.replaceState(null, window.name, '#' + outHash);

                    //<debug>
                    console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'extracted custom hash params:', this.customHashParams);
                    //</debug>
                }
            }
        },

        /**
         * extracts the custom hash param and saves it into an object - property: value
         * @param input
         */
        extractCustomHashParam: function(input){
            var inputSplit = input.split(this.hashPropertyValueDelimiter);
            if(!this.customHashParams)
            {
                this.customHashParams = {};
            }
            if(inputSplit.length === 2) {
                this.customHashParams[inputSplit[0]] = inputSplit[1];
            }
        },

        /**
         * root::getcustomhashparam callback; responds with root::customhashparam_param-name
         * @param pName - name of a custom param
         * @param tunnel - this event handler supports evt tunneling
         */
        onGetCustomHashParam: function(pName, tunnel){
            this.fireGlobal(this.getTunneledEvtName('root::customhashparam', tunnel), this.getCustomHashParam(pName));
        },

        /**
         * Gets a custom hash param
         * @param pName
         * @returns {*}
         */
        getCustomHashParam: function(pName){
            var ret = null;
            if(this.customHashParams && this.customHashParams[pName]){
                ret = this.customHashParams[pName];
            }
            return ret;
        },

        /**
         * auth::userauthenticated evt listener
         * resets the internal applications cache
         */
        onUserAuthenticatedResetAppsCache: function(){
            //always clean up apps cache. since an auth occurred, all the affected modules that depend on the maps info will also have to reconfigure
            //and they will ask for the apps data. wiped out apps cache results in a data refresh.
            this.apps = null;
        },

        /**
         * auth::userauthenticated evt listener
         * @param accessToken
         */
        continueAppLaunchWhenUserAuthenticated: function(accessToken){
            //Auth controller is responsible for handling the authentication. Whenever auth is happy to go, it fires the auth::userauthenticated event.

            //obtain client configuration and launch when ready
            this.getUserConfiguration(accessToken);
        },


        /**
         * obtains client configuration so an application can be set up properly.
         * on success it should fire root::launchapp via this.fireGlobal('root::launchapp');
         * Note: if an application does not provide configuration, its root controller should overwrite this method and simply fire root::launchapp
         */
        getUserConfiguration: function(accessToken){

            //for the apps that did not trigger the auth procedure auth token is null;
            //just let them fire up straight away
            if(!accessToken){
                this.fireGlobal('root::launchapp');
                return;
            }

            //this will call the app instance to handle the load mask
            this.fireGlobal('root::getuserconfigstart');

            //grab the client cfg
            this.doGet({
                url: this.getApiEndPoint('userConfiguration'),
                scope: this,
                autoHandleExceptions: false,
                success: this.onGetUserConfigurationSuccess,
                failure: this.onGetUserConfigurationFailure
            });
        },

        /**
         * client config retrieved, so now there is time to obtain user organisation ctx
         */
        onGetUserConfigurationSuccess: function(response){
            //since we got here, user orgs context also needs to be ensured.
            //root controller does not need orgs as such, but poking the orgs controller early enough just make the overall app launch flow a bit more concise
            this.watchGlobal(
                'org::context',
                function(orgCtx){
                    //at this stage we're ready to go!

                    //get rid of load mask - app will handle this
                    this.fireGlobal('root::getuserconfigend', response);

                    //proceed with tha app launch
                    this.fireGlobal('root::launchapp', response, orgCtx);
                },
                this,
                { single: true }
            );
            this.fireGlobal('org::getcontext');
        },

        /**
         * client conig failure. Cannot go further unfortunately...
         */
        onGetUserConfigurationFailure: function(response){

            //make sure the failure was not due to false positive no-auth
            //if this is unauthorised just go back one step an init the auth procedure!
            if(response.status === 401){
                this.initPreLaunchAuthentication();
                return;
            }

            //let the application handle the failure visually
            this.fireGlobal('root::getuserconfigfailure');
        },


        /**
         * root::loadhostedapp callback; loads an appropriate hosted app
         */
        onLoadHostedApp: function(){
            //get the apps off the root
            var tunnel = this.getTunnelId();
            this.watchGlobal('root::appsretrieved', this.loadHostedApp, this, {single: true, tunnel: tunnel});
            this.fireGlobal('root::getapps', null, {tunnel: tunnel});
        },

        getHashPropertyNameWithValueDelimiter: function(pName){
            return pName + this.hashPropertyValueDelimiter;
        },

        /**
         * Responsible for loading a hosted application; listens to tunnelled root::appsretrieved
         * @param {mh.data.model.App;lication[]} apps
         * apps available in the environment
         */
        loadHostedApp: function(apps){

            //the thing here is to load an appropriate application:
            //* app can be specified by a shortname or id in the url - !appName
            //* if an app is not specified via hash one of the apps may have a 'isDefault' flag - in such need to pick the first one
            //* if there are no apps with the default flag, then need to pick the first one

            var me = this,

                rawHash = window.location.hash.substring(1),
                //hashparts = rawHash.split(this.hashPropertyDelimiter),
                //h = 0, hlen = hashparts.length,
                //hash,


                app, a = 0, alen = apps.length,
                appToLoad,

                //get org identifier. it may a false positive, but if so it will be validated by a hosted app on load
                org = this.getUrlOrgIdentifier(),

                // //extracts a hash property value off the hash
                // extractHashProp = function(pName){
                //     h = 0;
                //
                //     var ret = null,
                //         pWithDelimiter = me.getHashPropertyNameWithValueDelimiter(pName);
                //
                //     //extract the app identifier off the hash
                //     for(h; h < hlen; h++){
                //         hash = hashparts[h];
                //         if(hash.indexOf(pWithDelimiter) === 0){
                //             ret = hash.replace(pWithDelimiter, '');
                //             break;
                //         }
                //     }
                //     return ret;
                // },
                //
                // appNameOrId = extractHashProp(this.appHashProperties.app);

                appNameOrId = this.getUrlAppIdentifier();

            //search for app by its shortname or uuid
            if(appNameOrId){
                for(a; a < alen; a++){
                    app = apps[a];
                    if(app.get('shortName') === appNameOrId || app.get('uuid') === appNameOrId){

                        //create a clone! do not want to modify the original data!
                        appToLoad = Ext.create(Ext.getClassName(app), app.getData());

                        //since the app has been extracted from hash, it is necessary to pass the hash to the app when loading it
                        //an app will then communicate the hash through postMsg, so it will be possible to update it url bar over here too

                        //grab an url without the hash part (if any)
                        var url = this.pickAppUrl(appToLoad.get('urls').split('|')).split('#')[0],

                            //route hash param contains a route that should be used to load a child with proper context
                            //customHash = this.decodePipedRoute(extractHashProp(this.appHashProperties.route));

                            //Note: app name is now placed in the url and therefore the hash should be exactly the same as the hash of the nested app; if there are other hashparts, then they will usually get removed during the startup
                            customHash =  this.decodePipedRoute(rawHash);

                        //in a case multiple routes are supported - make them pipes, so the ExtJs router can recognised them
                        //they are encoded at the parent (HOST) level, so a host app always deals with single unmatched route!


                        //set the urls property to a single url to an app with the hash extracted from the address bar
                        appToLoad.set(
                            'urls',
                            url + '#' + customHash
                        );

                        break;
                    }
                }
            }

            //isDefault - default application, when there is application context. something like an org dashboard app
            //isHome - home application - the one to start with when there is no organisation context



            //get a default app
            //if no app is present, but there is an organisation token, then need to load org dashboard - org && isDefault
            //otherwise load the 'main' maphive app - !org && isHome
            if(!appToLoad){
                a = 0;
                for(a; a < alen; a++){
                    app = apps[a];
                    if((!org && app.get('isHome')) || (org && app.get('isDefault'))){
                        appToLoad = app;
                        break;
                    }
                }
            }

            //last chance to pick an app...
            //if failed to find the app to load, just pick the first one
            if(!appToLoad){
                appToLoad = apps[0];
            }

            this.fireGlobal('root::reloadapp', appToLoad);
        },

        decodePipedRouteRegex: /___/g,

        encodePipedRouteRegex: /\|/g,

        /**
         * Decodes a piped (multi) route so can use a proper url when redirecting
         * @param route
         */
        decodePipedRoute: function(route){
            route = route || '';
            return route.replace(this.decodePipedRouteRegex, '|');
        },

        /**
         * Encodes a piped (multi) route, so a HOST app can always work with a single route
         * @param route
         */
        encodePipedRoute: function(route){
            return route.replace(this.encodePipedRouteRegex, '___');
        },

        /**
         * root::reloadapp evt listener
         * @param {mh.data.model.Application} app
         */
        onAppReload: function(app){

            if(!app){
                Ext.Msg.show({
                    title: 'BOOOM!!!',
                    message: 'Uuuups, it looks like the environment is somewhat misconfigured - there must at least be one app marked as common in order to use the HOST application',
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });

                return;
            }

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'reloading app', app.getData());
            //</debug>

            //need to obtain the access token first!
            this.watchGlobal('auth::authtokens', this.onAppReloadAuthTokensRetrieved, {self: this, app: app}, {single: true});
            this.fireGlobal('auth::gimmeauthtokens');
        },

        /**
         * picks an app url; prefers a url within the same domain if available
         * @param inUrls
         */
        pickAppUrl: function(inUrls){
            var outUrl,
                hostParts = window.location.host.split('.'),
                domain = (hostParts.length > 2 ? hostParts.splice(hostParts.length - 2) : hostParts).join('.');

            //if the same domain, the prefer it over any other domains...
            Ext.Array.each(inUrls, function(inUrl){
                if(inUrl.indexOf(domain) > -1){
                    outUrl = inUrl;
                    return false;
                }
            });
            return outUrl || inUrls[0];
        },

        /**
         * access token retrieved, so can now continue with the app reload
         * @private
         * @param accessToken
         */
        onAppReloadAuthTokensRetrieved: function(tokens){

            //when params are attached to the url, they need to go before the url part!
            //when apps request reload or redirection, they do not care about any extra setup of course
            //so the urls need to be split and reassembled

            //Note:
            //since the idea is to be able to host external apps too, need to also take care of the params

            var app = this.app,
                self = this.self,
                inUrls = app.get('urls').split('|'),
                //tries to pick a url
                inUrl = self.pickAppUrl(inUrls).split('#'),
                url = inUrl[0],

                //collection of hash parts.
                hash = inUrl[1] ? [inUrl[1]] : [],

                //app hash is used by a host app only
                //note: using history replaceState now, so need a full app url with the appropriate hash
                // appHash =
                //     self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.app) + (app.get('shortName') || app.get('uuid')) +
                //     (hash.length > 0 ? self.hashPropertyDelimiter + self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.route) + inUrl[1] : ''),

                //work out the url the HOST should be updated to - add app name or id (by now it must be known)
                updatedHostUrl = self.updateUrlAppToken(
                    window.location.href.split('#')[0] + (hash.length > 0 ? '#' + inUrl[1] : ''), //hash as defined for the app reloading url
                    app.get('shortName') || app.get('uuid')
                ),

                urlParts = url.split('?'),
                baseUrl = urlParts[0],
                params = urlParts[1] ? urlParts[1].split('&') : [],

                iframe = document.getElementById(self.iframeId),

                useSplashscreen = app.get('useSplashscreen'),

                destinationUrl;

            //Note:
            //in order to keep the url sensible (not so important when working in a frame of course),
            //pass the extra params through the hash. This way they can be extracted and wiped out on app init without
            //having to reload (as would be the case with params of course)

            if(tokens.accessToken){
                hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.accessToken) + tokens.accessToken);
            }
            if(tokens.refreshToken){
                hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.refreshToken) + tokens.refreshToken);
            }

            if(iframe){
                hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.suppressAppToolbar) + 'true');
                hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.hosted) + 'true');

                //use app's splash if required to do so
                //when hosting the apps in an iframe, it is ok to not use the app's splash screen but use own, customised one instead
                //this is the default behavior. An application can be configured to use own splash instead though. In such case use it indeed
                if(!useSplashscreen){
                    hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.suppressSplash) + 'true');
                }
            }

            destinationUrl = baseUrl + (params.length > 0 ? '?' + params.join('&') : '') + (hash.length > 0 ? '#' + hash.join(self.hashPropertyDelimiter) : '') ;

            //get org!!!! -> add it to the hosted app url!!!
            destinationUrl = self.updateUrlOrgToken(destinationUrl, self.getUrlOrgIdentifier());

            //<debug>
            console.warn('updatedHostURL!', updatedHostUrl);
            console.warn('destinationUrl', destinationUrl);
            //</debug>

            if(iframe){
                //we're in HOST mode here

                //app reload is about to start, so fire a app reload evt
                self.fireGlobal('root::appreloadstart', app);

                //also, initiate the reload with a slight timeout, so there is time to kick in with any root::appreloadstart listeners

                //this should just position the callback at the end of the evt queue
                setTimeout(
                    function(){
                        //wipe out the iframe content first
                        iframe.src = 'about:blank'

                        //and load a new app
                        iframe.src = destinationUrl;

                        //update hash - this should set just an app hash at the host level
                        //self.redirectTo(appHash);
                        //note: no more hash redirect, history object instead
                        history.replaceState(null, window.name, updatedHostUrl);
                    },
                    1
                );

            }
            else {
                //just redirecting to a new url, as this is a standalone mode
                window.location.href = destinationUrl;
            }
        },

        /**
         * root::setuphostiframe evt listener; stores a reference to an iframe used by a host app to handle child apps
         * @param iframeId
         */
        onSetupHostIframe: function(iframeId){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'setting iframe: ', iframeId);
            //</debug>

            this.iframeId = iframeId;
        },

        /**
         * root::getapps callback;
         * @param e
         * @param tunnel
         * triggers the procedure of apps retrieval. whenever procedure is finished, the resultset distributed through a root::appsretrieved event
         */
        onGetApps: function(e, tunnel){

            if(this.apps){
                this.fireGlobal(this.getTunneledEvtName('root::appsretrieved', tunnel), this.apps);
                return;
            }

            //expect many potential subsequent requests
            //IMPORTANT - cache the event by the output event name!!!!
            this.bufferCurrentTunnel('root::appsretrieved', tunnel);

            if(this.duringAppsRetrieval){
                return;
            }

            this.duringAppsRetrieval = true;

            this.doGet({
                url: this.getApiEndPoint('userapps'),
                scope: this,
                success: this.onGetAppsSuccess,
                failure: this.onGetAppsFailure
            });
        },

        /**
         * @property {boolean} [duringAppsRetrieval=false]
         * Whether or not the apps retrieval process is in progress; used so potential multiple requests are simply merged into one call
         */
        duringAppsRetrieval: false,


        /**
         * @property {mh.data.model.Application[]} [apps=null]
         * @private
         */
        apps: null,


        /**
         * Apps data load was ok.
         * @param response
         */
        onGetAppsSuccess: function(response){

            var me = this;

            response = response || [];

            this.apps = [];

            Ext.Array.each(response, function(app){
                me.apps.push(Ext.create('mh.data.model.Application', app));
            });

            //waive off app retrieval in progress flag
            this.duringAppsRetrieval = false;

            this.fireForBufferedTunnels('root::appsretrieved', this.apps);
        },

        /**
         * Apps load failed. make sure to fail silently
         */
        onGetAppsFailure: function(){
            throw 'OOOPS, it was not possible to pull the apps. will have to handle this scenario at some point!'
        },

        /**
         * xWindow route watch configuration object as passed through the root::watchexternalroutes event
         * @private
         */
        xWindowRouteWatchCfg: null,

        /**
         * root::watchexternalroutes callback; starts an XFrame Route watch
         * @private
         * @param cfg {Object}
         * @param {boolean} [cfg.host]
         * watch route changes advised through postMessage by a parent window (HOST)
         * @param {boolean} [cfg.hosted]
         * watch route changes advised through postMessage by a child window (HOSTED)
         */
        initXWindowRouteWatch: function(cfg){

            this.xWindowRouteWatchCfg = cfg || {};

            //save the current route, so changes from now on are monitored
            this.lastRoute = this.getOutgoingRoute(window.location.hash.substring(1));

            //monitor all own hash changes
            Ext.util.History.on('change', this.onUnmatchedRoute, this);
            //Note: this kicks in later than the route handlers! This potentially may be a problem! or may be not

            //NOTE: this will never kick in if a route is recognised by any of the controllers! So need think of a better way of auto hash change detection.
            // this.listen({
            //     controller: {
            //         '#': {
            //             unmatchedroute: this.onUnmatchedRoute
            //         }
            //     }
            // });

            //watch events fired by a host or hosted
            this.watchGlobal('root::applyexternalroute', this.onApplyExternalRoute, this);
        },


        /**
         * @property {string} external route being applied. An external route is a a route passed fromanother window. used to check if should skip unmatched route processing
         * @private
         */
        externalRoute: false,

        /**
         * root::applyexternalroute listener. applies new exrternal route
         * @param newRoute
         */
        onApplyExternalRoute: function(newRoute){

            //if this is a host mode, need to update just the route (r:) param!
            //Note: testing for hosted property because hosted means pass xwindow msg to hosted window - this is exactly as in mh.communication.MsgBusEvtOpts
            //and since I am passing to hosted i am a host
            newRoute = this.getIncomingRoute(newRoute);

            if(this.lastRoute !== newRoute){
                this.externalRoute = newRoute;
                this.lastRoute = newRoute;

                //Note: need to use an extra var here, so can ignore external routes in the 'unmatched' routes listener.
                //the point is the router kicks in asynchronously, so changing hash below, even though happens immediately itself, triggers the router callbacks
                //with a slight delay

                window.location.hash = newRoute;
            }

        },

        /**
         * Last collected route
         */
        lastRoute: null,

        /**
         * gets a properly structured incoming route
         * @param route
         */
        getIncomingRoute: function(route){
            //if this is a host mode, need to update just the route (r:) param!
            //Note: testing for hosted property because hosted means pass xwindow msg to hosted window - this is exactly as in mh.communication.MsgBusEvtOpts
            //and since I am passing to hosted i am a host
            if(this.xWindowRouteWatchCfg.hosted){

                //Note: assuming the route is exactly as in hosted app. app name, org name are now stored in the url parts, not in hash; therefore routes are passed 1:1
                // var hashParams = window.location.hash.substring(1).split(this.hashPropertyDelimiter),
                //     hp = 0, hplen = hashParams.length,
                //     pName, hashRouteUpdated;
                //
                // for(hp; hp < hplen; hp++){
                //     pName = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.route);
                //     if(hashParams[hp].indexOf(pName) === 0){
                //         //need to encode the incoming route, so the router at the host level does not kick in multiple times. it must handle the route once only there!
                //         hashParams[hp] = pName + this.encodePipedRoute(route);
                //         hashRouteUpdated = true;
                //         break;
                //     }
                // }
                //
                // if(!hashRouteUpdated){
                //     hashParams.push(this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.route) + this.encodePipedRoute(route));
                // }
                //
                // route = hashParams.join(this.hashPropertyDelimiter);


                route = this.encodePipedRoute(route);
            }

            return route;
        },

        /**
         * Gets outgoing route - extracts it depending on mode (host / hosted)
         * @param route
         * @returns {*}
         */
        getOutgoingRoute: function(route){

            //if this is a host mode, need to extract a route off the hash, as it is under a r: param!
            //Note: testing for hosted property because hosted means pass xwindow msg to hosted window - this is exactly as in mh.communication.MsgBusEvtOpts
            //and since I am passing to hosted i am a host
            if(this.xWindowRouteWatchCfg.hosted){

                //Note: hash now is exactly as understood by an application. so it needs to be passed 1:1 between host and hosted

                // var hashParams = route.split(this.hashPropertyDelimiter),
                //     hashParam,
                //     hp = 0, hplen = hashParams.length,
                //     pName, routeExtracted;
                // for(hp; hp < hplen; hp++){
                //     hashParam = hashParams[hp];
                //     pName = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.route);
                //     if(hashParam.indexOf(pName) === 0){
                //         //this is a parent sending a route to a child. so if a multi route - decode it, so router at child level recognises separate routes
                //         route = this.decodePipedRoute(hashParam.replace(pName, ''));
                //         routeExtracted = true;
                //         break;
                //     }
                // }
                // if(!routeExtracted){
                //     route = '';
                // }

                route = this.decodePipedRoute(route);
            }
            return route;
        },
        
        /**
         * Unmatched / all the routes collector
         * @param hash
         */
        onUnmatchedRoute: function(hash){

            //properly handle EDIT MODE! as a mater of fact - ignore all the changes ;)
            if(this.getModalModeActive()){
                return;
            }

            //Note: router is evt based and kicks in after a hash changes. therefore using internal flags will not work here as they will change back well before
            //router callbacks kick in.
            //because of that, when applying an external route, the incoming route is saved to a var, and then whenever a hash is the same the further processing is ignored
            if(this.externalRoute === hash){
                this.externalRoute = null;
                return;
            }

            //Note:
            //the idea here is to intercept every single route, and fire it either up or down cross window, so parent / child routes can be maintained properly

            //Note: in order to support multiple / piped routes, need to grab the hash off the window.location.hash. This is so the route is complete
            //because the router will fire for each route separately

            var newRoute = this.getOutgoingRoute(window.location.hash.substring(1));

            //Note: at this stage the new route is the actual hash that is to be sent out
            //in a case of a host app, the only part that triggers the communication to child app is the route (r:) part of the full hash
            //
            //application name and any other non-hosted child settings are ignored
            //maybe this will change in the future, for the time being this is not that important really.
            //
            //perhaps could just bring back previous values of non-external hash and ignore the change?


            //Router may kick in for current url part / hash when forced to. need to make sure unchanged routes are not rebroadcasted
            if(this.lastRoute !== newRoute){
                this.lastRoute = newRoute;
                this.fireGlobal('root::applyexternalroute', newRoute, {suppressLocal: true, host: this.xWindowRouteWatchCfg.host, hosted: this.xWindowRouteWatchCfg.hosted});
            }
        }

    });

}());
