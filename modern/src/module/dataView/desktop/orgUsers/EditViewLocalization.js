//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.orgUsers.EditViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.orgUsers.RecordViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.orgUsers.RecordViewLocalization',
            localization: {
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
