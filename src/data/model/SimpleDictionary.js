//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.SimpleDictionary', {
        extend: 'mh.data.model.Base',

        fields: [
            { name: 'name', type: 'string', defaultValue: null },
            { name: 'description', type: 'string', defaultValue: null },
            { name: 'isDefault', type: 'bool', defaultValue: null },
            { name: 'isCommon', type: 'bool', defaultValue: null }
        ]
    });
}());
