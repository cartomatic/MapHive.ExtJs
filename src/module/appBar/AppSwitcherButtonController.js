//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * App switcher btn controller - responsible for providing the functionality to switch between the applications.
     * its controller pulls the required settings automatically by contacting the configure endpoint
     */
    Ext.define('mh.module.appBar.AppSwitcherButtonController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-app-switcher-button',

        mixins: [
            'mh.util.console.Formatters',
            'mh.data.Ajax'
        ],

        /**
         * Configured applications
         */
        apps: null,

        /**
         * Called when the view is created
         */
        init: function() {
            //get the configured apps
            this.getAppsInfo();

            //also wire up the userAuthenticated listener - whenever a user autheticates it will be necessary to pull the apps
            //that are not public (if any of course)
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
        },

        /**
         * auth::userauthenticated callback
         */
        onUserAuthenticated: function(evtData){
            console.log('App switcher btn - user authenticated, need to pull new apps data!')
        },

        /**
         * Retrieves the available apps info for the current context. Context is a combination of an access token (a user pretty much) and an organisation a user has chosen to use as a context for the current session
         */
        getAppsInfo: function(){

            this.doGet({
                url: this.getView().getApi().apps || 'dummy.url', //so Ext.Ajax does not throw...
                scope: this,
                success: this.onGetAppsSuccess,
                failure: this.onGetAppsFailure

                //errs will be auto ignored
            });
        },

        /**
         * Apps data load was ok.
         * @param response
         */
        onGetAppsSuccess: function(response){

            //success, so this should be an array of appDTO objects
            // this.apps = response;
            //
            // alert('WTF????? x1');
            //
            // console.warn(this.apps && this.apps.length > 0, this.apps, this.apps.length, this.getView());
            //
            // alert('WTF????? x2');
            //
            // this.getView().setVisible((this.apps && this.apps.length > 0));
        },

        /**
         * Apps load failed. make sure to fail silently
         */
        onGetAppsFailure: function(){
            //make it silent...

            //since it was not possible to get the apps info, make sure to hide the btn
            //this.getView().hide();
        }
    });

}());