//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * A set of wrappers around the console object, that simplifies logging customised msgs to the console window.
     * This class takes care of extending the console object, so the logging is done as before and should work without any problems when
     * no customised logging is enabled
     */
    Ext.define('mh.util.console.Custom', {

        singleton: true,

        constructor: function(){

            //Note:
            //since this class is a singleton, it will get initialised before the app init and launch
            //it it therefore safe to do the required modifications here!

            //some IE8 specific stuff for debugging...
            if(Ext.browser.is.IE8){
                console = {
                    warn: Ext.emptyFn,
                    log: Ext.emptyFn,
                    error: Ext.emptyFn
                };
            }

            this.coustomiseConsoleWarn();
            this.customiseConsoleLog();
        },

        /**
         * Customises the console.warn output
         */
        coustomiseConsoleWarn: function(){
            var me = this;
            (function(proxied) {
                console.warn = function() {
                    //proxied.call(this, 'tadam - customised console.warn ;)');

                    return proxied.apply(this, me.prepareArgs(arguments));
                };
            })(console.warn);
        },

        /**
         * Customises the console.log output
         */
        customiseConsoleLog: function(){
            var me = this;
            (function(proxied) {
                console.log = function() {
                    //proxied.call(this, 'tadam - customised console.log ;)');

                    return proxied.apply(this, me.prepareArgs(arguments));
                };
            })(console.log);
        },

        /**
         * prepares the args, so the styling is applied as expected
         * @param args
         * @returns {Array}
         */
        prepareArgs: function(args){

            var newArgs = [];

            for(var a = 0; a < args.length; a++){
                newArgs.push(args[a]);
            }

            return newArgs;
        }
    });

}());