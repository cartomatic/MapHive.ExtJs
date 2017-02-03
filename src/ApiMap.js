//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
    * Created by info_000 on 28-Sep-16.
    */
    Ext.define('mh.ApiMap', {
        singleton: true,

        parentIdentifier: '{parent_uuid}',

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
            userapps: 'applications/userapps',


            userConfiguration: 'configuration/user',

            //users
            users: 'users',
            userprofile: 'users/owndetails',

            localisationClasses: 'localisationclasses',
            translationKeys: 'translationkeys',
            langs: 'langs',
            emailTemplateLocalisations: 'emailtemplatelocalisations',
            appLocalisationsBulkSave: 'applocalisations/bulksave'

        }

    });
}());