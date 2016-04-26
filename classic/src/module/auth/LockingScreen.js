(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Lock screen used to lock the UI from user interaction; adds item to centered vbox layout
     */
    Ext.define('mh.module.auth.LockingScreen', {
        extend: 'mh.module.auth.LockingScreenBase',

        xtype: 'mh.lockingscreen',

        requires: [
            'Ext.layout.container.VBox'
        ],

        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        }
    });
}());