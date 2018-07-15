//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var parentIdentifier = '{parent_uuid}',
        orgIdentifier = '{org_uuid}';


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

        /**
         * default api map; this is overridable through the web.config... see the apiMap key for details
         */
        apiMaps: {
            authApi: {
                login: 'auth/letmein',
                logout: 'auth/letmeoutofhere',
                tokenValidation: 'auth/tokenvalidation',
                accountActivation: 'auth/accountactivation',
                resendActivation: 'auth/resendactivation/{userId}',
                passResetRequest: 'auth/passresetrequest',
                resetPass: 'auth/resetpass',
                changePass: 'auth/changepass',
                forceResetPass: 'auth/forceresetpass'
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
                appLocalizationsBulkSave: 'applocalizations/bulksave'
            }

        }

    });
}());