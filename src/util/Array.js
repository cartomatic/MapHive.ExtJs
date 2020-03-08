//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/

(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.util.Array', {
        singleton: true,

        /**
         * deep clones an array.
         * @param arr
         * @returns {null|[]}
         */
        clone: function(arr){
            if(!arr){
                return null;
            }
            let newArr = [];

            (arr || []).forEach((a) => {
                newArr.push(Ext.clone(a));
            });

            return newArr;
        }
    });

}());