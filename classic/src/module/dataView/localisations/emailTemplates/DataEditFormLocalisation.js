//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localisations.emailTemplates.DataEditFormLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.localisations.emailTemplates.EmailTemplatesLocalisation'
        ],
        statics: {
            inherits: 'mh.module.dataView.localisations.emailTemplates.EmailTemplatesLocalisation',
            localisation: {}
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());