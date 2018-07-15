(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.model.EmailTemplateLocalisation', {
        extend: 'mh.data.model.Base',

        requires: [
            'mh.data.proxy.Rest',
            'mh.mixin.ApiMap'
        ],

        fields: [
            { name: 'name', type: 'string', useNull: true },
            { name: 'description', type: 'string', useNull: true },
            { name: 'applicationName', type: 'string', useNull: true },
            { name: 'identifier', type: 'string', useNull: true },
            { name: 'isBodyHtml', type: 'boolean' },
            { name: 'translations', type: 'auto', defaultValue: []}
        ],
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('emailTemplateLocalisations')
        }
    });
}());