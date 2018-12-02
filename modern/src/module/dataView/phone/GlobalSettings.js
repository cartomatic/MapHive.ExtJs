//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.GlobalSettings', {
        singleton: true,

        wizardPagingToolbar: {
            btnWidth: undefined,
            btnHeight: undefined
        },
        dataView: {
            btnWidth: undefined,
            btnHeight: undefined
        },
        recView: {
            btnWidth: undefined,
            btnHeight: undefined
        },
        locationMap: {
            btnWidth: undefined,
            btnHeight: undefined
        },
        navMenu: {
            btnWidth: undefined,
            btnHeight: undefined
        }
    });
}());
