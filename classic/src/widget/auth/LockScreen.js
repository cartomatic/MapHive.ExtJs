(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Lock screen used to lock the UI from user interaction; based on the admin dashboard template
     */
    Ext.define('gm.widget.auth.LockScreen', {
        extend: 'Ext.window.Window',

        xtype: 'gm.lockscreen',

        closable: false,
        resizable: false,
        autoShow: true,
        titleAlign: 'center',
        maximized: true,
        modal: true,

        header: false,

        //css and image borrowed from admin dashboard template
        cls: 'gm-lock-screen',

        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        }
    });
}());