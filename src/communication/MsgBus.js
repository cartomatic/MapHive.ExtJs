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
    Ext.define('mh.communication.MsgBus', {

        mixins: [
            'mh.util.console.Formatters'
        ],

        evtHdrStyle: '_s::,green,',
        evtNameStyle: '_s::,red,',

        /**
         * fires a global event
         * @param {string} evtName
         * @param {Object} evtData
         * @param {Object} [eOpts]
         * @param {Bool} eOpts.suppressLocal
         */
        fireGlobal: function(evtName, evtData, eOpts){

            if(logEventsToConsole){
                //<debug>
                console.log(this.cStdIcon('evt'), '[MSG BUS]' + this.evtHdrStyle, 'broadcasted', evtName + this.evtNameStyle, 'with the following data;', evtData, 'and opts:', eOpts);
                //</debug>
            }

            //check if the event is not supposed to be suppressed locally
            if(!eOpts || eOpts.suppressLocal !== true){
                //pretend the 'async' behavior. delaying the evt will result in it being queued before firing
                setTimeout(
                    function(){
                        Ext.GlobalEvents.fireEvent(evtName, evtData);
                    },
                    1
                );
            }

            //basically if there are eOpts, at the time being it means, the event should be broadcasted to parent window or to child frames
            //and obviously, the responsibility for handling it is on the MsgBusXFrame class
            if(eOpts){
                setTimeout(
                    function(){
                        Ext.GlobalEvents.fireEvent(
                            'msgbus::postmessage',
                            {
                                eName: evtName,
                                eData: evtData,
                                eOpts: eOpts
                            }
                        );
                    },
                    1
                );
            }
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
                //TODO - get the caller!
                console.log(this.cStdIcon('evt_watch'), '[MSG BUS]' + this.evtHdrStyle, 'subscribed', evtName + this.evtNameStyle);
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
                console.log(this.cStdIcon('evt_unwatch'), '[MSG BUS]' + this.evtHdrStyle, 'unsubscribed', evtName + this.evtNameStyle);
                //</debug>
            }

            Ext.un(evtName, handler, scope);
        },

        toggleEventLogging: function(state){
            logEventsToConsole = !!state;
        }

    });

}());