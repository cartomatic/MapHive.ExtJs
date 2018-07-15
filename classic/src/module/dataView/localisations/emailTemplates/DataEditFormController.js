//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.DataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mh-email-templates-data-edit-form',

        requires: [
            'mh.module.dataView.localizations.emailTemplates.DataEditFormLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.CallMeParent'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);
            this.injectLocalizationToViewModel();

            //enable input fields - this view inherits from a display only view
            this.lookupReference('name').setReadOnly(false);
            this.lookupReference('description').setReadOnly(false);
            this.lookupReference('applicationName').setReadOnly(false);
            this.lookupReference('identifier').setReadOnly(false);
            this.lookupReference('isBodyHtml').setReadOnly(false);


            this.lookupReference('translations').enableEditMode();
        }
    });

}());