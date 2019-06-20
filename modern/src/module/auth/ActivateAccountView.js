//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.auth.ActivateAccountView', {
        extend: 'Ext.Container',

        xtype:'mh-auth-activate-account',


        layout: 'vbox',

        style: {
            backgroundColor: 'transparent'
        },

        items: [
            //this is just a blank screen - the account activation should kick in automatically and simply show a load mask.
        ]
    });
}());
