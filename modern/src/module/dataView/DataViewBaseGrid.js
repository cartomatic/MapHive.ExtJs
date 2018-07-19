//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * base configuration for a dataview grid
     */
    Ext.define('mh.module.dataView.DataViewBaseGrid', {
        extend: 'Ext.grid.Grid',

        xtype: 'mh-dataview-base-grid',

        reference: 'dataview-grid',

        selectable: {
            mode: 'multi'
        },

        requires: [
            'Ext.grid.plugin.PagingToolbar'
        ],

        plugins: [{
            type: 'pagingtoolbar'
        }],

        listeners: {
            childdoubletap: 'onGridRowDblTap'
        },

        itemCls: 'x-listitem-listing'
    });
}());