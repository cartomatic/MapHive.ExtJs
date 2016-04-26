//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Example of a button sending an xwindow msgbus::xwindowtest in umbrella mode
     */
    Ext.define('mh.dummy.view.BtnPostUmbrella', {
        extend: 'Ext.button.Button',

    requires: [
        'mh.communication.MsgBus'
    ],

        xtype: 'btn-postumbrella-test',

        text: 'Post Message to windows at the same level (use parent as an umbrella)',
        tooltip:'This will request the parent to pass an event to another child.',
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
                        umbrella: true
                    }
                );
            }
        }
    });

}());