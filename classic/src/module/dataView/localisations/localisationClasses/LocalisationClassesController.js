//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.localizationClasses.LocalizationClassesController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-localization-classes',

        requires: [
            'mh.module.dataView.localizations.localizationClasses.LocalizationClassesLocalization'
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