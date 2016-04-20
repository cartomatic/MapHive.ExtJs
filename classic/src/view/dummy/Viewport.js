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
            'Ext.plugin.Viewport',
            'mh.communication.MsgBus'
        ],

        items: [
            {
                xtype: 'displayfield',
                value: 'Soooo, you may actually think about customising the CLASSIC app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....' +
                '<br/><br/>The app url is: <b>' + window.location.href + '</b>'
            },
            {
                xtype: 'button',
                text: 'Post Message',
                listeners: {
                    click: function(){

                        Ext.create('mh.communication.MsgBus').fireGlobal(
                            'some_event_name',
                            'some_event_data',
                            {
                                suppressLocal: true,
                                host: true, //if being hosted, will post msg to host
                                hosted: true, //if hosting, will post msg to hosted
                                bubble: true, //just bubble the evt up the host stack
                                drilldown: true //just bubble the evt down the hosted stack
                            }
                        );
                    }
                }
            }
        ]
    });

}());