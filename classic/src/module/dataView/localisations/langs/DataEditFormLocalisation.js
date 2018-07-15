//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.localizations.langs.DataEditFormLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.localizations.langs.LangsLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.localizations.langs.LangsLocalization',
            localization: {}
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());