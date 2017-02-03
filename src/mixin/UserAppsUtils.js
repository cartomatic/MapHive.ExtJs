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
        apps = null;

    /**
     * User apps related functionality; intended to be used as a mixin
     * Created by domin on 03.02.2017.
     */
    Ext.define('mh.mixin.UserAppsUtils', {

        requires: [
            'mh.communication.MsgBus'
        ],

        mixins: [
            'mh.mixin.UrlUtils'
        ],

        /**
         * whether or not the get Apps is currently in progress
         */
        getAppsInProgress: false,

        /**
         * Pokes Root Controller to get the apps data! replies via evt callback!
         */
        getApps: function(){

            if(apps){
                this.onAppsRetrieved(apps);
            }

            if(this.getAppsInProgress){
                return;
            }

            this.getAppsInProgress = true;

            //wire up the root::appsretrieved listener - whenever new apps become available it will be necessary to update the app picker!
            var tunnel = this.getTunnelId();
            this.watchGlobal(
                'root::appsretrieved',
                function(inapps){
                    this.getAppsInProgress = false;
                    apps = inapps;
                    this.onAppsRetrieved(apps);
                }, this, {single: true, tunnel: tunnel});

            this.fireGlobal('root::getapps', null, {tunnel: tunnel});
        },

        /**
         * reloads the apps info
         */
        reloadApps: function(){
            apps = null;
            this.getApps();
        },

        /**
         * @template
         * @param {mh.data.model.Application[]} apps
         */
        onAppsRetrieved: function(apps){
            console.warn('UUUUPS, you have not overwritten the mh.mixin.UserAppsUtils.onAppsRetrieved function in ' + Ext.getClassName(this));
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

            var fixUrl = function(url, decode){
                if(decode)
                {
                    url = decodeURIComponent(url);
                }

                //make sure the last ? and / are removed
                if(Ext.String.endsWith(url, '?')){
                    url = url.substring(0, url.length - 1);
                }
                if(Ext.String.endsWith(url, '/')){
                    url = url.substring(0, url.length - 1);
                }
                return url;
            },

            currentUrl = fixUrl(this.getAppIdentifyingUrl()),
            app;

            //search for the appropriate app
            Ext.Array.each(this.apps, function(a){
                Ext.Array.each(a.get('urls').split('|'), function (url) {

                    if(fixUrl(url.split('#')[0]) === currentUrl){
                        app = a;
                        return false;
                    }
                });

                //if an app has been located then skip the rest
                if(app){
                    return false;
                }
            });

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

        var msgBus = Ext.create('mh.communication.MsgBus');

        msgBus.watchGlobal('root::appreloadstart', function(app){
            currentApp = app;
        }, this);

        msgBus.watchGlobal('auth::userauthenticated', function(){
            apps = null;
        }, this);

    });
    
}());