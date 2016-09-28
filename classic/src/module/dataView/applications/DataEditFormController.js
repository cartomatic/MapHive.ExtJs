//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.applications.DataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mh-applications-data-edit-form',

        requires: [
            'mh.module.dataView.applications.DataEditFormLocalisation'
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
            this.lookupReference('name').setReadOnly(false);
            this.lookupReference('shortName').setReadOnly(false);
            this.lookupReference('description').setReadOnly(false);
            this.lookupReference('url').setReadOnly(false);
            this.lookupReference('useSplashscreen').setReadOnly(false);
            this.lookupReference('requiresAuth').setReadOnly(false);
            this.lookupReference('isCommon').setReadOnly(false);
            this.lookupReference('isDefault').setReadOnly(false);

        },

        /**
         * Need to override save for custom data collection - link grids in particular; when data collection is done, can delegate work to base
         */
        save: function () {

            //finally save
            this.callMeParent('save', arguments);
        }
    });

}());