//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.map.FilterGroup', {
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

            {name: 'filters', type: 'auto', defaultValue: null},
            {name: 'join', type: 'int', defaultValue: 0, allowNull: false}
        ]
    });
}());