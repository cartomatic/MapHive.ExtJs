//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 6/2/2016.
     */
    Ext.define('mh.module.data.BindableStoreGridController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-bindable-store-grid',
    
        /**
         * Called when the view is created
         */
        init: function() {

        },

        /**
         * The actual method that acts as a setter, when using the ViewModel binding. with this component it is possible to add a bind config like this:
         *  bind: {
         *      gridData: '{rec.someRecField}'
         *  }
         *  
         * @param data
         */
        setGridData: function(data){
            console.warn('[BINDABLE STORE GRID] - have you forgotten to provide custom bind function for a BindableStoreGrid?');
        }
    });

}());