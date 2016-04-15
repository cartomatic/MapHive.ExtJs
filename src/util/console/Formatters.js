//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * A set of console formatter helpers;
     * clas meant to be used as a mixin
     */
    Ext.define('mh.util.console.Formatters', {

        /**
         * wraps a string into a standard console debug header style def1
         * @param hdr
         * @returns {string}
         */
        cDbgHdr: function(hdr){
            return '[' + hdr.toUpperCase() + ']' + '_s::,brown,';
        },

        /**
         * wraps string into a standard console icon style def
         * @param img
         * @returns {string}
         */
        cStdIcon: function(img){
            return '_s::img,' + img;
        }
        
    });

}());