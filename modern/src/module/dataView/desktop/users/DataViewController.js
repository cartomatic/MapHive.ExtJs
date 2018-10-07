//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.DataViewController', {
        extend: 'mh.module.dataView.desktop.DataViewController',
        alias: 'controller.mh-desktop-users-data-view',

        requires: [
            'mh.module.dataView.desktop.users.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });

}());