//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var authTokens = null;

    /**
     * Responsible for handling the uer authentication related functionality. The UI is toolkit specific; this controller uses the default modules
     */
    Ext.define('mh.controller.Auth', {
        extend: 'Ext.app.Controller',

        mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters',
            'mh.mixin.ApiMap',
            'mh.data.Ajax'
        ],

    requires: [
        'mh.module.auth.Auth'
    ],

        config: {
            /**
             * @cfg {string} [authUi='mh.module.auth.Auth']
             * Auth UI to be used by the Auth controller. Required to expose some standardised API.
             * See mh.module.auth.Auth for details
             */
            authUi: 'mh.module.auth.Auth'
        },

        /**
         * @property {String} currentAuthMode
         * the mode of the current authentication procedure - either 'local' or 'xwindow'
         * @private
         */
        currentAuthMode: null,

        /**
         * @event auth::authenticateuser
         * @param {Object} e
         * @param {string} e.email
         * @param {string} e.pass
         *
         * this is a watched event
         */

        /**
         * @event auth::userauthenticated
         * @param {string} accessToken
         * fired whenever user is authenticated
         */

        /**
         * @event auth::userauthenticationfailed
         */

        /**
         * @event auth::xwindowauthenticateuser
         * this is both watched and fired event
         */

        /**
         * @event auth::xwindowuserauthenticated
         * this is both watched and fired event
         */

        /**
         * @event auth::resetpass
         * @param {Object} e
         * @param {string} e.email
         *
         * this is a watched event
         */

        /**
         * @event auth::passreset
         */

        /**
         * @event auth::passresetfailed
         */

        /**
         * @event auth:gimmeaccesstoken
         * this is actually a watched event. it should be fired by the components that need to obtain the access token because of some reason
         */

        /**
         * @event auth::authtokens
         * @param {string} accessToken
         * fired as a response to auth:gimmeauthtokens
         */

        /**
         * @event auth::verifyauthstate
         * @param {Object} data
         * @param {string} data.accessToken
         * @param {string} data.refreshToken
         * @param {boolean} [data.remote=true] whether or not token verification should poke the backend; defaults to true; use false when token should not be verified but still passed to all the interested parties
         *
         * this is actually a watched event. it should be fired by components that need to to verify if auth is ok and to trigger the authentication process otherwise
         */


        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('auth::verifyauthstate', this.onVerifyAuthState, this);

            this.watchGlobal('auth::xwindowauthenticateuser', this.onXWindowAuthenticateUser, this);
            this.watchGlobal('auth::gimmeauthtokens', this.onGimmeAuthTokens, this);

            this.watchGlobal('auth::authenticateuser', this.onAuthenticateUser, this);
            this.watchGlobal('auth::resetpass', this.onResetPass, this);


            this.watchGlobal('ajax::unauthorized', this.onAjaxNonAuthorized, this);

        },

        // onLaunch: function(){
        //     //<debug>
        //     console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'launched');
        //     //</debug>
        //
        //     //so far nothing to do here
        // },

        /**
         * Ajax non-authorised callback; provided all the ajax requests are routed via ajax utils, this should intercept 401 and in return display auth window
         */
        onAjaxNonAuthorized: function(){
            //just show the logon screen
            //depending on the scenario - host / vs hosted handle the auth properly!
            this.initiateUserAuthProcedure();
        },

        /**
         * auth::gimmeauthtokens callback; fires back auth::authtokens with the current access token
         */
        onGimmeAuthTokens: function(){
            this.fireGlobal('auth::authtokens', this.getTokens());
        },

        /**
         * returns a currently active access token
         */
        getTokens: function(){
            return {
                accessToken: authTokens ? authTokens.accessToken : null,
                refreshToken: authTokens ? authTokens.refreshToken : null
            };
        },

        /**
         * some module requested user authentication
         * @param at
         */
        onVerifyAuthState: function(data){

            //Note - access token is extracted off the hash by the root controller and by default passed here for handling

            //If access token has been provided, it means it should be verified; if ok, user is already authenticated, if not ok, a full auth procedure should kick in
            //remote token verification procedure can be dismissed, but it must be stated explicitly
            if(data && (data.remoteAuthRequired === false || data.accessToken)){
                //see if the app actually requires auth against auth API...
                //some apps are allowed to work without auth and therefore there is no need to verify the tokens here.
                //if they are ok, then cool, services will pull user specific data, otherwise guest data will be returned
                //
                //then when user switches the app back to an authorisation requiring app, the auth will kick again.
                if(data.remoteAuthRequired === false){
                    //good to go, just let all the interested parties know the user is authenticated
                    this.broadcastUserAuthenticated({accessToken: data.accessToken, refreshToken: data.refreshToken});
                }
                else {
                    //uhuh, got the token, and remote auth has not been explicitly dismissed, so do token verification...
                    this.doGet({
                        url: this.getApiEndPoint('tokenValidation'),
                        scope: {
                            me: this,
                            refreshToken: data.refreshToken
                        },
                        params: {
                            token: data.accessToken
                        },
                        autoHandleExceptions: false,
                        success: this.onAccessTokenVerifySuccess,
                        failure: this.onAccessTokenVerifyFailure
                    });
                }
            }
            else {
                //access token not there, so just trigger the auth procedure
                this.initiateUserAuthProcedure();
            }
        },

        /**
         * Broadcasts the auth::userauthenticated event for the listening modules
         * @param tokens
         */
        broadcastUserAuthenticated: function(tokens){

            authTokens = {
                accessToken: tokens.accessToken,
                accessTokenExpirationTimeUtc: tokens.accessTokenExpirationTimeUtc,
                refreshToken: tokens.refreshToken
            };

            this.fireGlobal('auth::userauthenticated', authTokens.accessToken);
        },

        /**
         * Access token verification success callback
         */
        onAccessTokenVerifySuccess: function(response){
            //auth token must have been ok, so just fire back user authenticated
            //grab the token off the response and broadcast it

            //Note: using complex scope here
            var me = this.me,
                refreshToken = this.refreshToken;

            //Note: this should be the very same object as the one returned from the login method
            me.broadcastUserAuthenticated({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken || refreshToken, //if no refresh token provided, use the one that is likely to have been obtained from the url part.
                accessTokenExpirationTimeUtc: response.accessTokenExpirationTimeUtc
            });
        },

        /**
         * Access token verification failure callback
         */
        onAccessTokenVerifyFailure: function(){
            //Note: using complex scope here
            this.me.initiateUserAuthProcedure();
        },

        /**
         * Initiates user authentication procedure taking care of handling it appropriately - in own window or by delegating it to parent window depending on the app mode - host vs hosted
         */
        initiateUserAuthProcedure: function(){
            //check the mode, the app is running in - if this is a hosted app it should fire a xWindow auth::xwindowauthenticateuser so the parent takes care of
            //handling the auth!!!!
            var me = this,
                tunnel = this.getTunnelId();

            //get the hosted info and trigger the appropriate action
            this.watchGlobal(
                'root::customhashparam',
                function(hosted){
                    if(hosted === 'true'){
                        //this means need delegate the authentication to the parent
                        me.handleAuthXWindow();
                    }
                    else {
                        //can authenticate locally
                        me.handleAuthLocally();
                    }
                },
                this,
                {single: true, tunnel: tunnel}
            );

            //custom param receive callback properly set up so just fire evt to get the data back
            this.fireGlobal('root::getcustomhashparam', 'hosted', {tunnel: tunnel});
        },

        /**
         * Handles auth locally
         */
        handleAuthLocally: function(){
            //show logon ui and pass it an appropriate callback
            this.currentAuthMode = 'local';
            this.showLogonUi();
        },

        /**
         * fires an event to a parent, so it can process the authentication and talk back when ready!
         */
        handleAuthXWindow: function(){
            //soooo.... need to fire a xWindow event. right...

            //btw: since we're communicating x window, likely, there is no point in tunneling the communication ;)
            //This would be a bit complex if there was a reason to tunnel it; not impossible though, but would require a proxy than can sunnel / untunnel the evt ;)

            this.watchGlobal('auth::xwindowuserauthenticated', this.onXWindowUserAuthenticated, this);
            this.fireGlobal('auth::xwindowauthenticateuser', null, {suppressLocal: true, host: true});
        },

        /**
         * Received a request from a hosted app to authenticate a user. when done need to post back to hosted app!
         * @param e
         * @param tunnel
         */
        onXWindowAuthenticateUser: function(e){
            this.currentAuthMode = 'xwindow';
            //show logon ui
            this.showLogonUi();
        },

        /**
         * Received a response from parent after user has been xwindow authenticated
         * @param e
         */
        onXWindowUserAuthenticated: function(e){
            //managed to authenticate in parent, need to distribute the auth info properly
            this.broadcastUserAuthenticated(e);
        },

        /**
         * Shows a logon UI.
         */
        showLogonUi: function(){
            //Note: Authentication controller requires a UI module exposing a standardised API! see mh.module.auth.Auth for details

            //hide splash - this will not cause problems if a splash has already been hidden
            if(typeof(splash) !== 'undefined' && Ext.isFunction(splash.hide)){
                splash.hide();
            }

            //<debug>
            if(true){
                this.getAuthUiInstance().showLogonViewWithAutoLogon('webgistest@emapa.pl', 'test');
            }
            else {
                //</debug>
                this.getAuthUiInstance().showLogonView();
                //<debug>
            }
            //</debug>
        },

        /**
         * Gets an instance of auth UI
         * @returns {null}
         */
        getAuthUiInstance: function(){
            if(!this.getAuthUi()){
                throw 'Auth controller requires the authUI to be properly configured!';
            }

            var authUi = this.getAuthUi();

            if(Ext.isString(authUi)){
                authUi = Ext.create(authUi)
                this.setAuthUi(authUi);
            }
            return authUi;
        },

        /**
         * Authenticates user against the backend
         * @param e
         * @param e.email
         * @param e.pass
         */
        onAuthenticateUser: function(e){
            this.doGet({
                url: this.getApiEndPoint('login'),
                scope: this,
                params: {
                    email: e.email,
                    pass: e.pass
                },
                autoHandleExceptions: false,
                success: this.authenticateUserSuccess,
                failure: this.authenticateUserFailure
            });
        },

        /**
         * User authentication success callback
         * @param response
         */
        authenticateUserSuccess: function(response){

            if(response.success){

                //extract the auth token and refresh token and pass it further
                var tokens = {
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                    accessTokenExpirationTimeUtc: response.accessTokenExpirationTimeUtc
                };

                if(this.currentAuthMode === 'xwindow'){
                    //broadcast locally
                    this.broadcastUserAuthenticated(tokens);
                    //and down to children
                    this.fireGlobal('auth::xwindowuserauthenticated', tokens, {suppressLocal: true, hosted: true}); //passing back to a child, so hosted direction only!
                }
                else {
                    this.broadcastUserAuthenticated(tokens);
                }

                this.currentAuthMode = null;
            }
            else {
                //just pass it to the default failure handler
                this.authenticateUserFailure(response);
            }
        },

        /**
         * user authentication failure callback
         * @param response
         */
        authenticateUserFailure: function(response){
            this.fireGlobal('auth::userauthenticationfailed');
        },

        /**
         * initiates a password reset procedure
         * @param e
         * @param e.email
         */
        onResetPass: function(e){
            this.fireGlobal('auth::passreset');
        },

        onResetPassSuccess: function(e){
            this.fireGlobal('auth::passreset');
        },

        onResetPassFailure: function(e){
            this.fireGlobal('auth::passresetfailed');
        }
    });

}());