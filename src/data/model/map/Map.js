//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    let extraAuthData = null;

    Ext.define('mh.data.model.map.Map', {
        extend: 'mh.data.model.Base',

        customEntityNavigationUrl: 'maps',

        fields: [
            { name: 'identifier', type: 'string', defaultValue: null },
            { name: 'name', type: 'string', defaultValue: null },
            { name: 'description', type: 'string', defaultValue: null },
            { name: 'locationIdentifier', type: 'string', defaultValue: null },
            { name: 'initLo', type: 'number', allowNull: true, defaultValue: null },
            { name: 'initLa', type: 'number', allowNull: true, defaultValue: null },
            { name: 'initZoom', type: 'number', allowNull: true, defaultValue: null },
            { name: 'clients', type: 'string', defaultValue: null },
            { name: 'layers', type: 'auto', defaultValue: null },
            { name: 'archived', type: 'boolean', defaultValue: null }
        ],

        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('projects'),
            apiMapKey: 'projects',
            onOrgContextChanged: function(){
                this.setExtraParams({
                    ead: JSON.stringify(extraAuthData)
                });
            }
        }
    },
        function() {
            new mh.communication.MsgBus().watchGlobal('auth::userauthenticated', function(authData){
                extraAuthData = {
                    authProvider: authData.authProvider,
                    permalink: authData.permalink
                };
                Object.getOwnPropertyNames(extraAuthData).forEach((pName) =>{
                    if(extraAuthData[pName] === undefined || extraAuthData[pName] === null){
                        delete extraAuthData[pName];
                    }
                });
            });
            mh.mixin.ApiMap.watchOrgContextChanges(this);
        }
    );
}());
