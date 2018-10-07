//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.RecordView', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.RecordViewController',
            'mh.module.dataView.RecordViewModel',
            'mh.module.dataView.Icons',
            'mh.FontIconsDictionary'
        ],

        controller: 'mh-mobile-record-view',

        viewModel: {
            type: 'mh-record-view'
        },

        config: {
            /**
             * whether or not edit btn should be enabled for this view
             */
            enableEdit: true
        },

        bind: {
            title: '{record.name}'
        },

        layout: 'fit',

        items: [
        ],

        listeners: {
            activate: 'onViewActivate',
            deactivate: 'onViewDeactivate'
        }
    });
}());