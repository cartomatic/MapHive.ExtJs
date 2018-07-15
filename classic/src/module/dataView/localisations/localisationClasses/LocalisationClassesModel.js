//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.localizationClasses.LocalizationClassesModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mh-localization-classes',

    requires: [
        'mh.data.model.LocalizationClass'
    ],

    stores: {
            gridstore:{
                model: 'mh.data.model.LocalizationClass',
                data: []
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here

            }
        }
    });

}());