//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * User model
     */
    Ext.define('mh.data.model.User', {
        extend: 'mh.data.model.Base',

        requires: [
            'mh.data.proxy.Rest',
            'mh.mixin.ApiMap'
        ],

        customEntityNavigationUrl: 'users',

        fields: [
            { name: 'email', type: 'string', useNull: true },

            { name: 'isAccountClosed', type: 'boolean', useNull: true },
            { name: 'isAccountVerified', type: 'boolean', useNull: true },


            { name: 'forename', type: 'string' },
            { name: 'surname', type: 'string' },
            {
                name: 'username', type: 'string',
                calculate: function(data){
                    return data.forename && data.surname ? data.forename + ' ' + data.surname : data.surname || data.forename || data.email;
                }
            },

            { name: 'slug', type: 'string', useNull: true, defaultValue: null },
            { name: 'bio', type: 'string' },
            { name: 'company', type: 'string' },
            { name: 'department', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'gravatarEmail', type: 'string' },

            { name: 'profilePicture', type: 'string' },

            { name: 'isOrgUser', type: 'boolean', defaultValue: false },
            { name: 'parentOrganizationId', type: 'string', defaultValue: null},
            { name: 'userOrgId', type: 'string', defaultValue: null},
            { name: 'visibleInCatalogue', type: 'boolean', defaultValue: false },
            { name: 'organizationRole', type: 'int', defaultValue: 2} //org member; see the OrganizationRole enum in MapHive.Server.Core.DataModel.Organization

        ],
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('users')
        }
    });

}());