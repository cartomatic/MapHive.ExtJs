//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersDataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mh-users-data-edit-form',

        requires: [
            'mh.module.dataView.users.UsersDataEditFormLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.CallMeParent'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);
            this.injectLocalisationToViewModel();

            //enable input fields - this view inherits from a display only view
            this.lookupReference('email').setReadOnly(false);
            this.lookupReference('isAccountClosed').setReadOnly(false);
            this.lookupReference('isAccountVerified').setReadOnly(false);

            this.lookupReference('slug').setReadOnly(false);
            this.lookupReference('gravatarEmail').setReadOnly(false);
            this.lookupReference('forename').setReadOnly(false);
            this.lookupReference('surname').setReadOnly(false);
            this.lookupReference('bio').setReadOnly(false);
            this.lookupReference('company').setReadOnly(false);
            this.lookupReference('department').setReadOnly(false);
            this.lookupReference('isOrgUser').setReadOnly(false);
            this.lookupReference('visibleInCatalogue').setReadOnly(false);

            this.lookupReference('isAccountClosed').setReadOnly(false);
            this.lookupReference('isAccountVerified').setReadOnly(false);

        }
    });

}());