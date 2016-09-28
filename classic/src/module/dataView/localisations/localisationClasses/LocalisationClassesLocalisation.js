//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.localisationClasses.LocalisationClassesLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.DataViewBaseLocalisation'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalisation',

            localisation:{
                gridTitle: {
                    en: 'Localisation classes',
                    pl: 'Klasy tłumaczeń'
                },
                applicationName: {
                    en: 'Application',
                    pl: 'Aplikacja'
                },
                className: {
                    en: 'Class name',
                    pl: 'Klasa'
                },
                inheritedClassName: {
                    en: 'Inherits from',
                    pl: 'Dziedziczy po'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());