//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 18.07.2018.
     */
    Ext.define('mh.module.orgContextSwitcher.OrgContextSwitcherDesktopLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                orgSwitcherTitle: {
                    en: 'Organizations',
                    pl: 'Organizacje'
                },
                orgSwitcherBtn: {
                    en: 'Organizations',
                    pl: 'Organizacje'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
