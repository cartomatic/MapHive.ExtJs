//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Base ol container that does not enforce any specific ol3 (or newer) version.
     * Derive from this class if there is a need to provide a specific ol version
     */
    Ext.define('mh.module.map.Ol3MapContainerBase', {
        extend: 'Ext.Container',
    
        xtype: 'mh-ol3-map-container-base',

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