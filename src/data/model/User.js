//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * User model
     */
    Ext.define('mh.data.model.User', {
        extend: 'Ext.data.Model',
    
        fields: [
            { name: 'id', type: 'string', useNull: true }

            //more to come
        ]
    });

}());