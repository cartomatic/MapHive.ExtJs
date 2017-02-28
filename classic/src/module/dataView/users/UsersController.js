//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-users',

        requires: [
            'mh.module.dataView.users.UsersLocalisation'
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
        }

    });

}());