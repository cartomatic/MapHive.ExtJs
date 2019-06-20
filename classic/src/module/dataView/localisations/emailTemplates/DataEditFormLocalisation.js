//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localizations.emailTemplates.DataEditFormLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.localizations.emailTemplates.EmailTemplatesLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.localizations.emailTemplates.EmailTemplatesLocalization',
            localization: {}
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());