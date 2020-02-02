//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.settings.UserSettingsModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-user-settings',

        requires: [
            'mh.util.DarkMode'
        ],

        data: {
            /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
        },

        formulas: {
            darkMode: {
                bind: {
                    bindTo: mh.util.DarkMode.darkModeOn,
                    deep: true
                },
                get: function(darkModeOn){
                    return darkModeOn;
                }
            }
        }
    });
}());
