//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 4/18/2016.
     */
    Ext.define('mh.module.appBar.AppSwitcherButton', {
        extend: 'Ext.button.Button',
    
        xtype: 'mh-app-switcher-button',

        requires: [
            'mh.module.appBar.AppSwitcherButtonController'
        ],

        controller: 'mh-app-switcher-button',

        config: {
            api: {
                apps: 'dummy.url'
            }
        },

        ui: 'black-button',
        scale: 'medium',
        iconCls: 'x-fa fa-th-large'
    });

}());