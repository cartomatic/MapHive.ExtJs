(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Lock screen used to lock the UI from user interaction; based on the admin dashboard template
     */
    Ext.define('mh.module.auth.LockingScreenBase', {
        extend: 'Ext.window.Window',

        xtype: 'mh.lockingscreenbase',

        closable: false,
        resizable: false,
        autoShow: true,
        titleAlign: 'center',
        maximized: true,
        modal: true,

        header: false,

        //css and image borrowed from admin dashboard template
        cls: 'mh-locking-screen'
    });
}());