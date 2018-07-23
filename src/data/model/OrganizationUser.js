//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    /**
     * user mode scoped to organization
     */
    Ext.define('mh.data.model.OrganizationUser', {
        extend: 'mh.data.model.User',

        requires: [
            'mh.mixin.ApiMap'
        ],

        customEntityNavigationUrl: 'org-users',

        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('organizationUsers'),
            apiMapKey: 'organizationUsers'
        }

        },
        function() {
            mh.mixin.ApiMap.watchOrgContextChanges(this);
        });
}());
