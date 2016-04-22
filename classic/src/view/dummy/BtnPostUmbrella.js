//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 4/22/2016.
     */
    Ext.define('mh.view.dummy.BtnPostUmbrella', {
        extend: 'Ext.button.Button',

    requires: [
        'mh.communication.MsgBus'
    ],

        xtype: 'btn-postumbrella-test',

        text: 'Post Message to windows at the same level (use parent as an umbrella)',
        margin: '0 10 0 0', //trbl
        listeners: {
            click: function(){

                Ext.create('mh.communication.MsgBus').fireGlobal(
                    'some_event_name',
                    'some_event_data',
                    {
                        suppressLocal: true,
                        //host: true, //if being hosted, will post msg to host
                        //hosted: true, //if hosting, will post msg to hosted
                        umbrella: true
                        //bubble: true, //just bubble the evt up the host stack
                        //drilldown: true //just bubble the evt down the hosted stack
                    }
                );
            }
        }
    });

}());