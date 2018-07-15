//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.localizationClasses.DataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mh-localization-classes-data-edit-form',

        requires: [
            'mh.module.dataView.localizations.localizationClasses.DataEditFormLocalization'
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
        }
    });

}());