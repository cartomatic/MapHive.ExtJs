//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.map.Layer', {
        extend: 'mh.data.model.Base',

        customEntityNavigationUrl: {
            basic: 'layers',
            projectScope: 'maps/{id}/layers'
        },

        fields: [
            { name: 'mapId', type: 'string', defaultValue: null },
            { name: 'mapName', type: 'string', defaultValue: null, persist: false },

            { name: 'identifier', type: 'bool', defaultValue: null, allowNull: true},
            { name: 'isDefault', type: 'bool', defaultValue: null, allowNull: true},
            { name: 'type', type: 'int', defaultValue: null, allowNull: true},

            { name: 'sourceLayerId', type: 'string', defaultValue: null },
            { name: 'sourceLayer', type: 'auto', defaultValue: null, allowNull: true, persist: false },

            { name: 'order', type: 'int', defaultValue: null, allowNull: true },

            { name: 'name', type: 'string', defaultValue: null },
            { name: 'description', type: 'string', defaultValue: null },
            { name: 'visible', type: 'bool', defaultValue: null, allowNull: true },
            { name: 'visibilityScaleMin', type: 'number', defaultValue: null, allowNull: true },
            { name: 'visibilityScaleMax', type: 'number', defaultValue: null, allowNull: true },
            { name: 'metadata', type: 'auto', defaultValue: null, allowNull: true },
            { name: 'dataSource', type: 'auto', defaultValue: null, allowNull: true },
            { name: 'dataStoreId', type: 'string', defaultValue: null },
            { name: 'styles', type: 'auto', defaultValue: null, allowNull: true },
            { name: 'widgets', type: 'auto', defaultValue: null, allowNull: true },

            {
                name: 'sourceLayerName', type: 'string',
                calculate: function(data){
                    return data.sourceLayer ?  data.sourceLayer.name : '';
                }
            }
        ]
    },
        function() {
            mh.mixin.ApiMap.watchOrgContextChanges(this);
        }
    );
}());
