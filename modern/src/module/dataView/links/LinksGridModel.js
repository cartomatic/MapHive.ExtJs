//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.links.LinksGridModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-links-grid',
    
        stores: {
            //gridstore set up dynamically
        },
    
        data: {
        }
    });
}());
