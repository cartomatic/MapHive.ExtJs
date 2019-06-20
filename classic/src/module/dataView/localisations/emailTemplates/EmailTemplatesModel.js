//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.emailTemplates.EmailTemplatesModel', {
        extend: 'mh.module.dataView.DataViewBaseModel',
        alias: 'viewmodel.mh-email-templates',

    requires: [
        'mh.data.model.EmailTemplateLocalization'
    ],

    stores: {
            gridstore:{
                model: 'mh.data.model.EmailTemplateLocalization',
                data: []
                //Note: autoLoad, remoteSort, remoteFilter is automatically set to true in the dataview base and override whatever may be set here

            }
        }
    });

}());