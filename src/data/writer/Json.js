//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.writer.Json', {
        extend: 'Ext.data.writer.Json',
        alias : 'writer.mhjson',

        //so a full record is sent on put
        writeAllFields: true
    });
}());
