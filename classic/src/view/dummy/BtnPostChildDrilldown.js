//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Example of a button sending an xwindow msgbus::xwindowtest to hosted windows in drilldown mode
     */
    Ext.define('mh.view.dummy.BtnPostChildDrilldown', {
        extend: 'Ext.button.Button',
    
        xtype: 'btn-postchilddrilldown-test',

        requires: [
        'mh.communication.MsgBus'
    ],

    text: 'Post Message to Child + drilldown',
        tooltip: 'this will make the event drill down to the bottom of the windows stack',
        margin: '0 10 0 0', //trbl
        listeners: {
        click: function(){

            Ext.create('mh.communication.MsgBus').fireGlobal(
                'msgbus::xwindowtest',
                {
                    origin: window.location.href
                },
                {
                    suppressLocal: true,
                    hosted: true, //if hosting, will post msg to hosted
                    drilldown: true //just bubble the evt down the hosted stack with the specified cut off point
                }
            );
        }
    }
    });

}());