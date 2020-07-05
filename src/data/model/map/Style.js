//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.map.Style', {
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
            {name: 'allObjects', type: 'bool', defaultValue: true, allowNull: false},
            {name: 'filters', type: 'auto', defaultValue: null, allowNull: true},

            {name: 'poly', type: 'bool', defaultValue: false, allowNull: false},
            {name: 'polyFillColor', type: 'string', defaultValue: '80a8ea55', allowNull: true},
            {name: 'polyStrokeColor', type: 'string', defaultValue: '4b4ceaff', allowNull: true},
            {name: 'polyStrokeWidth', type: 'number', defaultValue: 1, allowNull: true},

            {name: 'line', type: 'bool', defaultValue: false, allowNull: false},
            {name: 'lineStrokeColor', type: 'string', defaultValue: '4b4ceaff', allowNull: true},
            {name: 'lineStrokeWidth', type: 'number', defaultValue: 1, allowNull: true},


            {name: 'point', type: 'bool', defaultValue: false, allowNull: false},
            {name: 'pointSize', type: 'number', defaultValue: 5, allowNull: true},
            {name: 'pointShape', type: 'string', defaultValue: 'circle', allowNull: true},
            {name: 'pointFillColor', type: 'string', defaultValue: '80a8ea55', allowNull: true},
            {name: 'pointStrokeColor', type: 'string', defaultValue: '4b4ceaff', allowNull: true},
            {name: 'pointStrokeWidth', type: 'number', defaultValue: 1, allowNull: true},

            {name: 'pointLabels', type: 'bool', defaultValue: false, allowNull: false},
            {name: 'pointLabelField', type: 'string', allowNull: true},
            {name: 'pointLabelVisibilityScaleMin', type: 'number', defaultValue: null, allowNull: true},
            {name: 'pointLabelVisibilityScaleMax', type: 'number', defaultValue: null, allowNull: true},
            {name: 'pointLabelWrap', type: 'string', defaultValue: 'wrap', allowNull: true},
            {name: 'pointLabelAlign', type: 'string', defaultValue: 'center', allowNull: true},
            {name: 'pointLabelBaseLine', type: 'string', defaultValue: 'middle', allowNull: true},
            {name: 'pointLabelRotation', type: 'number', defaultValue: 0},
            {name: 'pointLabelFont', type: 'string', defaultValue: 'Arial', allowNull: true},
            {name: 'pointLabelFontStyle', type: 'string', defaultValue: 'Normal', allowNull: true},
            {name: 'pointLabelPlacement', type: 'string', defaultValue: 'point', allowNull: true},
            {name: 'pointLabelMaxAngle', type: 'number', defaultValue: 45},
            {name: 'pointLabelOverflow', type: 'bool', defaultValue: false, allowNull: false},

            {name: 'pointLabelSize', type: 'number', defaultValue: 10},
            {name: 'pointLabelLineHeight', type: 'number', defaultValue: 1},
            {name: 'pointLabelOffsetX', type: 'number', defaultValue: 0},
            {name: 'pointLabelOffsetY', type: 'number', defaultValue: 0},
            {name: 'pointLabelColor', type: 'string', defaultValue: '000000ff', allowNull: false},
            {name: 'pointLabelOutlineColor', type: 'string', defaultValue: 'ffffff00', allowNull: false},
            {name: 'pointLabelOutlineWidth', type: 'number', defaultValue: 0},

            //{name: 'pointLabelDeclutter', type: 'bool', defaultValue: false, allowNull: false},

            {name: 'inherited', type:'bool', defaultValue: false}
        ]
    });
}());