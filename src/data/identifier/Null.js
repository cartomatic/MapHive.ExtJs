//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * A simple null id generator, so can enforce null ids on new models
     */
    Ext.define('mh.data.identifier.Null', {
        extend: 'Ext.data.identifier.Generator',

        alias: 'data.identifier.mhnull',

        generate: function(){
            return null;
        }
    });

}());