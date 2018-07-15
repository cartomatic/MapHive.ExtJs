//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.EmailTemplatesController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-email-templates',

        requires: [
            'mh.module.dataView.localizations.emailTemplates.EmailTemplatesLocalization'
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
        }
    });

}());