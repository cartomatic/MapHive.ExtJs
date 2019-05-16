//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * some grid related utilities; class meant to be used as a mixin
     */
    Ext.define('mh.mixin.MsgBoxUtils', {

        /**
         * gets a width for a msg box; when a preferred width is wider than screen size, returns 90% of the screen's width
         * @param preferredWidth
         * @returns {number|*}
         */
        getFixedMsgBoxWidth: function(preferredWidth){
            var currentWidth = Ext.getBody().getWidth();
            if(currentWidth >= preferredWidth){
                return preferredWidth;
            }
            return Math.round(currentWidth * 0.9);
        }

    });

}());