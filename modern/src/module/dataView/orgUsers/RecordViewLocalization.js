//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.orgUsers.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.orgUsers.DataViewLocalization',
            localization: {
                viewName: {
                    en: 'Organization user',
                    pl: 'Użytkownik'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());