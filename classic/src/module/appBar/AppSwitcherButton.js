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
            /**
             * @cfg {string} [appBtnUi='green-button']
             * The default MapHive app switcher app btn - relies on Codaxy's Azzurra or a derived theme. Make sure to reset it by either providing a 'default' theme
             * or whatever you want to use
             */
            appBtnUi: 'green-button',

            /**
             * @cfg {string} [appActiveBtnUi='red-button']
             * The default MapHive app switcher active app btn - relies on Codaxy's Azzurra or a derived theme. Make sure to reset it by either providing a 'default' theme
             * or whatever you want to use
             */
            appActiveBtnUi: 'red-button'
        },

        /**
         * Depends on Codaxy's Azzurra or a derived theme. Make sure to provide own UI in a case Azzurra is not an option
         */
        ui: 'black-button',

        scale: 'medium',
        iconCls: 'x-fa fa-th-large',

        listeners: {
            click: 'onAppSwitcherBtnClick'
        },

        //hide the btn by default - it will only become visible when there is something to show
        hidden: true
    });

}());