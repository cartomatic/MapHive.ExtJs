//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Application object model
     */
    Ext.define('mh.data.model.Application', {
        extend: 'Ext.data.Model',
    
        fields: [
            { name: 'id', type: 'string', useNull: true },
            { name: 'shortName', type: 'string', useNull: true },
            { name: 'name', type: 'string', useNull: true },
            { name: 'url', type: 'string', useNull: true },
            { name: 'useSplashscreen', type: 'boolean' },

            { name: 'requiresAuth', type: 'boolean' },

            { name: 'isDefault', type: 'boolean'}

            //more to come!
        ]
    });

}());