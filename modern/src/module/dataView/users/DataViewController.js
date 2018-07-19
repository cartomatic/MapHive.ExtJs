//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.DataViewController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.users-dataview',

        requires: [
            'mh.module.dataView.users.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });

}());