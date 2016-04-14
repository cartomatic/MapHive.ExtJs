//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var logEventsToConsole = true;

    /**
     * Internal msg bus aimed at providing a quick way of subscribing to and notifying events without a need to target specific class instances;
     * It really acts as a facade to Ext.GlobalEvents
     * this class is meant to be used as a mixin
     */
    Ext.define('mh.msgBus.Global', {

        requires: [
            'mh.util.console.Custom'
        ],

        /**
         * fires a global event
         */
        fireGlobal: function(evtName, evtData){

            if(logEventsToConsole){
                //<debug>
                console.warn('[MSG BUS]', evtName, evtData);
                //</debug>
            }

            Ext.GlobalEvents.fireEvent(evtName, evtData);
        },

        /**
         * subscribes to a globally fired event
         * @param {Object} evtName
         * @param {Object} handler
         * @param {Object} [scope]
         * @param {Object} [opts]
         */
        watchGlobal: function(evtName, handler, scope, opts){

            if(logEventsToConsole) {
                //<debug>
                console.warn('[MSG BUS] subscribed', evtName);
                //</debug>
            }

            Ext.on(evtName, handler, scope, opts);
        },

        /**
         * unsubscribes from a globally fired event
         * @param {Object} evtName
         * @param {Object} handler
         * @param {Object} scope
         */
        unwatchGlobal: function(evtName, handler, scope){

            if(logEventsToConsole) {
                //<debug>
                console.warn('[MSG BUS] unsubscribed', evtName);
                //</debug>
            }

            Ext.un(evtName, handler, scope);
        },

        toggleEventLogging: function(state){
            logEventsToConsole = !!state;
        }

    });

}());