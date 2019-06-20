//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/

(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.util.Date', {
        singleton: true,

        /**
         * converts local date to UTC
         * @param d
         * @returns {*}
         */
        toUTC: function(d){
            if(!d || !d instanceof Date){
                return null;
            }
            return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        },

        /**
         * converts a date from UTC to local time
         * @param d
         * @returns {null}
         */
        fromUTC: function(d){
            if(!d || !d instanceof Date){
                return null;
            }
            d.setMinutes(d.getMinutes() - new Date().getTimezoneOffset());
            return d;
        }
    });
    
}());