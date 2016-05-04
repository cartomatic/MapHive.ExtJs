//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var accessToken = null,
        noAuthAllowedAccessToken = 'no-auth-access-allowed',
        offlineAccessToken = 'offline-access-allowed';

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

    /**
         * @event auth::userauthenticated
         * @param {string} accessToken
         * fired whenever user is authenticated
         */

        /**
         * @event auth::accesstoken
         * @param {string} accessToken
         * fired as a response to auth:gimmeaccesstoken
         */

        /**
         * @event auth::authenticateuser
         * @param {string} [accessToken]
         * this is actually a watched event. it should be fired by components that need to trigger the authentication process
         */

        /**
         * @event auth:gimmeaccesstoken
         * this is actually a watched event. it should be fired by the components that need to obtain the access token because of some reason
         */

        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('auth::authenticateuser', this.onAuthenticateUser, this);
            
            this.watchGlobal('auth::xwindowauthenticateuser', this.onXWindowAuthenticateUser, this);
            this.watchGlobal('auth::gimmeaccesstoken', this.onGimmeAccessToken, this);
        },

        // onLaunch: function(){
        //     //<debug>
        //     console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'launched');
        //     //</debug>
        //
        //     //so far nothing to do here
        // },

        /**
         * auth::gimmeaccesstoken callback; fires back auth::accesstoken with the current access token
         */
        onGimmeAccessToken: function(){
            this.fireGlobal('auth::accesstoken', this.getAccessToken());
        },

        /**
         * returns a currently active access token
         */
        getAccessToken: function(){
            return accessToken;
        },

        /**
         * some module requested user authentication
         * @param at
         */
        onAuthenticateUser: function(at){

            //Note - access token is extracted off the hash by the root controller and by default passed here for handling

            //If access token has been provided, it means it should be verified; if ok, user is already authenticated, if not ok, a full auth procedure should kick in
            if(at){

                //depending on scenario, this is to bypass the initial token verification
                if(at === noAuthAllowedAccessToken || at === offlineAccessToken){
                    //good to go,
                    this.broadcastUserAuthenticated(at);
                }
                else {
                    this.doGet({
                        url: this.getApiEndPoint('tokenValidation'),
                        scope: this,
                        params: {
                            accessToken: at
                        },
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

        broadcastUserAuthenticated: function(at){
            this.fireGlobal('auth::userauthenticated', at);
        },

        /**
         * Access token verification success callback
         */
        onAccessTokenVerifySuccess: function(response){
            //auth token must have been ok, so just fire back user authenticated
            //grab the token off the response and broadcast it
            this.broadcastUserAuthenticated(response);
        },

        /**
         * Access token verification failure callback
         */
        onAccessTokenVerifyFailure: function(){
            this.initiateUserAuthProcedure();
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
            this.showLogonUi(
                Ext.bind(function(at){
                    this.broadcastUserAuthenticated(at);
                }, this)
            );
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
            //show logon ui and pass it an appropriate callback
            this.showLogonUi(
                Ext.bind(function(at){
                    this.fireGlobal('auth::xwindowuserauthenticated', at, {suppressLocal: true, hosted: true}); //passing back to a child, so hosted direction only!
                }, this)
            );
        },

        /**
         * Received a response from parent after user has been xwindow authenticated
         * @param e
         */
        onXWindowUserAuthenticated: function(e){

            //TODO - save auth data properly!

            //managed to authenticate in parent, need to distribute the auth info properly
            this.broadcastUserAuthenticated(e);
        },

        /**
         * Shows a logon UI. When user is authenticated, the control is passed back to caller
         * @param {Function} successCallback
         */
        showLogonUi: function(successCallback){
            //Note: Authentication will require some UI. So it is crucial, there is a the same login view entry point for both toolkits. otherwise requires will cause problems!

            //this.getAuthUi().showLogonView(successCallback);

            successCallback('some-token');
        },

        /**
         * @property {mh.module.auth.Auth}
         * @private
         */
        authUi: null,

        /**
         * Gets an instance of auth UI
         * @returns {null}
         */
        getAuthUi: function(){
            if(!this.authUi){
                this.authUi = Ext.create('mh.module.auth.Auth');
            }
            return this.authUi;
        }
    });

}());