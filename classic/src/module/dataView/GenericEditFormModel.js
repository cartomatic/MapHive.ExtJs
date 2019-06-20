//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.GenericEditFormModel', {
        extend: 'Ext.app.ViewModel',

        stores: {
        },

        data: {
            localization: null,
            rec: null
        }
    });

}());