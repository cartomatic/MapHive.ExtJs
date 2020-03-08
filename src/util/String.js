//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/

(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.util.String', {
        singleton: true,

        /**
         * dicides a string into multiline.
         * borrowed from:
         * https://openlayers.org/en/latest/examples/vector-labels.html
         * http://stackoverflow.com/questions/14484787/wrap-text-in-javascript
         * @param str
         * @param width
         * @param spaceReplacer
         * @returns {string|*}
         */
        divide: function(str, width, spaceReplacer) {
            if (str.length > width) {
                var p = width;
                while (p > 0 && (str[p] != ' ' && str[p] != '-')) {
                    p--;
                }
                if (p > 0) {
                    var left;
                    if (str.substring(p, p + 1) == '-') {
                        left = str.substring(0, p + 1);
                    } else {
                        left = str.substring(0, p);
                    }
                    var right = str.substring(p + 1);
                    return left + spaceReplacer + mh.util.String.divide(right, width, spaceReplacer);
                }
            }
            return str;
        }
    });

}());