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
            this.watchGlobal('root::authenticateuser', this.onAuthenticateUser, this, {single: true});
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

            this.fireGlobal('auth::accesstoken', 'temp-access-token');
        },

        /**
         * some module requested user authentication
         * @param e
         */
        onAuthenticateUser: function(e){

            //TODO - extract the access token off the url and verify it by poking the backend. There should be a simple endpoint to do just that!
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

            this.fireGlobal('auth::userauthenticated', null);
        }
    });

}());