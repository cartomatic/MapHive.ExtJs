//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 09.10.2018.
     */
    Ext.define('mh.module.dataView.phone.DictionaryPickList', {
        extend: 'Ext.Container',
    
        xtype: 'mh-phone-dictionary-pick-list',

        requires: [
            'mh.module.dataView.phone.DictionaryPickListController'
        ],

        controller: 'mh-phone-dictionary-pick-list'
    });
}());
