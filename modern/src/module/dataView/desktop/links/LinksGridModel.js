//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.links.LinksGridModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-desktop-links-grid',
    
        stores: {
            gridstore: {
                model: 'mh.data.model.Base'
            }
        },
    
        data: {
            localization: null // so data does not leak up the view model stack
        }
    });
}());
