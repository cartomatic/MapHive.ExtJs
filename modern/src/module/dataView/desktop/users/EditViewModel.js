//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.users.EditViewModel', {
        extend: 'mh.module.dataView.EditViewModel',
        alias: 'viewmodel.mh-desktop-users-edit-view'
    });
}());
