//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
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
            'mh.data.Ajax'
        ],

        requires: [
            'Ext.app.Application',
            'mh.dummy.AppLauncher',
            'mh.data.model.Application'
        ],

        /**
         * @event root::authenticateuser
         */

        /**
         * @event root::launchapp
         * fired whenever the application is ready to start
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
         * @event auth::gimmeaccesstoken
         * fired in order to request the access token off the Auth controller
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
         * root:watchexternalroutes
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
         * @property
         *
         * @private
         */
        appHashPropertyName: 'a',

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
         * @property {string} appHashProperties.suppressAppToolbar
         * suppress app toolbar
         *
         * @property {string} appHashProperties.suppressSplash
         * suppress splash
         */
        appHashProperties: {
            app: 'a',
            route: 'r',
            accessToken: 'at',
            suppressAppToolbar: 'suppress-app-toolbar',
            suppressSplash: 'suppress-splash'
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

            this.extractTempParamsFromHash();

            //setup the required evt listeners
            this.watchGlobal('root::getcustomhashparam', this.onGetCustomHashParam, this);

            this.watchGlobal('root::loadhostedapp', this.onLoadHostedApp, this);

            this.watchGlobal('root::reloadapp', this.onAppReload, this);
            this.watchGlobal('root::setuphostiframe', this.onSetupHostIframe, this);


            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticatedResetAppsCache, this);
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this, {single: true});

            this.watchGlobal('root::getapps', this.onGetApps, this);

            this.watchGlobal('root:watchexternalroutes', this.initXWindowRouteWatch, this);
        },

        onLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('rot ctrl'), 'launched');
            //</debug>

            //do whatever needs to be done...

            //and when ready request the user auth!
            this.fireGlobal('root::authenticateuser');
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

                at, sat, sspl;

            //only kick in if there was a hash part. otherwise there is no point really ;)
            if(hash){

                outHashParts = [];
                hashParts = hash.split(this.hashPropertyDelimiter);
                hp = 0;
                hplen = hashParts.length,

                at = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.accessToken),
                sat = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.suppressAppToolbar),
                sspl = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.suppressSplash);


                for(hp; hp < hplen; hp++){

                    hashPart = hashParts[hp];

                    if(Ext.String.startsWith(hashPart, at) || Ext.String.startsWith(hashPart, sat) || Ext.String.startsWith(hashPart, sspl)){
                        this.extractCustomHashParam(hashPart);
                    }
                    else {
                        outHashParts.push(hashPart);
                    }
                }

                outHash = outHashParts.join(this.hashPropertyDelimiter);

                if(hash && hash !== outHash){

                    //Note: if there was a #, it must remain, otherwise a browser will trigger a reload, not a simple hash change!
                    window.location.href = url + '#' + outHash;

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
            this.customHashParams[inputSplit[0]] = inputSplit[1];
        },

        /**
         * root::getcustomhashparam callback; responds with root::customhashparam_param-name
         * @param pName - name of a custom param
         * @param tunnel - this event handler supports evt tunneling
         */
        onGetCustomHashParam: function(pName, tunnel){
            var ret = null;
            if(this.customHashParams && this.customHashParams[pName]){
                ret = this.customHashParams[pName];
            }
            this.fireGlobal(this.getTunneledEvtName('root::customhashparam', tunnel), ret);
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
        onUserAuthenticated: function(accessToken){
            //Auth controller is responsible for handling the authentication. Whenever auth is happy to go, it fires the auth::userauthenticated event.
            //depending on the setup a user may have already been authenticated but he also can be an anonymous user.
            //the trick here is to take the appropriate actions depending on the scenario - authenticated / anonymous

            //if anonymous just pull public apps

            //if authenticated, will need to pull organisations first
            //Note: so far it seems that obtaining a list of orgs in the Root is sensible. Auth should only handle auth related stuff
            //when organisations are available then user is prompted to choose his scope and then the apps get pulled.
            //when apps are available it is time to start!

            //TODO - maybe some logic should be done on the serverside in the aspx entry point???
            //TODO - since will have to check if user wants a specific app to kick off and verify if ok to run it in anonymous mode, maybe there is a point is dumping public apps info straight to the aspx output??? Dunno, will see!

            if(!accessToken){
                this.handleAnonymousUserStartup();
            }
            else {
                this.handleAuthenticatedUserStartup();
            }
        },



        /**
         * Sets up the application for an anonymous user
         */
        handleAnonymousUserStartup: function(){
            //not much to do really. Since the app has loaded, let it decide what to do now - what data to pull or not to pull and such.
            this.fireGlobal('root::launchapp');
        },

        /**
         * Sets up the application for an authenticated user
         */
        handleAuthenticatedUserStartup: function(){

            //user's identity is verified at this stage (albeit not known yet - only access token is present)
            //because a user can work for different orgs, it is necessary to set up the app for a particular organisation so it works in a precise context
            //the general flow here should therefore be following:
            //1. obtain orgs for a user and if more than 1 as him to pick one; if one, pick it automatically, if none then a user is not yet assigned to an org at all
            //2. when an org is known, pull apps for a user and when ready fire the root::launchapp evt
            //3. app launcher will then take care of loading a default one (whatever the logic behind picking one is) if this is a host app, or will launch the app itself
            //if the app runs in a standalone mode.

            throw "Unauthenticated user setup not implemented yet!";
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
            //* app can be specified by a shortname or id in the hash - this.appHashProperties.app this.hashPropertyValueDelimiter (shortname || uuid);
            //  the default value of the appHashPropertyName is 'a', and hashPropertyValueDelimiter ':' therefore an example of url hash app specifier is a:app_name_or_id;
            //  in this case it is necessary to look the app up
            //* if an app is not specified via hash one of the apps may have a 'isDefault' flag - in such need to pick the first one
            //* if there are no apps with the default flag, then need to pick the first one

            var me = this,

                rawHash = window.location.hash.substring(1),
                hashparts = rawHash.split(this.hashPropertyDelimiter),
                h = 0, hlen = hashparts.length,
                hash,


                app, a = 0, alen = apps.length,
                appToLoad,

                //extracts a hash property value off the hash
                extractHashProp = function(pName){
                    h = 0;

                    var ret = null,
                        pWithDelimiter = me.getHashPropertyNameWithValueDelimiter(pName);

                    //extract the app identifier off the hash
                    for(h; h < hlen; h++){
                        hash = hashparts[h];
                        if(hash.indexOf(pWithDelimiter) === 0){
                            ret = hash.replace(pWithDelimiter, '');
                            break;
                        }
                    }
                    return ret;
                },

                appNameOrId = extractHashProp(this.appHashProperties.app);


            //search for app by its shortname or uuid
            if(appNameOrId){
                for(a; a < alen; a++){
                    app = apps[a];
                    if(app.get('shortName') === appNameOrId || app.get('id') === appNameOrId){

                        //create a clone! do not want to modify the original data!
                        appToLoad = Ext.create(Ext.getClassName(app), app.getData());

                        //since the app has been extracted from hash, it is necessary to pass the hash to the app when loading it
                        //an app will then communicate the hash through postMsg, so it will be possible to update it url bar over here too

                        //grab an url without the hash part (if any)
                        var url = appToLoad.get('url').split('#')[0],

                            //route hash param contains a route that should be used to load a child with proper context
                            customHash = this.decodePipedRoute(extractHashProp(this.appHashProperties.route));

                        //in a case multiple routes are supported - make them pipes, so the ExtJs router can recognised them
                        //they are encoded at the parent (HOST) level, so a host app always deals with single unmatched route!


                        //set the url with the hash extracted from the address bar
                        appToLoad.set(
                            'url',
                            url + '#' + customHash
                        );

                        break;
                    }
                }
            }

            //get a default app
            if(!appToLoad){
                a = 0;
                for(a; a < alen; a++){
                    app = apps[a];
                    if(app.get('isDefault') === true){
                        appToLoad = app;
                        break;
                    }
                }
            }

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
         * Encodes a piepd (multi) route, so a HOST app can always work with a single route
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
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'reloading app', app.getData());
            //</debug>

            //need to obtain the access token first!
            this.watchGlobal('auth::accesstoken', this.onAppReloadAccessTokenRetrieved, {self: this, app: app}, {single: true});
            this.fireGlobal('auth::gimmeaccesstoken');
        },

        /**
         * access token retrieved, so can now continue with the app reload
         * @private
         * @param accessToken
         */
        onAppReloadAccessTokenRetrieved: function(accessToken){


            //when params are attached to the url, they need to go before the url part!
            //when apps request reload or redirection, they do not care about any extra setup of course
            //so the urls need to be split and reassembled

            //Note:
            //since the idea is to be able to host external apps too, need to also take care of the params

            var app = this.app,
                self = this.self,
                inUrl = app.get('url').split('#'),
                url = inUrl[0],
                hash = inUrl[1] ? [inUrl[1]] : [],

                //app hash is used by a host app only
                appHash =
                    self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.app) + (app.get('shortName') || app.get('id')) +
                    (hash.length > 0 ? self.hashPropertyDelimiter + self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.route) + inUrl[1] : ''),

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

            hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.accessToken) + accessToken);
            if(iframe){
                hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.suppressAppToolbar) + 'true');

                //use app's splash if required to do so
                //when hosting the apps in an iframe, it is ok to not use the app's splash screen but use own, customised one instead
                //this is the default behavior. An application can be configured to use own splash instead though. In such case use it indeed
                if(!useSplashscreen){
                    hash.push(self.getHashPropertyNameWithValueDelimiter(self.appHashProperties.suppressSplash) + 'true');
                }
            }

            destinationUrl = baseUrl + (params.length > 0 ? '?' + params.join('&') : '') + (hash.length > 0 ? '#' + hash.join(self.hashPropertyDelimiter) : '') ;

            if(iframe){

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
                        self.redirectTo(appHash);
                    },
                    1
                );

            }
            else {
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
            //IMOPRTANT - cache the event by the output event name!!!!
            this.bufferCurrentTunnel('root::appsretrieved', tunnel);

            if(this.duringAppsRetrieval){
                return;
            }

            this.duringAppsRetrieval = true;


            //TODO - api endpoints / hosts will have to be configurable!!!!
            this.doGet({
                url: 'packages/local/mh/devFakeApi/GetApps.json', //so Ext.Ajax does not throw...
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
         * xWindow route watch configuration object as passed through the root:watchexternalroutes event
         * @private
         */
        xWindowRouteWatchCfg: null,

        /**
         * root:watchexternalroutes callback; starts an XFrame Route watch
         * @private
         * @param cfg {Object}
         * @param {boolean} [cfg.host]
         * watch route changes advised through postMessage by a parent window (HOST)
         * @param {boolean} [cfg.hosted]
         * watch route changes advised through postMessage by a child window (HOSTED)
         */
        initXWindowRouteWatch: function(cfg){

            this.xWindowRouteWatchCfg = cfg || {};

            //monitor all own hash changes
            this.listen({
                controller: {
                    '#': {
                        unmatchedroute: this.onUnmatchedRoute
                    }
                }
            });

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
            if(this.xWindowRouteWatchCfg.hosted){

                var hashParams = window.location.hash.substring(1).split(this.hashPropertyDelimiter),
                    hp = 0, hplen = hashParams.length,
                    pName;

                for(hp; hp < hplen; hp++){
                    pName = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.route);
                    if(hashParams[hp].indexOf(pName) === 0){
                        //need to encode the incoming route, so the router at the host level does not kick in multiple times. it must handle the route once only there!
                        hashParams[hp] = pName + this.encodePipedRoute(newRoute);
                        break;
                    }
                }
                newRoute = hashParams.join(this.hashPropertyDelimiter);
            }

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
         * Unmatched / all the routes collector
         * @param hash
         */
        onUnmatchedRoute: function(hash){

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

            var newRoute = window.location.hash.substring(1);

            //if this is a host mode, need to extract a route off the hash, as it is under a r: param!
            //Note: testing for hosted property because hosted means pass xwindow msg to hosted window - this is exactly as in mh.communication.MsgBusEvtOpts
            //and since I am passing to hosted i am a host
            if(this.xWindowRouteWatchCfg.hosted){
                var hashParams = newRoute.split(this.hashPropertyDelimiter),
                    hashParam,
                    hp = 0, hplen = hashParams.length,
                    pName;
                for(hp; hp < hplen; hp++){
                    hashParam = hashParams[hp];
                    pName = this.getHashPropertyNameWithValueDelimiter(this.appHashProperties.route);
                    if(hashParam.indexOf(pName) === 0){
                        //this is a parent sending a route to a child. so if a multi route - decode it, so router at child level recognises separate routes
                        newRoute = this.decodePipedRoute(hashParam.replace(pName, ''));
                        break;
                    }
                }
            }

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