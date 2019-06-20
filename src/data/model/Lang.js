//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.model.Lang', {
        extend: 'mh.data.model.Base',

    requires: [
        'mh.data.proxy.Rest',
        'mh.mixin.ApiMap'
    ],

    fields: [
            {name: 'langCode', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'isDefault', type: 'boolean'}
        ],
        proxy: {
            type: 'mhrest',
            url : mh.mixin.ApiMap.getApiEndPointUrl('langs')
        }
    });

}());