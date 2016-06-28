//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * A simple 'bindable-store' grid; pretty much only to make the binding of store data to view model possible
     */
    Ext.define('mh.module.data.BindableStoreGrid', {
        extend: 'Ext.grid.Panel',

        xtype: 'mh-bindable-store-grid',

    requires: [
        'mh.module.data.BindableStoreGridController'
    ],

    controller: 'mh-bindable-store-grid',

        /**
         * just delegates the work to a controller, so it gets properly encapsulated; exposing this property makes it possible to use the ViewModel binder as it looks for a function that is a setter for a property - the standard is - setter name = setPropertyName (the usual stuff)
         * @param data
         */
        setGridData: function(data){
            this.getController().setGridData(data);
        }
    });

}());