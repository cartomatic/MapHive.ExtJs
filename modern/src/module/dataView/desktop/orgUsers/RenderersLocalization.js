//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.RenderersLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                externalUser: {
                    en: 'Global user',
                    pl: 'Użytkownik globalny'
                },
                orgUser: {
                    en: 'Local user',
                    pl: 'Użytkownik lokalny'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());