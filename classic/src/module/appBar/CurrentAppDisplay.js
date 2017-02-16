(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * provides current app info display facilities
     * Created by domin on 17.02.2017.
     */
    Ext.define('mh.module.appBar.CurrentAppDisplay', {
        extend: 'Ext.Container',
    
        xtype: 'mh-current-app-display',

    requires: [
        'mh.module.appBar.CurrentAppDisplayController'
    ],

    controller: 'mh-current-app-display'
    });
    
}());