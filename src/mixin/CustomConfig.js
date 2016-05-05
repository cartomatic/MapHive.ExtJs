//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Meant to be used as a mixin; provides a hook to apply some customisations to an object by configuring it properly.
     */
    Ext.define('mh.mixin.CustomConfig', {

        /**
         * Applies custom View configuration provides as
         *  config: {
         *      'reference|method': valueToBePassed
         *  }
         */
        applyCustomViewConfig: function(){
            var cfg = this.getView().config,
                keys = Ext.Object.getKeys(cfg),
                key, keyValue, keyParts,
                i = 0, len = keys.length,
                ref;

            for(i; i < len; i++){
                key = keys[i];
                keyValue = cfg[key];

                //only consider pipe delimited properties
                if(key.indexOf('|') > -1 && keyValue){

                    keyParts = key.split('|');

                    ref = this.lookupReference(keyParts[0]);

                    //make sure the method exists on an object
                    if(ref && Ext.isFunction(ref[keyParts[1]])){
                        ref[keyParts[1]](keyValue);
                    }
                }
            }
        }
    });

}());