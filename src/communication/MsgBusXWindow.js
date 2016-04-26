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

            //on app reload start need to do some internal cleanup
            this.watchGlobal('root::appreloadstart', this.onAppReloadStart, this);

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
         * root::appreloadstart callback; need some internal cleanup, so xwindow msg bus does not try to fire events to previously registered iframes / apps
         * this does not seem to be a problem in FF (silently ignored), but chrome complains and throws.
         * Also this is used in the HOST app scenario only.
         */
        onAppReloadStart: function(){
            //wipe out the cache
            registeredIframes = {};
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

                if(Ext.String.startsWith(evtName, 'handshake::')){
                    this.onHandShake(e);
                }
                else {

                    //first make sure, this event should be handled here!
                    if(eData.initiator !== id && eData.recipient === id){

                        //<debug>
                        console.log(this.cStdIcon('evt_xframe'), this.cDbgHdr('post msg'), 'LVL: ' + eData.currentLvl, 'Handling incoming event from: ' + e.origin, eData);
                        //</debug>

                        //soo, since got here broadcast this event locally
                        //make sure though to not include the eOpts again - they will be used here to decide whether to bubble or drilldown
                        //no point in letting the MsgBus mince it on its own!
                        //Note: when event is passed in the umbrella mode, it should not be rebroadcasted locally!
                        if(eData.eOpts.umbrella !== true){
                            this.fireGlobal(eData.eventName, eData.data);
                            //Note - potentially should clone the data - the idea though is the listeners do not modify the incoming data
                        }

                        //ok. now need to rebroadcast

                        //which direction is the event travelling???
                        //this is important, as need to make sure to not bounce back events to the sender, otherwise it would result in an endless process obviously
                        //so basically if the sender is same as parent id the event is traveling down (from parent to nested frames)
                        goingDown = eData.sender === parendId;

                        //how many levels is allowed to rebroadcast? If true all the way up or down,
                        //if false or not a number cut the shit here
                        //if a number then specifies ho far above the evt initiator an evt can travel
                        allowedBubbleLevels  = (typeof eData.eOpts.bubble === 'number' ? Math.abs(eData.eOpts.bubble) : 0);
                        allowedDrilldownLevels  = (typeof eData.eOpts.drilldown === 'number' ? Math.abs(eData.eOpts.drilldown) : 0);

                        if(goingDown){
                            //rebroadcasting to children
                            if(eData.eOpts.drilldown === true || (eData.eOpts.drilldown && Math.abs(eData.currentLvl) < allowedDrilldownLevels)){
                                this.postDown(eData);
                            }

                            //note: obviously umbrella opt does not work when going down
                        }
                        else {
                            //rebroadcasting to parent
                            if(eData.eOpts.bubble === true || (eData.eOpts.bubble && Math.abs(eData.currentLvl) < allowedBubbleLevels)){
                                this.postUp(eData);
                            }

                            //extra case of going up - child sent an event with the 'umbrella flag'
                            //in this case the event DOES need to be bounced back, but only to children other than the sender!
                            //this supports frame to frame communication within a hosting app. so child broadcasts an event to a parent and asks to distribute it
                            //amongst all the other possible children that possibly are around. This way a posting frame does not have to be aware of the other frames,
                            //their urls and such.
                            //It's pretty much a 'fire and forget' approach (as with all the post message variations here):
                            //- just advise own state change and forget about it; if there is any interested party that can digest my event it may reply. If on the other hand
                            //i can digest an event i will kick back in
                            if(eData.eOpts.umbrella === true){

                                //basically the postMessage method responsible for redirecting events should  have cleaned up the options not allowed with the
                                //umbrella mode. It may be the case though, the evt came from an app that has a xWindow msg bus implemented differently.
                                //for such scenario need to wipe out the broadcasting opts, so the event does not travel around in an unpredictable manner
                                delete eData.eOpts.host;
                                delete eData.eOpts.hosted;
                                delete eData.eOpts.umbrella;

                                this.postDown(eData, eData.initiator); //umbrella - do not post to self!
                            }
                        }
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

            if(e.eOpts.umbrella === true){
                //send data to host
                this.postUp(outEvtData);

                //Note: not decided if umbrella mode should be mixed with any other mode at the same time.
                //for the time being, when the event mode is umbrella it is not possible to fire same data to children and parent.
                //one can always fire a couple of events if needed.
                delete e.eOpts.host;
                delete e.eOpts.hosted;
            }

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
                console.log(this.cStdIcon('evt_xframe'), this.cDbgHdr('post msg'), 'LVL: ' + (eData.currentLvl - 1), 'Posting UP to: ' + parentOrigin, eData);
                //</debug>
                this.post(parent, parentOrigin, eData);
            }
        },

        /**
         * Posts a msg to registered iframes
         * @param {mh.communication.PostMessageEvtData'} eData
         * @param {string} [suppressSenderId] id of a window that should not receive the event; used with the umbrella mode to suppress firing events back to evt sender
         */
        postDown: function(eData, suppressSenderId){

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

                //make sure to suppress the postmsg if required
                if(key != suppressSenderId){
                    //Note: this is important so the incoming events can be always processed the very same way!
                    //in this case - if there are a couple of frames, each with the same origin, they will all hear the evt, so by passing the expected recipient
                    //identifier, it is now possible for recipient to verify if it should process the event or ignore it!
                    eData.recipient = key;

                    //<debug>
                    console.log(this.cStdIcon('evt_xframe'), this.cDbgHdr('post msg'), 'LVL: ' + (eData.currentLvl + 1), 'Posting DOWN to: ' + frame.origin, eData);
                    //</debug>
                    this.post(frame.window, frame.origin, eData);
                }
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