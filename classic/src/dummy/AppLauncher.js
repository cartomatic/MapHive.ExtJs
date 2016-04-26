//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * An example of a CLASSIC app launcher; does init just a DummyViewport
     */
    Ext.define('mh.dummy.AppLauncher', {

    requires: [
        'Ext.tip.QuickTipManager',
        'mh.module.appBar.AppBar',
        'mh.dummy.view.Viewport'
    ],

    constructor: function(config){

            Ext.QuickTips.init();

            //init the GUI
            Ext.create('mh.dummy.view.Viewport', {
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