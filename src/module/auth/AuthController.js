//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 5/4/2016.
     */
    Ext.define('mh.module.auth.AuthController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-auth',

        mixins: [
            'mh.mixin.CustomConfig',
            'mh.mixin.PublishApi'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.applyCustomViewConfig();
            this.publishApi(['showLogonView']);
        },


        onForgotPassBtnClick: function(btn){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('forgotPassView'));
        },

        /**
         * Traps an enter key within email or password field
         * @param txtField
         * @param e
         */
        trapLoginEnter: function(txtField, e){
            if (e.getKey() === e.ENTER) {
                console.warn('GOT YA');
            }
        },

        /**
         * shows a logon view
         * @param callback
         */
        showLogonView: function(callback){
            this.lookupReference('cardLayout').setActiveItem(this.lookupReference('loginView'));
            this.getView().show();
        }
    });

}());