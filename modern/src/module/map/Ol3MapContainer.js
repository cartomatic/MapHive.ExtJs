//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by info_000 on 04-Aug-16.
     */
    Ext.define('mh.module.map.Ol3MapContainer', {
        extend: 'Ext.Container',
    
        xtype: 'mh-ol3-map-container',

        requires: [
            'mh.module.map.Ol3MapContainerController'
        ],

        controller: 'mh-ol3-map-container',

        items: [

        ],

        listeners: {
            resize: 'onViewResizeM'
        }
    });

}());