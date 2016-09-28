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


            clientConfiguration: 'configuration/webclient',

            //users
            users: 'users',

            appLocalisations: 'applocalisations',
            langs: 'langs',
            emailTemplateLocalisations: 'emailtemplatelocalisations'
        },

    });
}());