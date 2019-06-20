//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 09.10.2018.
     */
    Ext.define('mh.module.dataView.phone.dictionary.DictionaryPickList', {
        extend: 'Ext.Panel',
    
        xtype: 'mh-phone-dictionary-pick-list',

        requires: [
            'mh.module.dataView.phone.dictionary.DictionaryPickListController'
        ],

        controller: 'mh-phone-dictionary-pick-list',

        header: {
            titleAlign: 'center'
        },

        ui: 'mh-phone-dict-pick-list-panel',

        scrollable: 'y',
        bodyPadding: 10,
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    });
}());
