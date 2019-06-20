//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * base configuration for a dataview grid
     */
    Ext.define('mh.module.dataView.desktop.DataViewGrid', {
        extend: 'Ext.grid.Grid',

        xtype: 'mh-desktop-data-view-grid',

        reference: 'dataviewgrid',

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