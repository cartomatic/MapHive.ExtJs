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
            'mh.msgBus.Global',
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
         * @event root:launchapp
         */

        /**
         * initializes controller
         */
        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
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
         * 'auth::userauthenticated' evt listener
         * @param authData
         */
        onUserAuthenticated: function(evtData){
            console.log('User authenticated, can now continue with the app launch!', evtData);

            this.fireGlobal('root::launchapp');
        }
    });

}());