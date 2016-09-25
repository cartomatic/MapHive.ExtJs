//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.translationKeys.TranslationKeysModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mh-translation-keys',

    requires: [
        'mh.data.model.TranslationKey'
    ],

    stores: {
            gridstore:{
                model: 'mh.data.model.TranslationKey',
                data: []
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here

            }
        }
    });

}());