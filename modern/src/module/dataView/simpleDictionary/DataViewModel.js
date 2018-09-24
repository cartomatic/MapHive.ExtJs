//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.simpleDictionary.DataViewModel', {
        extend: 'mh.module.dataView.DataViewModel',
        alias: 'viewmodel.mh-simple-dictionary-data-view',

        requires: [
            'mh.data.model.SimpleDictionary'
        ],

        stores: {
            gridstore: {
                model: 'mh.data.model.SimpleDictionary'
            }
        }
    });

}());