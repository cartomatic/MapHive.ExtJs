//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    /**
     * composite data view for showing more than one view in one screen
     */
    Ext.define('mh.module.dataView.desktop.CompositeDataView', {

        extend: 'Ext.TabPanel',

        xtype: 'mh-desktop-composite-data-view',

        requires: [
            'mh.module.dataView.desktop.CompositeDataViewController'
        ],

        controller: 'mh-desktop-composite-dataview'
    });
}());
