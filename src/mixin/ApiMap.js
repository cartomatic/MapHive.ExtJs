//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Provides a centralised access point to the API endpoints
     */
    Ext.define('mh.mixin.ApiMap', {

        mixins: [
            'mh.mixin.InitialCfg'
        ],

        //Note: it could be desirable to make it customisable externally...
        apiMap: {
            applications: 'GetApps.json',

            tokenValidation: 'ValidateToken.json'//'auth/tokenvalidation'
        },

        getApiEndPoint: function(endPoint){
            return this.getMhCfgProperty('mhApiEndPoint') + this.apiMap[endPoint];
        }

    });

}());