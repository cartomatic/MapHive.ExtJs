//Disable some of the JSLint warnings
/*global console, splash, Ext*/

(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * A generic MapHive app. Wires up the generic Root & Auth controllers.
     * Provides a unified app bootsrapping the MapHive env apps;
     * If you do not require custom setup, then just inherit from this class. It will utilise the default authentication and root controllers that will provide the user sign in functionality
     */
    Ext.define('mh.Application', {
        extend: 'Ext.app.Application',

        name: 'MapHiveHosted',

    requires: [
        'mh.util.console.Custom',
        'mh.communication.MsgBusXWindow',
        'mh.AppLauncher'
    ],

    mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters'
        ],

        //global shared controllers - they fire up automatically
        controllers: [
            'mh.controller.Root',
            'mh.controller.Auth'
        ],

        //global / shared stores
        stores: [
        ],

        //app's default route. if no alternative route is provided
        //this becomes the active route upon start
        defaultToken : 'dashboard',

        /**
         * The app launcher class that is initiated automatically after receiving a root::launchapp event
         * To customise auto launch behavior override the onLaunchApp method
         */
        appLauncher: 'mh.AppLauncher',

        init: function(){

            mh.util.console.Custom.setAppName(this.getName());

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('app'),'initialised');
            //</debug>

            //wire up some generic event listeners!
            this.watchGlobal('root::launchapp', this.onLaunchApp, this, {single: true});
        },

        launch: function () {

            //hide the splash screen; do it early, so it starts fading out as the app UI builds.
            //perhaps should move it to onAppLaunch?
            splash.hide();

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('app'),'launched');
            //</debug>

            //Note:
            //In the generic code cannot require modules that are toolkit specific!
            //This is important as if some toolkit specific requires make to the generic code,
            //the sencha app will not be able to either refresh or build the application.

            //Note:
            //Two global controllers take over from here: Root & Auth. The main actor is the Root controller - see the code to see
            //how it interacts with the Auth controller.
        },

        /**
         * Launches the application launcher class
         */
        onLaunchApp: function(){
            //Note:
            //Both toolkits need a main view. So this is crucial each toolkit has the same entry point!
            //in this case though, the GUI creation is delegated to toolkit specific code, not directly created here
            Ext.create(this.appLauncher);


            //fire mhapp::loaded - make sure though to fire it only UP
            this.fireGlobal('mhapp::loaded', null, {host:true, suppressLocal: true});
        }
    });
}());
