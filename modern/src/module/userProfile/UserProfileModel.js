//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.userProfile.UserProfileModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-user-profile',

        mixins: [

        ],

        data: {
            /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
        }
    });
}());
