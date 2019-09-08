//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcherCommonLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                en: {
                    en: 'English',
                    pl: 'Angielski'
                },
                pl: {
                    en: 'Polish',
                    pl: 'Polski'
                },
                nl: {
                    en: 'Dutch',
                    pl: 'Holenderski'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
