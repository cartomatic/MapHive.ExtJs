/**
 * provides some extra event hooks for dynamically customizing widgets as they get bound by a grid
 */
Ext.define('mh.overrides.grid.cell.Widget', {

    override: 'Ext.grid.cell.Widget',

    config:{
        /**
         * @cfg whether or not component should expose extra events; defaults to false
         */
        exposeExtraEvents: false
    },

    /**
     * make set rec fire event, so it is possible to make the widget dynamic
     * @param rec
     * @returns {*}
     */
    setRecord: function(rec){

        if(this.getExposeExtraEvents()){
            this.fireEvent('recordset', this, rec);
        }

        return this.callParent(arguments);
    }

});