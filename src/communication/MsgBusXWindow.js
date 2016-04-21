//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';


        //TODO - this would really benefit from being dynamically configurable
    var allowedOrigins = ['maphive.local|maphive.net'],

        regex = null,

        isOriginAllowed = function(origin){

            if(!regex) {
                //original regex comes from here: http://stackoverflow.com/questions/17236901/regex-to-validate-a-url-using-a-wildcard, http://www.debuggex.com/r/xOD3eBBPYnQq8Rb9
                //^((\*|[\w\d]+(-[\w\d]+)*)\.)*(example|test)(\.com)$

                //regex needs to be dynamic, so needs to be presented as an escaped string
                var regexBase = '^(http|https)://((\\*|[\\w\\d]+(-[\\w\\d]+)*)\\.)*{DOMAINS}((/|\\?).*)?$',
                    domains = allowedOrigins.join('|'); //the hardcoded part would look like this: (example|test)(\\.com)

                //in this case, domains are provided with the extensions, so there is no cross join form them
                regex = new RegExp(regexBase.replace('{DOMAINS}', domains));

            }

            return regex.test(origin);
        },

        registeredIframes = {},


        parentOrigin = null,

        parendId = null,

        messageContext = null,

        id;

    /**
     * Provides functionality to communicate through the borders of windows / iframes using postMessage
     */
    Ext.define('mh.communication.MsgBusXWindow', {

        singleton: true,

        requires: [
            'mh.utils.Generator',
            'mh.util.console.Formatters'
        ],

        mixins: [
            'mh.communication.MsgBus'
        ],

        /**
         * @property {string[]} allowedOrigins
         * @private
         */

        /**
         * @property {string[]} registeredIframes
         * @private
         * A collection of the iframes registered for cross frame evt broadcasting
         */

        /**
         * @property {string} parentId
         * @private
         */

        /**
         * @property parentOrigin
         * @private
         * Verified parent origin
         */

        /**
         * creates the singleton instance
         */
        constructor: function(){

            //generate own identifier
            id = mh.utils.Generator.getUuid();

            //set up post msg context, so it is possible to wire the event on / off
            messageContext = Ext.bind(this.onMessage, this);

            this.startListening();

            //msg bus will automatically rebroadcast events that are configured properly, and will do it via event of course ;)
            this.watchGlobal('msgbus::postmessage', this.postMessage, this);

            this.doHandshakeHello();
        },

        /**
         * Wires up post msg listener
         */
        startListening: function(){
            //register to postMessage
            if(window.addEventListener){
                window.addEventListener('message', messageContext,false);
            }
            else {
                //this is ie <= 9
                window.attachEvent('onmessage', messageContext);
            }
        },

        /**
         * Removes post message listener
         */
        stopListening: function(){
            //register to postMessage
            if(window.removeEventListener){
                window.removeEventListener('message', messageContext,false);
            }
            else {
                //this is ie <= 9
                window.removeEvent('onmessage', messageContext);
            }
        },

        /**
         * On message listener
         * @param {Object} e
         * incoming postMessage object
         * @param {String} e.origin
         * event origin
         * @param e.data {mh.communication.PostMessageEvtData}
         * DTO used to transfer data cross window
         * @param e.data.eOpts {mh.communication.MsgBusEvtOpts}
         */
        onMessage: function(e){

            if(isOriginAllowed(e.origin)){
                //check the event name to see what to do...
                var eData = (e.data || {}),
                    evtName = eData.eventName || '',
                    allowedBubbleLevels,
                    allowedDrilldownLevels,
                    goingDown = false;

                if(evtName.startsWith('handshake::')){
                    this.onHandShake(e);
                }
                else {

                    //first make sure, this event should be handled here!
                    if(eData.initiator !== id && eData.recipient === id){

                        //<debug>
                        console.log(this.cStdIcon('evt_xframe'), this.cDbgHdr('post msg'), 'Handling incoming event from:', e.origin, eData);
                        //</debug>

                        //soo, since got here broadcast this event locally
                        //make sure though to not include the eOpts again - they will be used here to decide whether to bubble or drilldown
                        //no point in letting the MsgBus mince it on its own!
                        this.fireGlobal(eData.eventName, eData.data);
                        //Note - potentially should clone the data - the idea though is the listeners do not modify the incoming data

                        //ok. now need to rebroadcast

                        //which direction is the event travelling???
                        //this is important, as need to make sure to not bounce back events to the sender, otherwise it would result in an endless process obviously
                        //so basically if the sender is same as parent id the event is traveling down (from parent to nested frames)
                        goingDown = eData.sender === parendId;

                        //how many levels is allowed to rebroadcast? If not specified it just one, so effectively not rebroadcasting further
                        allowedBubbleLevels  = (typeof eData.eOpts.bubble === 'number' ? Math.abs(eData.eOpts.bubble) : 1);
                        allowedDrilldownLevels  = (typeof eData.eOpts.drilldown === 'number' ? Math.abs(eData.eOpts.drilldown) : 1);

                        if(goingDown){
                            //rebroadcasting to children
                            if(eData.eOpts.drilldown && eData.currentLvl < allowedDrilldownLevels){
                                this.postDown(eData);
                            }
                        }
                        else {
                            //rebroadcasting to parent
                            if(eData.eOpts.bubble && eData.currentLvl < allowedBubbleLevels){
                                this.postUp(eData);
                            }
                        }

                        //TODO - also need an option to make the x window msg bus work as an umbrella between frames - this is a scenario, where it should be possible to receive an event from a child (so a UP going event) and rebroadcast it DOWN again, but omitting the event source. This is actually quite important!
                    }
                }
            }
        },

        /**
         * received a handshake evt
         * @param e
         */
        onHandShake: function(e){
            switch(e.data.eventName){
                case 'handshake::hello':
                    this.onHandshakeHello(e);
                break;

                case 'handshake::hellothere':
                    this.onHandshakeHelloThere(e);
                    break;
            }
        },


        /**
         * informs a parent that it is ready to communicate. this method only sends out a 'test' message. The parent is then required to talk back as this is the only way
         * it is possible to verify the parent origin at the child level; if the parent origin is ok, child will then introduce itself with a proper id
         */
        doHandshakeHello: function(){
            //make sure running in a frame
            if(parent && parent !== window){
                //<debug>
                console.log(this.cStdIcon('hello'), this.cDbgHdr('post msg'), 'Handshaking - saying hello to my parent...');
                //</debug>
                //just do a handshake with the parent. this will require the parent to respond. and when the parent responds its origin will be known
                //so basically this way it will never send msg to unknown parent.
                parent.postMessage({eventName: 'handshake::hello', sender: id}, '*');
                //since this is just a handshake, do not restrict origins; in order to finalise the handshake, parent will have to reply and his origin will then be verified
            }
        },

        /**
         * this is the msg sent by a child frame
         * @param e
         */
        onHandshakeHello: function(e){
            //<debug>
            console.log(this.cStdIcon('hello'), this.cDbgHdr('post msg'), 'Heard child saying hello.... child origin: ', e.origin);
            //</debug>

            //make sure sender identifier is specified. no point in caching it otherwise
            if(e.data.sender){
                registeredIframes[e.data.sender] = {
                    origin: e.origin,
                    window: e.source
                };

                //finally just reply back to the child so it knows it is safe to post messages - it verifies the origins too
                e.source.postMessage({eventName: 'handshake::hellothere', sender: id, recipient: e.data.sender}, e.origin);
            }
            //<debug>
            else {
                console.warn(this.cStdIcon('cancel'), this.cDbgHdr('post msg'), 'Uuups, looks like the ' + e.origin + ' child has not properly identified itself... further communication will be ignored!');
            }
            //</debug>

        },


        /**
         * parent window reply
         * @param e
         */
        onHandshakeHelloThere: function(e){
            //<debug>
            console.log(this.cStdIcon('hello'), this.cDbgHdr('post msg'), 'Heard parent replying to my hello....parent origin: ', e.origin);
            //</debug>

            //make sure this is a msg to myself
            if(e.data.recipient === id){
                //can save the parent origin now, as it is verified
                parentOrigin = e.origin;

                parendId = e.data.sender;

                //at this stage I know it is safe to send the data to a parent as it is located within the same domain
                //the fact the parent replied does not add safety, just lets me know there actually is a point in sending data out
            }
        },


        /**
         * msgbus::postmessage callback;
         * msgbus::postmessage is only fired by the mh.communication.MsgBus based on the mh.communication.MsgBusEvtOpts event options supplied;
         * handles posting messages to child frames or parent
         *
         * @param {string} e.eName
         * original event name
         * @param {Object} e.eData
         * original event DTO
         * @param {mh.communication.MsgBusEvtOpts} e.eOpts
         * options used to configure the x frame behavior
         * @param {Boolean} e.eOpts.host
         * @param {Boolean} e.eOpts.hosted
         * @param {Boolean} e.eOpts.bubble
         * @param {Boolean} e.eOpts.drilldown
         *
         * @returns {mh.communication.PostMessageEvtData}
         */
        postMessage: function(e){

            //Out evt data should be of mh.communication.PostMessageEvtData type!
            //Note: initiator, sender, recipient are configured just before posting
            var outEvtData = {
                eventName: e.eName,
                data: e.eData,
                eOpts: e.eOpts
            };

            if(e.eOpts.host === true){
                //send data to host
                this.postUp(outEvtData);
            }

            if(e.eOpts.hosted === true){
                this.postDown(outEvtData);
            }
        },

        /**
         * Posts a msg to parent
         * @param {mh.communication.PostMessageEvtData'} eData
         */
        postUp: function(eData){

            eData = eData || {};
            if(typeof eData.currentLvl !== 'number'){
                eData.currentLvl = 0;
            }
            eData.currentLvl ++;

            if(parentOrigin && parent && parent !== window){ //mke sure to not send to self...
                //recipient is not that important really as frame can have only one parent!

                //Note: this is important so the incoming events can be always processed the very same way!
                eData.recipient = parendId;


                //<debug>
                console.log(this.cStdIcon('evt_xframe'), this.cDbgHdr('post msg'), 'Posting UP to:', parentOrigin, eData);
                //</debug>
                this.post(parent, parentOrigin, eData);
            }
        },

        /**
         * Posts a msg to registered iframes
         * @param {mh.communication.PostMessageEvtData'} eData
         */
        postDown: function(eData){

            eData = eData || {};
            if(typeof eData.currentLvl !== 'number'){
                eData.currentLvl = 0;
            }
            eData.currentLvl --;

            var keys = Ext.Object.getKeys(registeredIframes),
                k = 0, klen = keys.length,
                key, frame;
            for(k; k < klen; k++){
                key = keys[k];
                frame=registeredIframes[key];

                //Note: this is important so the incoming events can be always processed the very same way!
                //in this case - if there are a couple of frames, each with the same origin, they will all hear the evt, so by passing the expected recipient
                //identifier, it is now possible for recipient to verify if it should process the event or ignore it!
                eData.recipient = key;

                //<debug>
                console.log(this.cStdIcon('evt_xframe'), this.cDbgHdr('post msg'), 'Posting DOWN to:', frame.origin, eData);
                //</debug>
                this.post(frame.window, frame.origin, eData);
            }
        },

        /**
         * posts message to specified object, with specified origin and data
         * @param {Object} window
         * @param {string} origin
         * the allowed origin of a recipient
         * @param {mh.communication.PostMessageEvtData} eData
         */
        post: function(window, origin, eData){
            eData.sender = id;
            eData.initiator = eData.initiator || id;
            window.postMessage(eData, origin);
        }
    });

}());