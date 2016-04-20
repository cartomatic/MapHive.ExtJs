//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';


    var allowedOrigins = [],

        isOriginAllowed = function(origin){

            //TODO - implement the verification logic!

            return true;
        },

        registeredIframes = {},


        parentOrigin = null,

        parendId = null,

        messageContext = null,

        id;

    //TODO - private var for holding regexes that specify allowed domains. for the time being only maphive.net && maphive.local
    //this should come from the backend. and should be configurable too!

    //store iframes with their origns, so when posting, the comm goes to a proper origin and does not leak!

    /**
     * Provides functionality to communicate through the borders of iframes using postMessage
     */
    Ext.define('mh.communication.MsgBusXFrame', {

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

            //set up msg context, so it is possible to wire the event on / off
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
         * @param evt
         */
        onMessage: function(e){

            if(isOriginAllowed(e.origin)){
                //check the event name to see what to do...
                var eData = (e.data || {}),
                    evtName = eData.eventName || '',
                    allowedBubbleLevels,
                    allowedDrilldownLevels;

                if(evtName.startsWith('handshake::')){
                    this.onHandShake(e);
                }
                else {

                    //first make sure, this event should be handled here!
                    if(eData.initiator !== id && eData.recipient === id){

                        //this should be any other evt
                        console.warn('other evt', eData);

                        //soo, since got here broadcast this event locally
                        //make sure though to not include the eOpts again - they will be used here to decide whether to bubble or drilldown
                        //no point in letting the MsgBus mince it on its own!
                        this.fireGlobal(eData.eventName, eData.data);
                        //Note - potentially should clone the data - the idea though is the listeners do not modify the incoming data

                        //ok. now need to rebroadcast

                        //how many levels is allowed to rebroadcast?
                        allowedBubbleLevels  = (typeof eData.bubble === 'number' ? Math.abs(eData.bubble) : 1);
                        allowedDrilldownLevels  = (typeof eData.drilldown === 'number' ? Math.abs(eData.drilldown) : 1);

                        //FIXME - if broadcasting down - make sure to not broadcast back up again!!! Otherwise, it will just keep on sending same event back and forth!
                        //FIXME - do i need the evt direction to be sure not to go back again??? Think so!!!

                        //TODO - do i need the direction the evt came from?

                        //if bubble && curentLevel < bubbleLvl then post again to parent

                        //if drilldown && currentLevel *-1< drilldownlvl then post to children

                    }
                    

                    //since the evt has been received need to know how to handle it
                    //if this should be broadcasted within the app, between frames, bubbled, drilled

                    //do not send to self - so no matter who was the initiator, make sure the evt is not sent back to sender
                    //this applies to bot parent and children
                }
            }
        },

        /**
         * received a handshake evt
         * @param origin
         * @param data
         */
        onHandShake: function(evt){
            switch(evt.data.eventName){
                case 'handshake::hello':
                    this.onHandshakeHello(evt);
                break;

                case 'handshake::hellothere':
                    this.onHandshakeHelloThere(evt);
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
                console.warn(this.cStdIcon('cancel'), this.cDbgHdr('post msg'), 'Uuups, looks like the ' + e.origin + ' childed has not properly identified itself... further communication will be ignored!');
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
         * handles posting messages to child frames or parent
         * @param {Object} e
         * @param {string} e.eventName
         * original event name
         * @param {Object} e.eData
         * original event data
         * @param {Object} e.eOpts
         * options used to configure the x frame behavior
         * @param {Boolean} e.eOpts.host
         * if being hosted, will post msg to host
         * @param {Boolean} e.eOpts.hosted
         * if hosting, will post msg to hosted
         * @param {Boolean} e.eOpts.bubble
         * just bubble the evt up the host stack
         * @param {Boolean} e.eOpts.drilldown
         * just bubble the evt down the hosted stack
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

            //FIXME - if broadcasting up - make sure to not broadcast back down again!!! Otherwise, it will just keep on sending same event back and forth!


            if(parent && parent !== window){ //mke sure to not send to self...
                //recipient is not that important really as frame can have only one parent!

                //Note: this is important so the incoming events can be always processed the very same way!
                eData.recipient = parendId;

                this.post(parent, parentOrigin, eData);
            }
        },

        /**
         * Posts a msg to registered iframes
         */
        postDown: function(eData){

            eData = eData || {};
            if(typeof eData.currentLvl !== 'number'){
                eData.currentLvl = 0;
            }
            eData.currentLvl --;

            //FIXME - if broadcasting down - make sure to not broadcast back up again!!! Otherwise, it will just keep on sending same event back and forth!


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

                this.post(frame.window, frame.origin, eData);
            }
        },

        /**
         * posts message to specified object, with specified origin and data
         * @param window
         * @param origin - the allowed origin of a recipient
         * @param eData
         */
        post: function(window, origin, eData){
            eData.sender = id;
            eData.initiator = eData.initiator || id;
            window.postMessage(eData, origin);
        }
    });

}());