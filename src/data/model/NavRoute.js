//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * nav route - route used by the app to switch views; the stuff that describes the hash part
     */
    Ext.define('mh.data.model.NavRoute', {
        extend: 'Ext.data.Model',

        fields: [
            { name: 'id', type: 'string' },
            { name: 'xtype', type: 'string' },
            { name: 'navigationRoute', type: 'string' },
            { name: 'dataRoute', type: 'string' },
            { name: 'iconCls', type: 'string' }
        ]
    });
    
}());