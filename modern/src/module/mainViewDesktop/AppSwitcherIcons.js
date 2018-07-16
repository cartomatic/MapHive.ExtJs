//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.mainViewDesktop.AppSwitcherIcons', {
        singleton: true,

        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function() {
            mh.FontIconsDictionary.addIcons({
                appSwitcherApps: 'x-i54 i54-multy-task-2'
            });
        }
    });
}());
