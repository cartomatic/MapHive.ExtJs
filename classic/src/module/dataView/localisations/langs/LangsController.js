//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.langs.LangsController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-langs',

        requires: [
            'mh.module.dataView.localizations.langs.LangsLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
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