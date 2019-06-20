//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.localizationClasses.LocalizationClassesLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewBaseLocalization'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalization',

            localization:{
                gridTitle: {
                    en: 'Localization classes',
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
        mh.localization.Localization.registerTranslations(this);
    });

}());