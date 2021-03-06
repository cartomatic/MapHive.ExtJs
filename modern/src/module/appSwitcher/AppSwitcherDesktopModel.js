//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.appSwitcher.AppSwitcherDesktopModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-app-switcher-desktop',

        requires: [
            'mh.data.model.Application'
        ],

        stores: {
            apps: {
                model: 'mh.data.model.Application'
            }
        }
    });
}());
