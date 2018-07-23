//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.RecordViewModel', {
        extend: 'mh.module.dataView.RecordViewModel',
        alias: 'viewmodel.mh-users-record-view'
    });

}());