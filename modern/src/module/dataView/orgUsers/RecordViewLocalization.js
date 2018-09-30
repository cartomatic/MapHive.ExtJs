//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.RecordViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.users.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.users.DataViewLocalization',
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