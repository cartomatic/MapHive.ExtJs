//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Meant to be used as a mixin
     */
    Ext.define('mh.mixin.PublishApi', {
        /**
         * @param {string[]} arguments
         * publishes ViewController API, so it is accessible from a View level
         */
        publishApi: function(){
            var apis = Ext.isArray(arguments[0]) ? arguments[0] : arguments,
                view = this.getView(),
                method,
                a = 0, alen = apis.length;

            for(a; a < alen; a++){
                method = apis[a];

                if(!view[method] && Ext.isFunction(this[method])){
                    view[method] = Ext.bind(this[method], this);
                }
            }
        }
    });

}());