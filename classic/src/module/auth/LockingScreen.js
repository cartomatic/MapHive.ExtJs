(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Lock screen used to lock the UI from user interaction; based on the admin dashboard template
     */
    Ext.define('mh.module.auth.LockingScreen', {
        extend: 'Ext.window.Window',

        xtype: 'mh.locking-screen',

        closable: false,
        resizable: false,
        titleAlign: 'center',
        maximized: true,
        modal: true,

        header: false,

        border: false,
        style: {
            border: '0px',
            padding: '0px'
        },

        //css borrowed from admin dashboard template
        cls: 'mh-locking-screen'
    });
}());