//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.appBar.AppSwitcherButton', {
        extend: 'Ext.button.Button',
    
        xtype: 'mh-app-switcher-button',

        requires: [
            'mh.module.appBar.AppSwitcherButtonController'
        ],

        controller: 'mh-app-switcher-button',

        config: {
            /**
             * @cfg {string} [appBtnUi='default']
             * The default MapHive app switcher app btn - use whatever ui your theme provides
             */
            appBtnUi: 'default',

            /**
             * @cfg {string} [appActiveBtnUi='red-button']
             * The default MapHive app switcher active app btn - use whatever ui your theme provides
             */
            appActiveBtnUi: 'default'
        },

        /**
         * Depends on Codaxy's Azzurra or a derived theme. use whatever ui your theme provides
         */
        ui: 'default',

        scale: 'medium',
        iconCls: 'x-i54 i54-multy-task-2',

        listeners: {
            click: 'onAppSwitcherBtnClick'
        },

        //hide the btn by default - it will only become visible when there is something to show
        hidden: true
    });

}());