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
        'mh.dummy.AppLauncher',
        'mh.ApplicationLocalisation'
    ],

    mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters',
            'mh.mixin.Localisation'
        ],

        //global shared controllers - they fire up automatically
        controllers: [
            'mh.controller.Root',
            'mh.controller.Auth',
            'mh.controller.Organisation',
            'mh.controller.Splash'
        ],

        //global / shared stores
        stores: [
        ],

        //app's default route. if no alternative route is provided
        //this becomes the active route upon start
        //defaultToken : 'dashboard',

        /**
         * The app launcher class that is initiated automatically after receiving a root::launchapp event
         * Ususally responsible for creating application views
         * Customise to provide own app launcher entry point, as the default is a dummy one firing up an example app
         * In addition, to customise auto launch behavior override the onLaunchApp method
         */
        appLauncher: 'mh.dummy.AppLauncher',

        /**
         * @event mhapp::loaded
         * fired whenever the configured AppLauncher has been Ext.create'd
         */

        initialHash: null,

        init: function(){

            //save initial hash, so can re-fire hash change if it is modified in the meantime.
            //this is needed so the router kicks in as expected
            this.initialHash = window.location.hash;

            mh.util.console.Custom.setAppName(this.getName());

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('app'),'initialised');
            //</debug>

            //wire up some generic event listeners!
            this.watchGlobal('root::launchapp', this.onLaunchApp, this, {single: true});
            this.watchGlobal('root::getuserconfigstart', this.onGetUserConfigStart, this);
            this.watchGlobal('root::getuserconfigend', this.onGetUserConfigEnd, this);
            this.watchGlobal('root::getuserconfigfailure', this.onGetUserConfigFailure, this);
        },

        //app launch not used. need to wait until root configures all the mess that is required
        // launch: function () {
        //     //<debug>
        //     console.log(this.cStdIcon('info'), this.cDbgHdr('app'),'launched');
        //     //</debug>
        // },

        /**
         * root::launchapp callback;
         * called whenever root controller finishes whatever needs to be done prior to launching the actual app
         * Launches the application launcher class
         * @param cfg
         * @param cfg.userConfig
         * @param cfg.orgCtx
         */
        onLaunchApp: function(cfg){

            //hide the splash screen; do it early, so it starts fading out as the app UI builds.
            //perhaps should move it to onAppLaunch?
            this.fireGlobal('splash::hide');

            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('app'),'onLaunchApp');
            //</debug>

            //need to wave off host loadmask if any
            this.fireGlobal('mhapp::hidehostmask', null, {host:true, suppressLocal: true});

            cfg = cfg || {};

            this.internalAppLaunch(cfg);
        },

        /**
         * internal app launch; this is the actual default app launch for the apps that do depend on the org context
         * at this stage the application should be properly scoped
         * @param cfg
         * @param cfg.userConfig
         * @param cfg.orgCtx
         */
        internalAppLaunch: function(cfg){

            //Note:
            //In the generic code cannot require modules that are toolkit specific!
            //This is important as if some toolkit specific requires make to the generic code,
            //the sencha app will not be able to either refresh or build the application.

            //Note:
            //Two global controllers perform the initial setup: Root & Auth. The main actor is the Root controller - see the code to see
            //how it interacts with the Auth controller.
            //when they both manage to authenticate user and obtain client config the control is passed here via root::launchapp event.


            //Note:
            //Both toolkits need a main view. So this is crucial each toolkit has the same entry point!
            //in this case though, the GUI creation is delegated to toolkit specific code, not directly created here
            Ext.create(this.appLauncher);
            //TODO - make sure the existing class exists. should be just a matter of testing the namespaces. In dev mode ExtJs will of course pull all the refs, but when built a ref in such cese may be missing. Making sure the class has been required at this stage is a good approach.

            if(this.initialHash !== window.location.hash){
                this.redirectTo(window.location.hash.replace('#', ''), true);
            }


            //finally broadcast app loaded evt both locally and to the host if any
            //fire mhapp::loaded - make sure to fire it xwindow to parent if any
            //this should nicely wave off the host load mask if in hosted mode
            this.fireGlobal('mhapp::loaded', null, {host:true});
        },

        /**
         * root::getuserconfigstart handler
         */
        onGetUserConfigStart: function(){
            Ext.getBody().mask(this.getTranslation('getClientCfgLoadMask'));
        },

        /**
         * root::getuserconfigend handler
         */
        onGetUserConfigEnd: function(){
            Ext.getBody().unmask();
        },

        onGetUserConfigFailure: function(){
            Ext.getBody().unmask();
            this.fireGlobal('splash::hide');

            //<debug>
            console.warn(this.cStdIcon('exclamation'), this.cDbgHdr('app cfg'),'Failed to retrieve the user config. You need to either - provide the api backend with cfg endpoint or overwrite the Root.getUserConfiguration');
            //</debug>

            Ext.Msg.show({
                title: this.getTranslation('userCfgFailureTitle'),
                message: this.getTranslation('userCfgFailureMsg'),
                width: 500,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING,
                fn: function(){
                    window.location.reload();
                }
            });
        }
    });
}());
