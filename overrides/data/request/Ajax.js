//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.overrides.data.request.Ajax', {
        override: 'Ext.data.request.Ajax',

        statics: {
            /**
             * whether or not outgoing traffic should be compressed
             */
            compressionEnabled: true,

            /**
             * when to compress the output - length tested against outgoing json string
             * basically size of a MTU (max transmission unit) of a tcp packet is 1400 bytes(1.4KB)
             * smaller data chinks will use a packet for transmission anyway, so no point in compressing them.
             * assuming (naively - utf and shit) that one char is ne byte and leaving some space for headers
             */
            lenCutOff: 1024
        },

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        start: function(data) {
            var me = this,
                options = me.options,
                requestOptions = me.requestOptions,
                isXdr = me.isXdr,
                xhr, headers,
                origLen;

            //compress data
            if(data && (me.method === 'PUT' || me.method === 'POST') && data.length > Ext.data.request.Ajax.lenCutOff){

                if(typeof(pako) !== 'undefined' && Ext.data.request.Ajax.compressionEnabled === true){
                    //<debug>
                    console.log('Compressing output...');
                    origLen = data.length;
                    //</debug>

                    data = pako.gzip(data);

                    //<debug>
                    console.log('Orig len: ' + (origLen / 1000).toFixed(1) + 'KB (' + origLen + '); Compressed length: ' + (data.length / 1000).toFixed(1) + 'KB (' + data.length + ')');
                    console.log('Squeezed to ' + Math.round(data.length/origLen * 100) + '% of orig');
                    //</debug>

                    //custom content type, so custom input formatter can kick in and decompress the data...
                    me.headers['Content-Type'] = 'gzip/json';
                }
                else {
                    //<debug>
                    console.log('Pako not found - no compression');
                    //</debug>
                }
            }

            xhr = me.xhr = me.openRequest(options, requestOptions, me.async, me.username, me.password);

            // XDR doesn't support setting any headers
            if (!isXdr) {
                headers = me.setupHeaders(xhr, options, requestOptions.data, requestOptions.params);
            }

            if (me.async) {
                if (!isXdr) {
                    xhr.onreadystatechange = me.bindStateChange();
                }
            }

            if (isXdr) {
                me.processXdrRequest(me, xhr);
            }

            // Parent will set the timeout if needed
            me.callMeParent('start', [data]);
            //me.callParent([data]); //strict mode, huh...

            // start the request!
            xhr.send(data);

            if (!me.async) {
                return me.onComplete();
            }

            return me;
        }
    });
}());
