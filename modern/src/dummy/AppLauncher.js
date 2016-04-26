//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * A generic MODERN app launcher; does init just a DummyViewport
     */
    Ext.define('mh.dummy.AppLauncher', {

        requires: [
            'mh.dummy.view.Viewport'
        ],

        constructor: function(config){
            //init the GUI
            Ext.create('mh.dummy.view.Viewport');
        }
    });
}());