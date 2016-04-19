//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.view.dummy.Viewport', {
        extend: 'Ext.panel.Panel',

        plugins: 'viewport',

        border: false,

        requires: [
            'Ext.plugin.Viewport'
        ],

        html: 'Soooo, you may actually think about customising the CLASSIC app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....' +
            '<br/><br/>The app url is: <b>' + window.location.href + '</b>'
    });

}());