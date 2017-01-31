//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.overrides.grid.filters.Filters', {

        override: 'Ext.grid.filters.Filters',

        /**
         * When store is set to use remote filters, grid has the filters set up, autoLoad property of store gets ignored
         * https://www.sencha.com/forum/showthread.php?305380-Store-autoLoad-false-is-ignored-if-remoteFilter-is-true-and-there-are-filters-in-Grid
         * @param grid
         * @param store
         * @param columns
         * @param oldStore
         */
        onReconfigure: function(grid, store, columns, oldStore) {
            var me = this,
                filterMenuItem = this.filterMenuItem,
                changed = oldStore !== store,
                key;

            // The Filters item's menu should have already been destroyed by the time we get here but
            // we still need to null out the menu reference.
            if (columns) {
                for (key in filterMenuItem) {
                    filterMenuItem[key].setMenu(null);
                }
            }

            if (store) {
                if (oldStore && !oldStore.destroyed && changed) {
                    me.resetFilters(oldStore);
                }

                if (changed) {
                    me.bindStore(store);

                    //Note: this is the line that triggers store reload even if store is configured with autoLoad: false
                    //me.applyFilters(store);
                }
            }

            me.initColumns();
        }

    });

}());