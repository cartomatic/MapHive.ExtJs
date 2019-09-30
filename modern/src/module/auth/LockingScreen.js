//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by info_000 on 19-Aug-16.
     */
    Ext.define('mh.module.auth.LockingScreen', {
        extend: 'Ext.Container',
    
        xtype: 'mh.locking-screen',

        fullscreen: true,
        maximized: true,
        floated: true,

        cls: 'mh-locking-screen'
    });

}());