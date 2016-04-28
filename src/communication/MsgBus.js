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
         * @param {Object} [evtData]
         * @param {mh.communication.MsgBusEvtOpts} [eOpts]
         * @param {Bool} [eOpts.suppressLocal]
         */
        fireGlobal: function(evtName, evtData, eOpts){

            if(logEventsToConsole){
                //<debug>
                console.log(this.cStdIcon('evt'), '[MSG BUS]' + this.evtHdrStyle, 'broadcasted', evtName + this.evtNameStyle, 'with the following data;', evtData, 'and opts:', eOpts);
                //</debug>
            }

            eOpts = eOpts ||{};

            //check if the event is not supposed to be suppressed locally
            if(eOpts.suppressLocal !== true){
                //pretend the 'async' behavior. delaying the evt will result in it being queued before firing
                setTimeout(
                    function(){
                        Ext.GlobalEvents.fireEvent(evtName, evtData, eOpts.tunnel);
                    },
                    1
                );
            }

            //basically if there are eOpts, at the time being it means, the event should be broadcasted to parent window or to child frames
            //and obviously, the responsibility for handling it is on the MsgBusXFrame class
            if(eOpts.host || eOpts.hosted || eOpts.umbrella){
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

            evtName = this.getTunneledEvtName(evtName, (opts || {}).tunnel);

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

        /**
         * Toggles MsgBus evts logging on / off
         * @param state
         */
        toggleEventLogging: function(state){
            logEventsToConsole = !!state;
        },

        /**
         * Shortcut to get a unique tunnel identifier
         * @returns {number}
         */
        getTunnelId: function(){
            return (new Date()).getTime();
        },

        /**
         * returns an evt name for the specified tunnel value.
         * @param evtName
         * @param tunnel
         */
        getTunneledEvtName: function(evtName, tunnel){
            return evtName + (tunnel ? '_' + tunnel : '');
        },

        /**
         * evt tunnels buffer
         */
        tunnelsCache: null,

        /**
         * Buffers current tunnels for given evt name
         * @param evtName
         * @param tunnel
         */
        bufferCurrentTunnel: function(evtName, tunnel){
            this.tunnelsCache = this.tunnelsCache || {};

            //make sure to cache the common listener too
            tunnel = tunnel || '____untunnelled____';

            if(tunnel){
                this.tunnelsCache[evtName] = this.tunnelsCache[evtName] || {};
                this.tunnelsCache[evtName][tunnel] = true;
            }
        },

        /**
         * Fires event for buffered tunnels
         * @param evtName
         * @param evtData
         */
        fireForBufferedTunnels: function(evtName, evtData){

            if(this.tunnelsCache && this.tunnelsCache[evtName]){
                var me = this,
                    keys = Ext.Object.getKeys(this.tunnelsCache[evtName]);

                Ext.Array.each(keys, function(key){
                    if(key === '____untunnelled____'){
                        //looks like this was a standard evt, without a tunnel specified
                        //but the handler supports tunneling and therefore called this method
                        me.fireGlobal(evtName, evtData);
                    }
                    else {
                        me.fireGlobal(me.getTunneledEvtName(evtName, key), evtData);
                    }
                });
            }

            delete this.tunnelsCache[evtName];
        }
    });

}());