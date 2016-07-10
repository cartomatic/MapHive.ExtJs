//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localisations.appLocalisations.DataEditFormLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.localisations.appLocalisations.AppLocalisationsLocalisation'
        ],
        statics: {
            extends: 'mh.module.dataView.localisations.appLocalisations.AppLocalisationsLocalisation',
            localisation: {}
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());