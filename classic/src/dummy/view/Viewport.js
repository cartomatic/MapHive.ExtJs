//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Dummy hosted app viewport with some basic examples of xWindow communication + xWindow hash exchange
     */
    Ext.define('mh.dummy.view.Viewport', {
        extend: 'Ext.panel.Panel',

        requires: [
            'Ext.plugin.Viewport',
        ],

        plugins: 'viewport',

        border: false,

        html: 'Soooo, you may actually think about customising the CLASSIC app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....'
    });

}());