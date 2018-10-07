//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.users.EditViewController', {
        extend: 'mh.module.dataView.desktop.EditViewController',
        alias: 'controller.mh-desktop-users-edit-view',

        requires: [
            'mh.module.dataView.desktop.users.EditViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });
}());
