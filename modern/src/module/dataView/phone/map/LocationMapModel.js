//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 10.10.2018.
     */
    Ext.define('mh.module.dataView.phone.map.LocationMapModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-phone-location-map',
    
        stores: {

        },
    
        data: {
            localization: null
        }
    });
}());
