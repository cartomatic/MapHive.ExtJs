//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.applications.DataEditFormLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.applications.ApplicationsLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.applications.ApplicationsLocalization',
            localization: {}
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());