//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    /**
     * composite data view for showing more than one view in one screen
     */
    Ext.define('mh.module.dataView.CompositeDataViewDesktop', {

        extend: 'Ext.TabPanel',

        xtype: 'mh-composite-data-view-desktop',

        requires: [
            'mh.module.dataView.CompositeDataViewDesktopController'
        ],

        controller: 'mh-composite-dataview',

        cls: 'mh-composite-dataview'
    });
}());
