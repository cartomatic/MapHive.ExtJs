//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localisations.localisationClasses.DataEditFormLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.localisations.localisationClasses.LocalisationClassesLocalisation'
        ],
        statics: {
            inherits: 'mh.module.dataView.localisations.localisationClasses.LocalisationClassesLocalisation',
            localisation: {}
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());