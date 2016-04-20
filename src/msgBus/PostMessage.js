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
    Ext.define('mh.msgBus.PostMessage', {

        singleton: true,

        requires: [
            'mh.utils.Generator',
            'mh.util.console.Formatters'
        ],

        mixins: [
            'mh.msgBus.Global'
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
                var evtName = (e.data || {}).eventName || '';

                if(evtName.startsWith('handshake::')){
                    this.onHandShake(e);
                }
                else {
                    //this should be any other evt
                    console.warn('other evt', e.data);


                    //since the evt has been received need to know how to handle it
                    //if this should be broadcasted within the app, between frames, bubbled, drilled
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

                case 'handshake::letmeintroducemyself':

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
         * @param eData
         */
        postMessage: function(eData){

            //if parent and evt configured to go to parent - do so
            //if child, then go to



            //verify where to post it and post!
            //can do the following:
            //post to parent,
            //post to children
            //fire locally

            //need to know where I am and how to handle that!

        }

    });

}());