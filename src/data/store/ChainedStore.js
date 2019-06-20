//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * A chained store that can be used as a regular store - so basically with plugins such as pull refresh, paging toolbar, etc.
     */
    Ext.define('mh.data.store.ChainedStore', {
        extend: 'Ext.data.ChainedStore',

        alias: 'store.mh-chained-store',

        fetch: function(loadOptions){
            this.source.fetch.apply(this.source, arguments);
        },

        loadRecords: function(){
            this.source.loadRecords.apply(this.source, arguments);
        }

    });
}());
