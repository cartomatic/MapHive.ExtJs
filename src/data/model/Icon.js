//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * simple representation of an icon to be used in icon stores;
     * meant to be used with the standardised font icons
     */
    Ext.define('mh.data.model.Icon', {
        extend: 'Ext.data.Model',
    
        fields: [
            /**
             * key an icon font char is addressed by
             */
            { name: 'key', type: 'string' },
            /**
             * displayable icon name
             */
            { name: 'name', type: 'string' },
            /**
             * css prefix as defined in a fonts package
             */
            { name: 'cssPrefix', type: 'string' },
            /**
             * font name
             */
            { name: 'font', type: 'string' }
        ]
    });
    
}());