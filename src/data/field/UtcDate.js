//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * date field to express date as UTC Date without the time part;
     */
    Ext.define('mh.data.field.UtcDate', {
        extend: 'Ext.data.field.Date',

        alias: 'data.field.mh-date',

        convert: function(v, record){
            if(Ext.isDate(v)){
                return v;
            }
            if(Ext.isString(v)){
                //this expect iso time input, so simply parse it
                return Ext.Date.parse(v.split('T')[0], 'c');
            }
        },
        serialize: function(v){
            //just a date, so ignore the time part
            if(v && v instanceof Date) {
                return Ext.Date.format(v, 'Y-m-d') + 'T00:00:00Z';
            }
            else{
                return null;
            }
        }

    });

}());