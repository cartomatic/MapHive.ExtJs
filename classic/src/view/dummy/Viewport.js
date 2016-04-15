//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.view.dummy.Viewport', {
        extend: 'Ext.panel.Panel',

        plugins: 'viewport',

    requires: [
        'Ext.plugin.Viewport'
    ],

    html: 'Soooo, you may actually think about customising the CLASSIC app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....'
    });

}());