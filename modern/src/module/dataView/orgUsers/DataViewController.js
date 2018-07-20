//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.DataViewController', {
        extend: 'mh.module.dataView.users.DataViewController',
        alias: 'controller.mh-org-users-data-view',

        requires: [
            'mh.module.dataView.orgUsers.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });

}());