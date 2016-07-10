//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.appLocalisations.AppLocalisationsModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mofp-app-localisations',

    requires: [
        'mh.data.model.AppLocalisation'
    ],

    stores: {
            gridstore:{
                model: 'mh.data.model.AppLocalisation',
                data: []
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here

            }
        }
    });

}());