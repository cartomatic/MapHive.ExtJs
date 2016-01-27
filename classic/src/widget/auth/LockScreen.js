(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Lock screen used to lock the UI from user interaction; adds item to centered vbox layout
     */
    Ext.define('gm.widget.auth.LockScreen', {
        extend: 'gm.widget.auth.LockScreenBase',

        xtype: 'gm.lockscreen',

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