//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.RecordViewMobile', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.RecordViewMobileController',
            'mh.module.dataView.RecordViewModel',
            'mh.module.dataView.Icons',
            'mh.FontIconsDictionary'
        ],

        controller: 'mh-record-view-mobile',

        viewModel: {
            type: 'mh-record-view'
        },

        bind: {
            title: '{record.name}'
        },

        layout: 'fit',

        items: [
            {
                xtype: 'container',
                reference: 'content'
            },
            {
                xtype: 'button',
                reference: 'editBtn',
                disabled: false,
                floated: true,
                ui: 'confirm round',
                displayed: true,
                right: 10,
                top: 50,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewEdit')
            }
        ]
    });
}());