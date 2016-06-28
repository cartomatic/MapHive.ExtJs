//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * There seems to be a bloody bug in the TriFilter activate method that shows up when trying to activate a filter programatically
     * therefore need to fix the mess in an override...
     */
    Ext.define('wg.overrides.grid.filters.filter.TriFilter', {
        override: 'Ext.grid.filters.filter.TriFilter',

        /**
         * @private
         * This method will be called when a column's menu trigger is clicked as well as when a filter is
         * activated. Depending on the caller, the UI and the store will be synced.
         */
        activate: function (showingMenu) {
            var me = this,
                filters = me.filter,
                fields = me.fields,
                filter, field, operator, value, isRootMenuItem,

            //NOTE: override begin
                f;
            //NOTE: override end

            if (me.preventFilterRemoval) {
                return;
            }

            for (operator in filters) {
                filter = filters[operator];
                field = fields[operator];
                value = filter.getValue();

                if (value || value === 0) {
                    if (field.isComponent) {
                        field.setValue(value);

                        //NOTE: override begin
                        f = field.up('menuitem');
                        //NOTE: override

                        // Some types, such as Date, have additional menu check items in their Filter menu hierarchy. Others, such as Number, do not.
                        // Because of this, it is necessary to make sure that the direct menuitem ancestor of the fields is not the rootMenuItem (the
                        // "Filters" menu item), which has its checked state controlled elsewhere.
                        //
                        // In other words, if the ancestor is not the rootMenuItem, check it.
                        if (isRootMenuItem === undefined) {

                            //original code
                            //isRootMenuItem = me.owner.activeFilterMenuItem === field.up('menuitem');

                            //NOTE: override begin
                            isRootMenuItem = me.owner.activeFilterMenuItem === f;
                            //NOTE: override
                        }

                        if (!isRootMenuItem) {
                            //this is the original code
                            //field.up('menuitem').setChecked(true, /*suppressEvents*/ true);

                            //NOTE: override begin
                            //but the field seems to not always be there...
                            //in such case use me.owner.activeFilterMenuItem

                            f = f || me.owner.activeFilterMenuItem;

                            if(f){
                                f.setChecked(true, /*suppressEvents*/ true);
                            }
                            //NOTE: override end
                        }
                    } else {
                        field.value = value;
                    }

                    // Note that we only want to add store filters when they've been removed, which means that when Filter.showMenu() is called
                    // we DO NOT want to add a filter as they've already been added!
                    if (!showingMenu) {
                        me.addStoreFilter(filter);
                    }
                }
            }
        }
    });

}());