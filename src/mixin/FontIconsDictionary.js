//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.mixin.FontIconsDictionary', {
        requires: [
            'mh.FontIconsDictionary'
        ],

        /**
         * gets an icon
         * @param icon
         * @returns {*}
         */
        getFontIcon: function(icon){
            return mh.FontIconsDictionary.getIcon(icon);
        },

        /**
         * adds icons to the global icons dict
         * @param icons
         * @param overwrite
         */
        addFontIcons: function(icons, overwrite){
            mh.FontIconsDictionary.addIcons(icons, overwrite);
        }
    });
}());