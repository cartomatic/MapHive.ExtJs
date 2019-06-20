//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.DataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mh-translation-keys-data-edit-form',

        requires: [
            'mh.module.dataView.localizations.translationKeys.DataEditFormLocalization'
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
            this.lookupReference('key').setReadOnly(false);

            this.lookupReference('translations').enableEditMode();
        }
    });

}());