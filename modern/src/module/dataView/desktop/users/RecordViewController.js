//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.RecordViewController', {
        extend: 'mh.module.dataView.desktop.RecordViewController',
        alias: 'controller.mh-desktop-users-record-view',

        requires: [
            'mh.module.dataView.desktop.users.RecordViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });
}());