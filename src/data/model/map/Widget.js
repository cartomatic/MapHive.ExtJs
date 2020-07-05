//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.map.Widget', {
        extend: 'Ext.data.Model',

        requires: [
            'mh.data.identifier.Null'
        ],

        //using uuid field as identifier so can maintain record view / edit behavior of the default rec viewers & editors
        //id of a style is not persisted, so this is only for clientside usage
        idProperty : 'uuid',
        identifier: 'mhnull', //this will enforce a default null value for the idProperty for newly created models

        fields: [
            { name: 'uuid', type: 'string', allowNull: true, defaultValue: null, persist: false},

            {name: 'name', type: 'string', defaultValue: null},
            {name: 'aggregationColumn', type: 'string', defaultValue: null},
            {name: 'showAggregationInfo', type: 'bool', defaultValue: false},
            {name: 'aggregationOperator', type: 'int', defaultValue: 0, allowNull: false},
            {name: 'aggregateFirst', type: 'bool', defaultValue: false},
            {name: 'equations', type: 'auto', defaultValue: null, allowNull: true},

            {name: 'inherited', type:'bool', defaultValue: false},
            {name: 'calculating', type: 'bool', defaultValue: false}
        ]
    });
}());