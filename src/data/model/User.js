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
            'mh.mixin.ApiMap',
            'mh.util.Generator'
        ],

        mixins: [
            'mh.mixin.ApiMap',
            'mh.data.Ajax'
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
            { name: 'organizationRole', type: 'int', defaultValue: 2}, //org member; see the OrganizationRole enum in MapHive.Server.Core.DataModel.Organization


            {
                name: 'profilePictureGeneric', type: 'string',
                calculate: function(data) {
                    var src;
                    if(data.profilePicture){
                        if(data.profilePicture.length === 36 && mh.util.Generator.isGuid(data.profilePicture)){
                            src = mh.mixin.ApiMap.getApiEndPointUrl('resource').replace(mh.mixin.ApiMap.getResourceIdentifier(), data.profilePicture) + '?' + mh.data.Ajax.getAccessTokenUrlParam();
                        }
                        else {
                            src = data.profilePicture;
                        }
                    }
                    else {
                        src = 'mh/resources/images/anonymous-profile.png'; //no profile picture img
                        //<debug>
                        src = 'packages/local/mh/resources/images/anonymous-profile.jpg';
                        //</debug>
                    }

                    return src;
                }
            }
        ],
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('users')
        }
    });

}());