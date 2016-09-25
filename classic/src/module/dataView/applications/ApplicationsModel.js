//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.applications.ApplicationsModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mh-applications',

        requires: [
            'mh.data.model.Application',
            'mh.mixin.ApiMap'
        ],

        mixins: [
            'mh.mixin.ApiMap'
        ],

        stores: {
            gridstore: {
                model: 'mh.data.model.Application',
                data: []
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here
            }
        }
    });

}());