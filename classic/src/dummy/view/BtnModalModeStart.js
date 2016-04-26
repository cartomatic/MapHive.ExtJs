//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Example of a button faking an edit mode start
     */
    Ext.define('mh.dummy.view.BtnModalModeStart', {
        extend: 'Ext.button.Button',

    requires: [
        'mh.mixin.ModalMode'
    ],

    xtype: 'btn-modalmodestart-test',

        text: 'Start modal mode',
        tooltip:'This should nicely propagate to parent window, so it also properly watches all the changes!.',
        margin: '0 10 0 0', //trbl
        listeners: {
            click: function(){

                var mm = Ext.create('mh.mixin.ModalMode');
                mm.startModalMode();

                window.modalTestWindow = Ext.create('Ext.window.Window', {
                    modal: true,
                    title: 'Modal mode test window',
                    height: 200,
                    width: 300,
                    html: 'Right.... Since I am around it means that the router should now ignore ALL the hash changes.... </br> Depending on the implementation - it is important to implement proper route handling in addition to just using the ModalMode mixin. See the dummy.ViewportController for an example of ModalMode usage.',
                    listeners: {
                        close: function(){
                            mm.endModalMode();
                        }
                    }
                });
                window.modalTestWindow.show();
            }
        }
    });

}());