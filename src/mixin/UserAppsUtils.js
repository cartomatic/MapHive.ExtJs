(function(){
    //Make sure strict mode is on
    'use strict';

        /**
         * the hosted application that is currently loaded.
         */
    var currentApp = null,

        /**
         * @property {Array}
         * Configured applications
         * @private
         */
        apps = null,

        staticInstance = null,

        getStaticInstance = function(){
            if(!staticInstance){
                staticInstance = Ext.create('mh.mixin.UserAppsUtils');
            }
            return staticInstance;
        };

    /**
     * User apps related functionality; intended to be used as a mixin; simplifies obtaining the information on user apps
     * Created by domin on 03.02.2017.
     */
    Ext.define('mh.mixin.UserAppsUtils', {

        requires: [
        ],

        mixins: [
            'mh.mixin.UrlUtils',
            'mh.communication.MsgBus'
        ],

        statics: {
            //triggers get apps procedure
            getApps: function(){
                getStaticInstance().getApps();
            }
        },

        /**
         * Pokes Root Controller to get the apps data! replies via evt callback!
         */
        getApps: function(callback){
            var tunnel = this.getTunnelId();
            this.watchGlobal(
                'root::appsretrieved',
                function(inapps){
                    apps = inapps;
                    if(Ext.isFunction(callback)){
                        callback(apps);
                    }
                    else {
                        //use default callback
                        this.onAppsRetrieved(apps);
                    }
                }, this, {single: true, tunnel: tunnel});

            this.fireGlobal('root::getapps', null, {tunnel: tunnel});
        },

        /**
         * @template
         * @param {mh.data.model.Application[]} apps
         */
        onAppsRetrieved: function(apps){
            //<debug>
            if(Ext.getClassName(this) !== 'mh.mixin.UserAppsUtils'){
                console.warn('UUUUPS, you have not overwritten the mh.mixin.UserAppsUtils.onAppsRetrieved function in ' + Ext.getClassName(this));
            }
            //</debug>
        },

        /**
         * gets a current app
         * @returns {*}
         */
        getCurrentApp: function(){

            if(currentApp){
                return currentApp;
            }

            //looks like no current app is present so either an app has not yet been loaded or this is hosted mode, and need to check the app by url

            var currentUrl = this.standardiseAppIdentifyingUrl(this.getAppIdentifyingUrl()),
            app;

            //search for the appropriate app
            Ext.Array.each(apps, function(a){
                Ext.Array.each(a.get('urls').split('|'), function (url) {
                    if(this.standardiseAppIdentifyingUrl(url.split('#')[0]) === currentUrl){
                        app = a;
                        return false;
                    }
                }, this);

                //if an app has been located then skip the rest
                if(app){
                    return false;
                }
            }, this);

            if(app){
                currentApp = app;
            }

            return app;
        },

        /**
         * gets a isHome app
         */
        getHomeApp: function(){
            var app;
            Ext.Array.each(apps, function(a){
                if(a.get('isHome')){
                    app = a;
                    return false;
                }
            });
            return app;
        }

    }, function(){

        //silly as it may seem, but need msg bus mixed in and need to avoid auto requires via sencha plugin
        var msgBus = 'mh.communication.MsgBus';
        msgBus = Ext.create(msgBus);

        msgBus.watchGlobal('root::appreloadstart', function(app){
            currentApp = app;
        }, this);


        msgBus.watchGlobal('auth::userloggedoff', function(){
            apps = null;
        }, this);


        msgBus.watchGlobal('auth::userauthenticated', function(){
            apps = null;
            //init automated apps retrieval on auth state change
            //when in hosted mode - ignore. parent will usually handle such stuff on its own and no need to repeat when hosted
            var tunnel = msgBus.getTunnelId();
            msgBus.watchGlobal(
                'root::customhashparam',
                function(hosted){
                    if(hosted !== 'true'){
                        mh.mixin.UserAppsUtils.getApps();
                    }
                },
                this,
                {single: true, tunnel: tunnel}
            );
            //custom param receive callback properly set up so just fire evt to get the data back
            msgBus.fireGlobal('root::getcustomhashparam', 'hosted', {tunnel: tunnel});
        }, this);

    });
    
}());