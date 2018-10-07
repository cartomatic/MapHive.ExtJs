//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.RecordViewModel', {
        extend: 'mh.module.dataView.RecordViewModel',
        alias: 'viewmodel.mh-desktop-users-record-view'
    });

}());