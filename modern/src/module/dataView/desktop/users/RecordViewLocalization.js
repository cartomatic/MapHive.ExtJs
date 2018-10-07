//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.RecordViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.users.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.users.DataViewLocalization',
            localization: {
                viewName: {
                    en: 'User',
                    pl: 'Użytkownik'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());