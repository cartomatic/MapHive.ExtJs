//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.localization.LocalizationLocalization', {
        requires: [
        ],
        statics: {
            localization: {
                langSwitchMask: {
                    en: 'Changing language...',
                    pl: 'Zmienianie języka...'
                },
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
        //do not register localization here, as the localization class is not present yet.
        //localization class requires this class and it would cause a sencha loader deadlock if this class required the localization
        //instead, the localization class registers own translations explicitly
        //mh.localization.Localization.registerTranslations(this);
    });
}());
