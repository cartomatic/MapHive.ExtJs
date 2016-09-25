//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.langs.LangsModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mh-langs',

    requires: [
        'mh.data.model.Lang'
    ],

    stores: {
            gridstore:{
                model: 'mh.data.model.Lang',
                data: []
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here

            }
        }
    });

}());