//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var data = {};

    /**
     * a simple mixin used to store some data that can be then retrieved by other components. Basically sharing data via events is the way to go, but there are scenarios, when consumers of the data
     * are not instantiated yet, and therefore sometimes it is needed to save the data for later usage
     */
    Ext.define('mh.mixin.Clipboard', {
        mixins: [
            'mh.communication.MsgBus'
        ],

        /**
         * sets a clipboard value
         * @param pName
         * @param pValue
         */
        clipboardSet: function(pName, pValue){
            data[pName] = pValue;
            this.fireGlobal('clipboard::set',{props: [pName]});
        },

        /**
         * sets clipboard values in a bulk manner
         * @param obj
         */
        clipboardBulkSet: function(obj){
            var keys = Ext.Object.getKeys(obj);
            Ext.Array.each(keys, function(k){
                data[k] = obj[k];
            });
            this.fireGlobal('clipboard::set',{props: keys});
        },

        /**
         * reads a param value off the clipboard
         * @param pName
         * @returns {*}
         */
        clipboardGet: function(pName){
            return data[pName];
        },

        /**
         * bulk clipboard read
         * @param args {string|string[]|string1,string2,string3...}
         * @returns {{}}
         */
        clipboardBulkGet: function(args){
            var props = args,
                output = {};

            //args checkup
            if(!Ext.isArray(args)){
                if(arguments.length === 1){
                    //just one arg so make it an arr
                    props = [args];
                }
                else {
                    //looks like props have been supplied as subsequent params
                    props = arguments;
                }
            }

            Ext.Array.each(props, function(p){
                output[p] = data[p];
            });

            return output;
        }
    });
}());