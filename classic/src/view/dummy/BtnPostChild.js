//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Example of a button sending an xwindow msgbus::xwindowtest to hosted windows
     */
    Ext.define('mh.view.dummy.BtnPostChild', {
        extend: 'Ext.button.Button',

    requires: [
        'mh.communication.MsgBus'
    ],

xtype: 'btn-postchild-test',

        text: 'Post Message to child',
        tooltip: 'this will make the event be heard within each direct child of the source window',
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
                        hosted: true //if hosting, will post msg to hosted
                    }
                );
            }
        }
    });

}());