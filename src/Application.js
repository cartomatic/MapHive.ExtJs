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
            'mh.ApplicationLocalization',
            'mh.module.loadMask.LoadMask'
        ],

        mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters',
            'mh.mixin.Localization',
            'mh.mixin.UrlUtils',
            'mh.mixin.UserAppsUtils',
            'mh.mixin.Clipboard'
        ],

        //global shared controllers - they fire up automatically
        controllers: [
            'mh.controller.Root',
            'mh.controller.Auth',
            'mh.controller.Organization',
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

            this.preLaunchCheckup(cfg);
        },


        /**
         * This is a standard, generic checkup that determines if an org has access to an app and if a user can use an app; This process is the same for all the
         * applications that require authentication
         * Organization owners/admins determine to which apps the access is granted; this is done via roles / teams
         *
         * verifies if a scoped organization has an access to the application and also if a user has been granted an access to this app; if not checks if another user org has an access
         * to the application and if so re-scopes the org silently;
         * for the common/public apps org->app context checkup is irrelevant, but it is important for non common/private apps
         *
         * If a user does not have an org that can access the application, or he is not granted an access to an app, a msg is given and a user is redirected to the home or default app (depending on the auth status)
         * An exemption is the dashboard app - every authenticated user can access it even though it requires authentication
         *
         * If it is possible to find an org-app match for a user, the execution is passed further to the internal app launch.
         * this is then up to an application to check its own user related stuff.
         *
         * Note: Basically, in most cases, apps will use their own user endpoint configs that merge the default mh cfg with whatever app needs
         *
         * Note: if an application does not follow the standard MapHive startup rules with the org<->user<->team relations, simply override this method and make it call this.internalAppLaunch(cfg) instead;
         *
         *
         * @param [cfg]
         * @param cfg.orgCtx
         * @param cfg.userConfig
         * @param cfg.userConfig.user
         * @param cfg.userConfig.orgs
         */
        preLaunchCheckup: function(cfg){

            //Note: cfg is by default pulled for a user. apps that do not require auth do not do so.
            //it is the root that checks app auth requirements on init and decides how to handle it
            if(!cfg){
                this.internalAppLaunch();
                return;
            }


            //cfg contains info on all the orgs that a user has access too
            //each org has the info on the apps it can use
            //each app on the other hand contains information on the access credentials to an app for the user that pulled the config
            //cfg.userConfig.orgs: [] ->
            //  org.applications: [] ->
            //      app.orgUserAppAccessCredentials: {canUseApp: bool, isAppAdmin: bool}

            //basically, when arrived here, the app should have auto contexted itself to an organization: either the one specified in the url
            //or the first one from the received user orgs collection

            //so need to check if the currently contexted organization can use the application and continue with a launch procedure if so
            //if an org does not have the app, the org checkup continues until it finds a very first user org that can actually use the app
            //and silently re-scopes to it
            //
            //if there are no user orgs that can use this application, then well, boom - let the user know there is a problem and reload to a dashboard app.


            //each application may retrieve its config via api that serves more than one app and is not really aware of a calling app
            //therefore need to investigate orgs and their apps and check the app access credentials for the authenticated user
            //app match is done based on the app starting url compared with the app urls

            var me = this,
                orgToken = this.getUrlOrgIdentifier(),

                //see comments in the Root controller @appRequiresAuth
                //for electron scenarios with file based app entry point, need to save successfully validated app identifier
                //as it changes in the meantime, when url gets customised to display some extra data
                appIdentifyingUrl = location.protocol === 'file:'
                    ? this.clipboardGet('app-identifier') || this.standardiseAppIdentifyingUrl(this.getAppIdentifyingUrl())
                    : this.standardiseAppIdentifyingUrl(this.getAppIdentifyingUrl()),
                alternateOrg,
                //gets an org by slug off the cfg
                getOrg = function(slug){
                    var org;
                    Ext.Array.each(cfg.userConfig.orgs, function(o){
                        if(o.slug === slug){
                            org = o;
                            return false;
                        }
                    });
                    return org;
                },
                //checks if an app matches this app (this == the running app)
                appMatches = function(app){
                    var appUrls = app.urls.split('|'),
                        matches = false;
                    Ext.Array.each(appUrls, function(url){
                        if(me.standardiseAppIdentifyingUrl(url) === appIdentifyingUrl){
                            matches = true;
                            return false;
                        }
                    });
                    return matches;
                },
                //whether or not an org can use an app
                orgCanUseApp = function(org){
                    if(!org){
                        return false;
                    }
                    var canUse = false;
                    Ext.Array.each(org.applications, function(app){
                        canUse = appMatches(app) && app.orgUserAppAccessCredentials && (app.orgUserAppAccessCredentials.isAppAdmin || app.orgUserAppAccessCredentials.canUseApp);
                        if(canUse){
                            return false;
                        }
                    });
                    return canUse;
                },

                canStart = orgCanUseApp(getOrg(orgToken));

            if(!canStart){
                //hmm, looks like the initially scoped org does not have the access to this app.
                //grab the first other org where a user can use this application
                Ext.Array.each(cfg.userConfig.orgs, function(org){
                    canStart = orgCanUseApp(org);
                    if(canStart){
                        alternateOrg = org;
                        return false;
                    }
                });
            }

            if(canStart){
                //if an org should be re-scoped do so
                if(alternateOrg){
                    this.fireGlobal('org::changeslug', {
                        slug: alternateOrg.slug,
                        replaceState: true //this will update history state instead of pushing a new entry!
                    });
                }

                //because potentially there was an org change evt, queue the next step, so it nicely fits in when the evts completed.
                Ext.defer(
                    function(){
                        this.internalAppLaunch(cfg);
                    },
                    1, this
                );
            }
            else {
                //looks like user does not have any org contexts valid for this app...
                //give msg and redirect to dashboard
                Ext.Msg.show({
                    title: this.getTranslation('noAppAccessForUserTitle'),
                    message: this.getTranslation('noAppAccessForUserMsg'),
                    width: 500,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING,
                    fn: function(){
                        //TODO - perhaps xwindow too??? for scenarios, where user retrieved an appset and it has changed in the meantime???
                        me.fireGlobal('root::reloadapp', me.getDashboardApp());
                    }
                });
            }
        },

        /**
         * internal app launch; this is the actual default app launch for the apps that do depend on the org context
         * at this stage the application should be properly scoped
         * @param [cfg]
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
            this.fireGlobal('loadmask::show', this.getTranslation('getClientCfgLoadMask'));
        },

        /**
         * root::getuserconfigend handler
         */
        onGetUserConfigEnd: function(){
            this.fireGlobal('loadmask::hide');
        },

        onGetUserConfigFailure: function(){
            this.fireGlobal('loadmask::hide');
            this.fireGlobal('splash::hide');

            //<debug>
            console.warn(this.cStdIcon('exclamation'), this.cDbgHdr('app cfg'),'Failed to retrieve the user config. You need to either - provide the api backend with cfg endpoint or overwrite the Root.getUserConfiguration');
            //</debug>

            Ext.Msg.show({
                title: this.getTranslation('userCfgFailureTitle'),
                message: this.getTranslation('userCfgFailureMsg'),
                width: 500,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                fn: function(){
                    window.location.reload();
                }
            });
        }
    });
}());
