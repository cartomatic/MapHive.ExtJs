//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var parentIdentifier = '{parent_uuid}',
        orgIdentifier = '{org_uuid}',
        appShortNameIdentifier = '{app_short_name}',
        resourceIdentifier = '{resource_uuid}';


    /**
    * Created by info_000 on 28-Sep-16.
    */
    Ext.define('mh.ApiMap', {
        singleton: true,

        getParentIdentifier: function(){
            return parentIdentifier;
        },

        getOrgIdentifier: function(){
            return orgIdentifier;
        },

        getAppShortNameIdentifier: function(){
            return appShortNameIdentifier;
        },

        getResourceIdentifier: function(){
            return resourceIdentifier;
        },

        /**
         * default api map; this is overridable through the web.config... see the apiMap key for details
         */
        apiMaps: {
            authApi: {
                login: 'letmein',
                logout: 'letmeoutofhere',
                tokenValidation: 'tokenvalidation',
                accountActivation: 'accountactivation',
                resendActivation: 'resendactivation/' + resourceIdentifier,
                passResetRequest: 'passresetrequest',
                resetPass: 'resetpass',
                changePass: 'changepass',
                forceChangePass: 'forcechangepass'
            },

            coreApi: {
                //cfg
                userConfiguration: 'configuration/user',

                //apps
                applications: 'applications',
                userApps: 'users/userapps',

                //orgs
                userOrgs: 'users/userorgs',
                organizations: 'organizations',
                orgHasAppAccess: 'organizations/' + orgIdentifier + '/allowsapplication/{appId}',
                organizationLinkableApps: 'organizations/' + orgIdentifier + '/applications/linkable',

                //users
                users: 'users',
                userName: 'users/username',
                organizationUsers: 'organizations/' + orgIdentifier + '/users',
                organizationUsersLink: 'organizations/' + orgIdentifier + '/users/link',
                userprofile: 'users/owndetails',
                accountCreate: 'users/account',

                //teams
                organizationTeams: 'organizations/' + orgIdentifier + '/teams',
                teamUsers: 'organizations/' + orgIdentifier + '/teams/' + parentIdentifier + '/users',
                teamApps: 'organizations/' + orgIdentifier + '/teams/' + parentIdentifier + '/applications',

                //locale
                localizationClasses: 'localizationclasses',
                translationKeys: 'translationkeys',
                langs: 'langs',
                emailTemplateLocalizations: 'emailtemplatelocalizations',
                appLocalizationsBulkSave: 'applocalizations/bulksave',

                //reousrces
                resources: 'resources',
                resource: 'resources/' + resourceIdentifier + '/file'
            }

        }

    });
}());