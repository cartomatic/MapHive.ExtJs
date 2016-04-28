//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var initialCfg = null;

    /**
     * Meant to be used as a mixin. Provides a unified way of accessing the initial configuration settings output on app load into global scope
     */
    Ext.define('mh.mixin.InitialCfg', {

        /**
         * Gets a config property off the initial mh cfg
         * @param pName
         * @returns {*|null}
         */
        getMhCfgProperty: function(pName){
            if(!initialCfg){
                this.extractInitialMhCfg();
            }

            return initialCfg[pName] || null;
        },

        /**
         * Extracts the initial MH cfg of the global scope
         */
        extractInitialMhCfg: function () {
            if(typeof __mhcfg__ !== 'undefined'){
                initialCfg = Ext.clone(__mhcfg__);
            }
            else {
                initialCfg = {};
            }
        }
    });

}());