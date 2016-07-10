//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.langs.DataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mofp-langs-data-edit-form',

        requires: [
            'mh.module.dataView.localisations.langs.DataEditFormLocalisation'
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
            this.lookupReference('langCode').setReadOnly(false);
            this.lookupReference('name').setReadOnly(false);
            this.lookupReference('description').setReadOnly(false);
            this.lookupReference('isDefault').setReadOnly(false);
        }
    });

}());