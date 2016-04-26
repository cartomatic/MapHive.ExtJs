//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Example of a button sending an xwindow msgbus::xwindowtest to host windows in bubble mode
     */
    Ext.define('mh.dummy.view.BtnPostParentBubble', {
        extend: 'Ext.button.Button',

            requires: [
        'mh.communication.MsgBus'
    ],

    xtype: 'btn-postparentbubble-test',

        text: 'Post Message to Parent + bubble',
        tooltip: 'this will make the event bubble up to the top of the windows stack',
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
                        host: true, //if being hosted, will post msg to host
                        bubble: true //just bubble the evt up the host stack
                    }
                );
            }
        }
    });

}());