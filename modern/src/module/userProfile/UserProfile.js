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

        requires: [
            'mh.util.AliasMapper'
        ],

        xtype: 'mh-user-profile',

        statics: {
            aliases: [
                'user-profile',
                'userprofile'
            ]
        },

        html: 'This is gonna be user profile'

    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());
