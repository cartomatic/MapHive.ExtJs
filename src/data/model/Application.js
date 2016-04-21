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
            { name: 'id', type: 'string' },
            { name: 'shortName', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'useSplashscreen', type: 'boolean' }

            //more to come!
        ]
    });

}());