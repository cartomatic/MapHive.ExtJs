//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * An example of a CLASSIC app launcher; does init just a DummyViewport
     */
    Ext.define('mh.AppLauncher', {

    requires: [
        'Ext.tip.QuickTipManager',
        'mh.module.appBar.AppBar',
        'mh.view.dummy.Viewport'
    ],

    constructor: function(config){

            Ext.QuickTips.init();

            //init the GUI
            Ext.create('mh.view.dummy.Viewport', {
                dockedItems: [
                    //standardised app top tbar
                    {
                        xtype: 'mh-app-bar'
                    }
                ]
            });

        }
    });
}());