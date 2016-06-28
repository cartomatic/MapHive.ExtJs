//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Application object model
     */
    Ext.define('mh.data.model.Application', {
        extend: 'mh.data.model.Base',

        requires: [
        'mh.data.proxy.Rest',
        'mh.mixin.ApiMap',
        'mh.data.proxy.Rest'
    ],

    fields: [

            /**
             * Short name - used in the url part to indicate an active app (in host mode)
             */
            { name: 'shortName', type: 'string', useNull: true },

            /**
             * Full app name
             */
            { name: 'name', type: 'string', useNull: true },

            /**
             * Description
             */
            { name: 'description', type: 'string', useNull: true },

            /**
             * The application's entry point
             */
            { name: 'url', type: 'string', useNull: true },

            /**
             * Whether or not own application's splashscreen should be used, or the host should use own load mask
             */
            { name: 'useSplashscreen', type: 'boolean' },

            /**
             * Whether or not the application requires authentication in order to be used.
             */
            { name: 'requiresAuth', type: 'boolean' },

            /**
             * Whether or not the information about an application can be publicly accessible;
             * a common app means every user can get the information about the application such as its name, short name, description, url, etc.
             * if an application is marked as common it may be shown in the app switcher, so user can launch it (provided the env is configured for this of course)
             * being public does mean the application does not require auth though.
             */
            { name: 'isCommon', type: 'boolean'},

            /**
             * Whether or not an app is default; when flagged as default, the app will be automatically loaded if there were no other means of enforcing the current app.
             */
            { name: 'isDefault', type: 'boolean'}

            //more to come!
        ],

        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPoint('applications')
        }
    });

}());