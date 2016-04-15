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
        'Ext.tip.QuickTipManager',
        'mh.view.dummy.Viewport'
    ],

    constructor: function(config){

            Ext.QuickTips.init();

            //TODO - use a standard viewport and push the standardised top toolbar there, provided the app runs in the standalone mode! otherwise do not use it of course but rather make sure the parent communication is established!

            //init the GUI
            Ext.create('mh.view.dummy.Viewport');
        }
    });
}());