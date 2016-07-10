//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localisations.langs.DataEditFormLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.localisations.langs.LangsLocalisation'
        ],
        statics: {
            inherits: 'mh.module.dataView.localisations.langs.LangsLocalisation',
            localisation: {}
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());