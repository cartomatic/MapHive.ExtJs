//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Example of a button sending an xwindow msgbus::xwindowtest to a host window
     */
    Ext.define('mh.dummy.view.BtnPostParent', {
        extend: 'Ext.button.Button',
    
        xtype: 'btn-postparent-test',

        requires: [
        'mh.communication.MsgBus'
    ],

    text: 'Post Message to Parent',
        tooltip: 'this will fire an eent only visible to the parent',
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
                        host: true //if being hosted, will post msg to host
                    }
                );
            }
        }
    });

}());