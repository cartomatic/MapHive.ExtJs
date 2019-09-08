//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.translations.RecordViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.translations.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.translations.DataViewLocalization',
            localization: {
                viewName: {
                    en: 'Translation',
                    pl: 'Tłumaczenie'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());