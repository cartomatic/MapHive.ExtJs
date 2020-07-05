//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.map.DataSourceColumn', {
        extend: 'Ext.data.Model',

        fields: [
            {name: 'name', type: 'string', defaultValue: null},
            {name: 'friendlyName', type: 'string', defaultValue: null},
            {name: 'type', type: 'int', defaultValue: 0, allowNull: false},
            {name: 'queryable', type: 'bool', defaultValue: true, allowNull: false},
            {name: 'styleable', type: 'bool', defaultValue: true, allowNull: false},
            {name: 'info', type: 'bool', defaultValue: true, allowNull: false}
        ]
    });
}());