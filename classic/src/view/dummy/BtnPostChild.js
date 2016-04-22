//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 4/22/2016.
     */
    Ext.define('mh.view.dummy.BtnPostChild', {
        extend: 'Ext.button.Button',

    requires: [
        'mh.communication.MsgBus'
    ],

xtype: 'btn-postchild-test',

        text: 'Post Message to child',
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