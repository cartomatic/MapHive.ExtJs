//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.localisationClasses.DataEditFormController', {
        extend: 'mh.module.dataView.GenericEditFormController',
        alias: 'controller.mh-localisation-classes-data-edit-form',

        requires: [
            'mh.module.dataView.localisations.localisationClasses.DataEditFormLocalisation'
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
        }
    });

}());