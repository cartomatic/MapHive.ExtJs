//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var initialCfg = null,
        staticInstance = null,

        getStaticInstance = function(){
            if(!staticInstance){
                staticInstance = Ext.create('mh.mixin.InitialCfg');
            }
            return staticInstance;
        };

    /**
     * Meant to be used as a mixin. Provides a unified way of accessing the initial configuration settings output on app load into global scope;
     * mh.data.InitialCfg is the expected model of the cfg.
     */
    Ext.define('mh.mixin.InitialCfg', {

        statics: {
            setMhCfgProperty: function(pName, pValue){
                getStaticInstance().setMhCfgProperty(pName, pValue);
            }
        },

        /**
         * Gets a config property off the initial mh cfg
         * @param pName
         * @returns {*|null}
         */
        getMhCfgProperty: function(pName){
            if(!initialCfg){
                this.extractInitialmhCfg();
            }

            return initialCfg[pName] || null;
        },

        /**
         * sets a mh cfg property - comes in handy when no mh backend is present and some vars should be set in order allow mh components work as expected
         * @param pName
         * @returns {*|null}
         */
        setMhCfgProperty: function(pName, pValue){
            initialCfg = initialCfg || {};
            initialCfg[pName] = pValue;
        },

        /**
         * Extracts the initial MH cfg of the global scope
         */
        extractInitialmhCfg: function () {
            if(typeof __mhcfg__ !== 'undefined'){
                initialCfg = Ext.clone(__mhcfg__);
            }
            else {
                initialCfg = {};
            }
        }
    });

}());