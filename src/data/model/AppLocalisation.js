(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 05-Jul-16.
     */
    Ext.define('mh.data.model.LocalisationClass', {
        extend: 'mh.data.model.Base',

        requires: [
            'mh.data.proxy.Rest',
            'mh.mixin.ApiMap'
        ],

        fields: [
            { name: 'applicationName', type: 'string', useNull: true },

            { name: 'className', type: 'string', useNull: true },

            { name: 'inheritedClassName', type: 'string', useNull: true}

        ],
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('localisationClasses')
        }
    });
}());