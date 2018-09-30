//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.orgUsers.EditViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.orgUsers.RecordViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.orgUsers.RecordViewLocalization',
            localization: {
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
