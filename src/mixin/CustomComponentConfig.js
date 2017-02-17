//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Meant to be used as a mixin; provides a hook to apply some customisations to an object by configuring it properly.
     */
    Ext.define('mh.mixin.CustomComponentConfig', {

        /**
         * Applies custom View configuration provides as
         *  config: {
         *      'reference|method': valueToBePassed
         *  }
         */
        applyCustomViewConfig: function(){
            var cfg = this.getView().config,
                key, keyValue, keyParts,
                ref;

            for(key in cfg){
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