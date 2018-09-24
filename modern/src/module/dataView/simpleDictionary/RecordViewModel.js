//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.simpleDictionary.RecordViewModel', {
        extend: 'mh.module.dataView.RecordViewModel',
        alias: 'viewmodel.mh-simple-dictionary-record-view'
    });

}());