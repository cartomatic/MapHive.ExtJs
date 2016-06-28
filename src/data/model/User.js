//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * User model
     */
    Ext.define('mh.data.model.User', {
        extend: 'mh.data.model.Base',

        requires: [
        'mh.data.proxy.Rest',
        'mh.mixin.ApiMap'
    ],

    fields: [
            { name: 'email', type: 'string', useNull: true },

            { name: 'isAccountClosed', type: 'boolean', useNull: true },
            { name: 'isAccountVerified', type: 'boolean', useNull: true }

        ],
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPoint('users')
        }
    });

}());