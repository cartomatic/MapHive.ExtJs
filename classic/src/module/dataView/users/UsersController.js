//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.UsersController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-users',

        requires: [
            'mh.module.dataView.desktop.users.UsersLocalization'
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