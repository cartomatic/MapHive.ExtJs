(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 21-Jul-16.
     */
    Ext.define('mh.data.field.Time', {
        extend: 'Ext.data.field.Date',

        alias: 'data.field.mh-time',

        convert: function(v, rec){
            if(Ext.isNumber(v)){
                return new Date(v);
            }
            else if(Ext.isDate(v)){
                return v;
            }
            else if(Ext.isString(v)){
                return Ext.Date.parse(v, 'H:i:s');
            }
            else {
                return null;
            }
        },

        serialize: function(v){
            return Ext.Date.format(v, 'H:i:s')
        }

    });
}());