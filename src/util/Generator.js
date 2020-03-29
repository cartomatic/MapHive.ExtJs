//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    //Make the counter private and not overridable
    var counter = new Date().getTime();

    /**
     * generator used to obtain unique ids, uuids and shortened uuids
     */
    Ext.define('mh.util.Generator', {

        singleton: true,

        /**
         * Returns a unique id
         * @returns {*}
         * @member mh.util.Generator
         */
        getId: function(){
            counter += 1;
            return counter;
        },

        /**
         * generates uuid
         * @param [a]
         * @param [b]
         * @returns {*}
         * @member mh.util.Generator
         */
        getUuid: function(a,b){
            //https://gist.github.com/LeverOne/1308368

            /*
             DO WTF YOU WANT TO PUBLIC LICENSE
             Version 2, December 2004
             Copyright (C) 2011 Alexey Silin <pinkoblomingo@gmail.com>
             Everyone is permitted to copy and distribute verbatim or modified
             copies of this license document, and changing it is allowed as long
             as the name is changed.
             DO WTF YOU WANT TO PUBLIC LICENSE
             TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
             0. You just DO WTF YOU WANT TO.
             */

            /*
             function(
             a,b                // placeholders
             ){
             for(               // loop :)
             b=a='';        // b - result , a - numeric variable
             a++<36;        //
             b+=a*51&52  // if "a" is not 9 or 14 or 19 or 24
             ?  //  return a random number or 4
             (
             a^15      // if "a" is not 15
             ?      // genetate a random number from 0 to 15
             8^Math.random()*
             (a^20?16:4)  // unless "a" is 20, in which case a random number from 8 to 11
             :
             4            //  otherwise 4
             ).toString(16)
             :
             '-'            //  in other cases (if "a" is 9,14,19,24) insert "-"
             );
             return b
             }
             //And a short form
             function(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}
             */

            for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b
        },

        /**
         * generates a short version of uuid - either the first or the last part
         * @param [first]
         * @returns {string}
         * @member mh.util.Generator
         */
        getShortUuid: function(first){

            var uuid = this.getUuid();

            if(first){
                return uuid.substring(0, uuid.indexOf('-'));
            }
            else {
                return uuid.substring(uuid.lastIndexOf('-') + 1, uuid.length);
            }
        },

        getDefaultGuid: function(){
            return '00000000-0000-0000-0000-000000000000';
        },

        /**
         * validates if a string is guid like
         * @param wouldBeGuid
         *
         * Note: borowed from http://stackoverflow.com/a/13653180 (https://jsfiddle.net/mshaffer/6e2Ljh97/)
         */
        isGuid: function(wouldBeGuid){
            if(!wouldBeGuid){
                return false;
            }
            if (wouldBeGuid[0] === "{")
            {
                wouldBeGuid = wouldBeGuid.substring(1, wouldBeGuid.length - 1);
            }
            //var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
            var regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            return regexGuid.test(wouldBeGuid);
        },

        regexGuid: /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/g,

        /**
         * whether or not txt contains a uuid
         * @param txt
         * @returns {boolean}
         */
        containsGuid: function(txt){
            return this.regexGuid.test(txt);
        },

        /**
         * extracts uuids from txt
         * @param txt
         * @returns {RegExpMatchArray | Promise<Response | undefined> | *}
         */
        extractGuids: function(txt){
            return txt.match(this.regexGuid);
        }


    });
}());