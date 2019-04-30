//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcherMiniLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.langSwitcher.LangSwitcherCommonLocalization'
        ],
        statics: {
            inherits: 'mh.module.langSwitcher.LangSwitcherCommonLocalization',
            localization: {
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
