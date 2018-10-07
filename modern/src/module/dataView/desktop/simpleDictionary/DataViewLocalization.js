//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.simpleDictionary.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.DataViewLocalization',
            localization: {
                name:{
                    en: 'Name',
                    pl: 'Nazwa'
                },
                description: {
                    en: 'Description',
                    pl: 'Opis'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());