//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.mainViewDesktop.AppSwitcherModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-app-switcher',

        stores: {
            apps: {
                model: 'mh.data.model.Application'
            }
        }
    });
}());
