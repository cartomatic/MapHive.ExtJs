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
            'mh.util.console.Formatters'
        ],

        requires: [
            'Ext.app.Application',
            'mh.AppLauncher'
        ],

        /**
         * @event root::authenticateuser
         */

        /**
         * @event root::launchapp
         * fired whenever the application is ready to start
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
         */

        /**
         * @event root::appsretrieved
         * @param {mh.data.model.Application[]} apps
         * fired when new apps data is available
         */

        /**
         * @event root::appreloadstart
         * @param {mh.data.model.Application} app
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
         * initializes controller
         */
        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'initialised');
            //</debug>

            this.extractTempParamsFromHash();

            //setup the required evt listeners
            this.watchGlobal('root::getcustomhashparam', this.onGetCustomHashParam, this);

            this.watchGlobal('root::reloadapp', this.onAppReload, this);
            this.watchGlobal('root::setuphostiframe', this.onSetupHostIframe, this);

            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this, {single: true});
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
         * Extracts custom params from hash, and reassembles it
         */
        extractTempParamsFromHash: function(){

            var urlParts = window.location.href.split('#'),
                url = urlParts[0],
                hash = urlParts[1],

                hashParts, hp, hplen, hashPart,
                outHashParts, outHash;

            //only kick in if there was a hash part. otherwise there is no point really ;)
            if(hash){

                outHashParts = [];
                hashParts = hash.split('|');
                hp = 0;
                hplen = hashParts.length;


                for(hp; hp < hplen; hp++){

                    hashPart = hashParts[hp];

                    if(hashPart.startsWith('at:') || hashPart.startsWith('suppress-app-toolbar:') || hashPart.startsWith('suppress-splash:')){
                        this.extractCustomHashParam(hashPart);
                    }
                    else {
                        outHashParts.push(hashPart);
                    }
                }

                outHash = outHashParts.join('|');

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
            var inputSplit = input.split(':');
            if(!this.customHashParams)
            {
                this.customHashParams = {};
            }
            this.customHashParams[inputSplit[0]] = inputSplit[1];
        },

        /**
         * root::getcustomhashparam callback; responds with root::customhashparam_param-name
         * @param pName - name of a custom param
         */
        onGetCustomHashParam: function(pName){
            var ret = null;
            if(this.customHashParams && this.customHashParams[pName]){
                ret = this.customHashParams[pName];
            }
            this.fireGlobal('root::customhashparam_' + pName, ret);
        },

        /**
         * 'auth::userauthenticated' evt listener
         * @param authData
         */
        onUserAuthenticated: function(evtData){
            //Auth controller is responsible for handling the authentication. Whenever auth is happy to go fires the auth::userauthenticated event.
            //depending on the setup a user may have already been authenticated but it also can be an anonymous user.
            //the trick here is to p=take the appropriate actions depending on the scenario - authenticated / anonymous

            //if anonymous just pull public apps

            //if authenticated, will need to pull organisations first
            //Note: so far it seems that obtaining a list of orgs in the Root is sensible. Auth should only handle auth related stuff
            //when organisations are available then user is prompted to choose his scope and then the apps get pulled.
            //when apps are available it is time to start!


            this.fireGlobal('root::launchapp');
        },

        //----------------------------------------
        /**
         * Retrieves the available apps info for the current context. Context is a combination of an access token (a user pretty much) and an organisation a user has chosen to use as a context for the current session
         */
        getAppsInfo: function(){

            this.doGet({
                url: this.getView().getApi().apps || 'dummy.url', //so Ext.Ajax does not throw...
                scope: this,
                success: this.onGetAppsSuccess,
                failure: this.onGetAppsFailure

                //errs will be auto ignored
            });
        },

        /**
         * Apps data load was ok.
         * @param response
         */
        onGetAppsSuccess: function(response){


        },

        /**
         * Apps load failed. make sure to fail silently
         */
        onGetAppsFailure: function(){
            //make it silent...

            //since it was not possible to get the apps info, make sure to hide the btn
            this.getView().hide();
        },


        //----------------------------------------



        /**
         * root::reloadapp evt listener
         * @param {mh.data.model.Application} app
         */
        onAppReload: function(app){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'reloading app', app.getData());
            //</debug>

            //Depending on the scenario - hosted app vs host app the appropriate action must be performed.
            //In a case this is a host app, the chosen child app needs to be loaded in an iframe
            //
            //In a case this is a hosted app, it is necessary to reload window with a new app's url
            //
            //In both scenarios, the access token needs to be appended to the loaded url.

            //Also, if this is the host application, fire a global mask

            //TODO - when this is a host app, current app should be shown in the app route!

            //need to obtain the access token first!
            this.watchGlobal('auth:accesstoken', this.onAppReloadAccessTokenRetrieved, {self: this, app: app}, {single: true});
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
                inUrl = app.get('url').split('#'),
                url = inUrl[0],
                hash = inUrl[1] ? [inUrl[1]] : [],
                urlParts = url.split('?'),
                baseUrl = urlParts[0],
                params = urlParts[1] ? urlParts[1].split('&') : [],


                iframe = document.getElementById(this.self.iframeId),

                useSplashscreen = app.get('useSplashscreen'),

                destinationUrl;

            //Note:
            //in order to keep the url sensible (not so important when working in a frame of course),
            //pass the extra params through the hash. This way they can be extracted and wiped out on app init without
            //having to reload (as would be the case with params of course)

            // params.push('at=' + accessToken);
            // params.push('suppress-app-toolbar=true');
            // params.push('suppress-splash=true');

            hash.push('at:' + accessToken);
            if(iframe){
                hash.push('suppress-app-toolbar:true');

                //use app's splash if required to do so
                //when hosting the apps in an iframe, it is ok to not use the app's splash screen but use own, customised one instead
                //this is the default behavior. An application can be configured to use own splash instead though. In such case use it indeed
                if(!useSplashscreen){
                    hash.push('suppress-splash:true');
                }

            }

            destinationUrl = baseUrl + '?' + (params.length > 0 ? params.join('&') : '') + (hash.length > 0 ? '#' + hash.join('|') : '') ;

            if(iframe){

                //app reload is about to start, so fire a app reload evt
                this.fireGlobal('root::appreloadstart', app);

                //also, initiate the reload with a slight timeout, so there is time to kick in with any root::appreloadstart listeners

                //this should just position the callback at the end of the evt queue
                setTimeout(
                    function(){
                        //wipe out the iframe content first
                        iframe.src = 'about:blank'

                        //and load a new app
                        iframe.src = destinationUrl;
                    },
                    1
                );

            }
            else {
                window.location.href = destinationUrl;
            }
        },

        /**
         * root::setuphostiframe evt listener
         * @param iframeId
         */
        onSetupHostIframe: function(iframeId){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'setting iframe: ', iframeId);
            //</debug>

            this.iframeId = iframeId;
        }
    });

}());