//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on

    'use strict';
    Ext.define('mh.module.dataView.phone.EditView', {
        extend: 'mh.module.dataView.phone.RecordView',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.EditViewModel',
            'mh.module.dataView.phone.EditViewController',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-mobile-edit-view',

        viewModel: {
            type: 'mh-edit-view'
        },

        config: {
            /**
             * by default models use whatever url is defined on their proxies.
             * This enables customising urls but only for the needed save operation (either create or update)
             */
            customUrl: null,

            /**
             * whether or not the default edit view save btn should be visible
             */
            enableSave: true
        },

        bind: {
            iconCls: '{viewIcon}'
        },

        header: false,

        items: [

        ]

    });
}());