//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * A generic modern app launcher; does init just a DummyViewport
     */
    Ext.define('mh.AppLauncher', {

        requires: [
            'mh.view.dummy.Viewport'
        ],

        constructor: function(config){
            //init the GUI
            Ext.create('mh.view.dummy.Viewport');
        }
    });
}());