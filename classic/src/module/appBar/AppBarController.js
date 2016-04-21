//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 4/18/2016.
     */
    Ext.define('mh.module.appBar.AppBarController', {

        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-app-bar',

        requires: [
            'Ext.button.Button',
            'mh.module.appBar.AppSwitcherButton'
        ],

        mixins: [
            'mh.communication.MsgBus'
        ],

        /**
         * @event root::getcustomhashparam
         * fired in order to obtain some data off the root controller
         */

        /**
         * constructor initialisation
         */
        init: function(){

            //check if the tbar should be visible, or it should be suppressed
            var tunnel = (new Date()).getTime();
            this.watchGlobal(
                'root::customhashparam',
                function(value){
                    if(value !== 'true'){
                        this.getView().show();
                    }
                },
                this,
                {
                    single: true,
                    tunnel: tunnel
                }
            );
            this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel});
        }

    });

}());