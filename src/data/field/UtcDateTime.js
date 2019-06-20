//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * datetime field for handling UTC DateTimes;
     */
    Ext.define('mh.data.field.UtcDateTime', {
        extend: 'Ext.data.field.Date',

        alias: 'data.field.mh-date-time',

        convert: function(v, record){
            if(Ext.isDate(v)){
                return v;
            }
            if(Ext.isString(v)){
                return Ext.Date.parse(v, 'c');
            }
        },
        serialize: function(v){
            if(v && v instanceof Date) {
                return Ext.Date.format(v, 'C');
            }
            else{
                return null;
            }
        }

    });

}());