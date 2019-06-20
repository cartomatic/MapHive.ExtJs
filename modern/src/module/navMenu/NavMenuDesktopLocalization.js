//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.navMenu.NavMenuDesktopLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.navMenu.NavMenuLocalization'
        ],
        statics: {
            inherits: 'mh.module.navMenu.NavMenuLocalization',
            localization: {
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
    
}());