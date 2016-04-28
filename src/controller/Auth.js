//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Responsible for handling the uer authentication related functionality. The UI is toolkit specific; this controller uses the default modules
     */
    Ext.define('mh.controller.Auth', {
        extend: 'Ext.app.Controller',

        mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters'
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
         * @event auth:gimmeaccesstoken
         * this is actually a watched event. it should be fired by the components that need to obtain the access token because of some reason
         */

        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('root::authenticateuser', this.onAuthenticateUser, this);
            this.watchGlobal('auth::xwindowauthenticateuser', this.onXWindowAuthenticateUser, this);
            this.watchGlobal('auth::gimmeaccesstoken', this.onGimmeAccessToken, this);
        },

        onLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'launched');
            //</debug>

            //so far nothing to do here
        },

        onGimmeAccessToken: function(){
            //TODO - local access token storag needed!!!

            this.fireGlobal('auth::accesstoken', this.getAccessToken());
        },

        /**
         * returns a currently active access token
         */
        getAccessToken: function(){
            return this.accessToken || 'no-auth';
        },

        /**
         * some module requested user authentication
         * @param e
         */
        onAuthenticateUser: function(e, tunnel){

            //extract the access token and verify it. If ok, then just fire authenticated
            //if not ok trigger the auth UI

            //need to have own access token storage, so once retrieved it is kept here for further reference


            //TODO - extract the access token off the url and verify it by poking the backend. There should be a simple endpoint to do just that! If ok, then user is authenticated; otherwise check if the current scenario requires authentication - host needs to know what to load, hosted needs to know if it requires auth! In a case of a hosted app it should be easy, but can try to make it generic too. Also when hosted, need to fire evt to a parent that auth is required

            //Note - access token is extracted off the hash by the root controller. Need to extract it



            //TODO - potential customisation needed for the offline scenario - but in this case the GeoFutura.Gpr may well customise the auth controller

            //TODO - make sure to obtain the refresh token too. all the usual stuff that will be required to handle session properly!

            console.log('Faking authentication...');

            //Note:
            //Authentication will require some UI. So it is crucial, there is a the same login view entry point for both toolkits.
            //otherwise requires will cause problems!

            //TODO - maybe some logic should be done on the serverside in the aspx entry point???
            //TODO - Basically if user specifies an app he wants to use it is necessary to know if this app requires authentication. If so, the module will have to trigger auth
            //TODO - but if not, the app can let user in as an anonymous user

            //Note: for anonymous users just return null as an access token.



            //----------------------------------

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

            //TODO - init auth UI, and pass it a callback, or subscrbe to evts, so can handle auth results back in proper methods. Same approach will be required for x window, so at least this part will be generic.

            var at = 'some-locally-obtained-access-token';

            //TODO - finall just pass the access token
            this.fireGlobal('auth::userauthenticated', at);
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
        onXWindowAuthenticateUser: function(e, tunnel){

            //TODO - init auth UI, and pass it a callback or subscribe to its events, so when authenticated, can process the auth data and pass it back to a child

            var at = 'some-parent-obtained-auth-access-token-dude';

            this.fireGlobal('auth::xwindowuserauthenticated', at, {suppressLocal: true, hosted: true}); //passinbg back to a child, so hosted direction only!
        },

        /**
         * Received a response from parent after user has been xwindow authenticated
         * @param e
         */
        onXWindowUserAuthenticated: function(e){

            //TODO - save auth data properly!

            //managed to authenticate in parent, need to distribute the auth info properly
            this.fireGlobal('auth::userauthenticated', e);
        }
    });

}());