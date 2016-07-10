//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.langs.LangsController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mofp-langs',

        requires: [
            'mh.module.dataView.localisations.langs.LangsLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.CallMeParent',
            'mh.mixin.GridUtils'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);
        }
    });

}());