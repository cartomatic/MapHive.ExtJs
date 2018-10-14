//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 14.10.2018.
     */
    Ext.define('mh.module.dataView.phone.photo.MultiSnap', {
        extend: 'Ext.TabPanel',
    
        xtype: 'mh-phone-photo-multi-snap',

        requires: [
            'mh.module.dataView.phone.photo.MultiSnapController'
        ],

        controller: 'mh-phone-photo-multi-snap',

        tabBarPosition: 'bottom'

    });
}());
