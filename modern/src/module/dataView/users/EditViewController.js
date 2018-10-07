//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.users.EditViewController', {
        extend: 'mh.module.dataView.EditViewDesktopController',
        alias: 'controller.mh-users-edit-view',

        requires: [
            'mh.module.dataView.users.EditViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });
}());
