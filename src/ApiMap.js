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
        map: {
            //auth
            login: 'auth/letmein',
            logout: 'auth/letmeoutofhere',
            tokenValidation: 'auth/tokenvalidation',
            accountActivation: 'auth/accountactivation',
            passResetRequest: 'auth/passresetrequest',
            resetPass: 'auth/resetpass',
            changePass: 'auth/changepass',

            //cfg
            userConfiguration: 'configuration/user',

            //apps
            applications: 'applications',
            userApps: 'users/userapps',

            //orgs
            userOrgs: 'users/userorgs',
            organisations: 'organisations',
            orgHasAppAccess: 'organisations/{orgId}/allowsapplication/{appId}',

            //users
            users: 'users',
            organisationUsers: 'organisations/' + orgIdentifier + '/users',
            organisationUsersLink: 'organisations/' + orgIdentifier + '/users/link',
            userprofile: 'users/owndetails',
            accountCreate: 'users/account',

            //teams
            organisationTeams: 'organisations/' + orgIdentifier + '/teams',
            teamUsers: 'organisations/' + orgIdentifier + '/teams/' + parentIdentifier + '/users',
            teamApps: 'organisations/' + orgIdentifier + '/teams/' + parentIdentifier + '/applications',

            //locale
            localisationClasses: 'localisationclasses',
            translationKeys: 'translationkeys',
            langs: 'langs',
            emailTemplateLocalisations: 'emailtemplatelocalisations',
            appLocalisationsBulkSave: 'applocalisations/bulksave'

        }

    });
}());