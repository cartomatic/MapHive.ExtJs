//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Controls the app reloading
     */
    Ext.define('mh.controller.AppReloader', {

        extend: 'Ext.app.Controller',

        mixins: [
            'mh.msgBus.Global',
            'mh.util.console.Formatters'
        ],

        requires: [
        ],

        /**
         * @event apploader::reloadapp
         * @param {string} url - url to redirect to
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * @event apploader::setupiframe
         * @param {string} iframeId
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * initializes controller
         */
        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('apploader::reloadapp', this.onAppReload, this);
            this.watchGlobal('apploader::setupiframe', this.onSetupIframe, this);
        },

        onLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'launched');
            //</debug>
        },

        /**
         * apploader::reloadapp evt listener
         * @param url
         */
        onAppReload: function(url){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'reloading app', url);
            //</debug>

            //Depending on the scenario - hosted app vs host app the appropriate action must be performed.
            //In a case this is a host app, the chosen child app needs to be loaded in an iframe
            //
            //In a case this is a hosted app, it is necessary to reload window with a new app's url
            //
            //In both scenarios, the access token needs to be appended to the loaded url.

        },

        /**
         * apploader::setupiframe evt listener
         * @param iframeId
         */
        onSetupIframe: function(iframeId){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'setting iframe: ', iframeId);
            //</debug>


        }
    });

}());