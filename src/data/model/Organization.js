(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.data.model.Organization', {
        extend: 'mh.data.model.Base',

        requires: [
            'mh.data.proxy.Rest',
            'mh.mixin.ApiMap',
            'mh.data.proxy.Rest'
        ],

        fields: [

            {name: 'slug', type: 'string', useNull: true},
            {name: 'displayName', type: 'string', useNull: true},
            {name: 'description', type: 'string', useNull: true},
            {name: 'location', type: 'string', useNull: true},
            {name: 'url', type: 'boolean'},
            {name: 'email', type: 'boolean'},
            {name: 'gravatarEmail', type: 'boolean'},
            {name: 'profilePicture', type: 'boolean'},
            {name: 'billingEmail', type: 'boolean'},
            {name: 'billingAddress', type: 'boolean'}
        ],

        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('organizations')
        }
    });
    
}());

    