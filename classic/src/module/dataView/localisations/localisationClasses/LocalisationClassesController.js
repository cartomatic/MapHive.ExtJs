//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.localisationClasses.LocalisationClassesController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-localisation-classes',

        requires: [
            'mh.module.dataView.localisations.localisationClasses.LocalisationClassesLocalisation'
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