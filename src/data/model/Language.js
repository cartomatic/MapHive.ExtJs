//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.model.Language', {
        extend: 'Ext.data.Model',

    requires: [
        'mh.data.proxy.Rest',
        'mh.mixin.ApiMap'
    ],

    fields: [
            {name: 'langCode', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'description', type: 'string'}
        ],
        proxy: {
            type: 'mhrest',
            url : mh.mixin.ApiMap.getApiEndPoint('supportedLangs')
        }
    });

}());