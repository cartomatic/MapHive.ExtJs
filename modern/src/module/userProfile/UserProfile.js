//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * User profile
     */
    Ext.define('mh.module.userProfile.UserProfile', {
        extend: 'Ext.Panel',
    
        xtype: [
            'userprofile',
            'user-profile'
        ],

        html: 'This is gonna be user profile'
    });
}());
