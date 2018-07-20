//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.RecordViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-users-record-viewer',
        stores: {
        }
    });

}());