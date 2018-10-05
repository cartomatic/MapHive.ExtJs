//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on

    'use strict';
    Ext.define('mh.module.dataView.EditViewMobile', {
        extend: 'mh.module.dataView.RecordViewMobile',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.EditViewModel',
            'mh.module.dataView.EditViewMobileController',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-edit-view-mobile',

        viewModel: {
            type: 'mh-edit-view'
        },

        config: {
            /**
             * by default models use whatever url is defined on their proxies.
             * This enables customising urls but only for the needed save operation (either create or update)
             */
            customUrl: null
        },

        bind: {
            iconCls: '{viewIcon}'
        }

    });
}());