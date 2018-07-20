//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on

    'use strict';
    Ext.define('mh.module.dataView.RecordViewModel', {
        extend: 'Ext.app.ViewModel',

        alias: 'viewmodel.mh-record-viewer-base',

        mixins: [
            'mh.mixin.Localization'
        ],

        data: {
            record: null,
            localization: null
        }
    });
}());