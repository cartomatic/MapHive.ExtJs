//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Data model of a config output into the global scope on app load; class used for documentation purpose only;
     * See the MapHive.Server.Core.WebClientConfiguration for a reference
     */
    Ext.define('mh.data.InitialCfg', {

        /**
         * @property {string} [mhApiEndPoint]
         * @required
         * The mh API endpoint
         */

        /**
         * @property {string[]} [allowedXWindowMsgBusOrigins]
         */

        /**
         * @property {string[]} [authRequiredAppIdentifiers]
         */

        /**
         * @property {Object} appHashProperties
         * An object representing the hash properties to be recognised by the application
         */

        /**
         * @property {string} hashPropertyDelimiter
         */

        /**
         * @property {stgring} hashPropertyValueDelimiter
         */

        /**
         * @property {Object} [mhApiMap]
         * Customised API map; used in order to override the defaults used by the mh.ExtJs
         */

        /**
         * @property {string} [langCode]
         * LangCode as detected on the serverside
         */

        /**
         * localization {Object} [localization]
         * localization for the application
         */

    });

}());