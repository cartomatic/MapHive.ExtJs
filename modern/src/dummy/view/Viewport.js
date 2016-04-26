//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.dummy.view.Viewport', {

        extend: 'Ext.Container',

        fullscreen: 'true',

        layout: 'card',

        html: 'Soooo, you may actually think about customising the MODERN app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....',
    
        items: [
        ]
    });

}());