//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var parentIdentifier = '{parent_uuid}';

    /**
    * Created by info_000 on 28-Sep-16.
    */
    Ext.define('mh.ApiMap', {
        singleton: true,

        getParentIdentifier: function(){
            return parentIdentifier;
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

            //apps
            applications: 'applications',
            userApps: 'users/userapps',

            userOrgs: 'users/userorgs',
            organisations: 'organisations',
            orgHasAppAccess: 'organisations/{orgId}/allowsapplication/{appId}',

            userConfiguration: 'configuration/user',

            //users
            users: 'users',
            organisationUsers: 'organisations/' + parentIdentifier + '/users',
            organisationUsersLink: 'organisations/' + parentIdentifier + '/users/link',
            userprofile: 'users/owndetails',
            accountCreate: 'users/account',

            localisationClasses: 'localisationclasses',
            translationKeys: 'translationkeys',
            langs: 'langs',
            emailTemplateLocalisations: 'emailtemplatelocalisations',
            appLocalisationsBulkSave: 'applocalisations/bulksave'

        }

    });
}());