//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 09.10.2018.
     */
    Ext.define('mh.module.dataView.phone.DictionaryPickListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-dictionary-pick-list',
    
        /**
         * Called when the view is created
         */
        init: function() {
            this.publishApi('getDictValuesCount');
        },

        /**
         * returns a count of configured dictionary values for this pick list
         */
        getDictValuesCount: function(){
            //TODO
            return 3;
        }
    });
}());
