//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-users-record-view',

        requires: [
            'mh.module.dataView.orgUsers.RecordViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });
}());