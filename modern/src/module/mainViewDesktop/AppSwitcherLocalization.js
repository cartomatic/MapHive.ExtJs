//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 16.07.2018.
     */
    Ext.define('mh.module.mainViewDesktop.AppSwitcherLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                appSwitcherTitle: {
                    en: 'Applications',
                    pl: 'Aplikacje'
                },
                appSwitcherBtn: {
                    en: 'Applications',
                    pl: 'Aplikacje'
                },
                search: {
                    en: 'Search',
                    pl: 'Szukaj'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
