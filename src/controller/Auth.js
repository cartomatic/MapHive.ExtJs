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
         * @param {}
         */

        /**
         * @event auth::accesstoken
         * @param {string} accessToken
         * fired as a response to auth::gimmeaccesstoken
         */

        /**
         * @event auth::gimmeaccesstoken
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

            this.fireGlobal('auth:accesstoken', 'temp-access-token');
        },

        /**
         * some module requested user authentication
         * @param evtData
         */
        onAuthenticateUser: function(evtData){

            //TODO - extract the access token off the url and verify it by poking the backend. There should be a simple endpoint to do just that!
            //TODO - potential customisation needed for the offline scenario - but in this case the GeoFutura.Gpr may well customise the auth controller

            console.log('Received root::authenticateuser evt with the following data: ', evtData);
            console.log('Faking authentication...');

            //Note:
            //Authentication will require some UI. So it is crucial, there is a the same login view entry point for both toolkits.
            //otherwise requires will cause problems!

            var me = this;
            // setTimeout(
            //     function(){
            //         me.fireGlobal('auth::userauthenticated', 'some auth feedback data');
            //     },
            //     1000
            // );
            me.fireGlobal('auth::userauthenticated', {accessToken: 'temp-access-token'});
        }
    });

}());