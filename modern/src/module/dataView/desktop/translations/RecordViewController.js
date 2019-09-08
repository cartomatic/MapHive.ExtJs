//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.RecordViewController', {
        extend: 'mh.module.dataView.desktop.RecordViewController',
        alias: 'controller.mh-desktop-translations-record-view',

        requires: [
            'mh.module.dataView.desktop.translations.RecordViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });
}());