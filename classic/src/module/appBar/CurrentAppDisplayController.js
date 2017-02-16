(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 17.02.2017.
     */
    Ext.define('mh.module.appBar.CurrentAppDisplayController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-current-app-display',

        mixins: [
            'mh.mixin.UserAppsUtils',
            'mh.communication.MsgBus'
        ],

        init: function(){
            var tunnel = this.getTunnelId();

            this.watchGlobal(
                'root::customhashparam',
                function(value){
                    if(value !== 'true'){

                        //this should do the trick for host app,
                        this.watchGlobal('root::appreloadstart', this.updateAppInfo, this);

                        //need to poke the root to get some apps
                        //this will work in standalone non-host mode
                        this.getApps();
                    }
                },
                this,
                {
                    single: true,
                    tunnel: tunnel
                }
            );
            this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel});
        },

        /**
         * apps retrieved callback
         * @param apps
         */
        onAppsRetrieved: function(apps){
            this.updateAppInfo();
        },

        /**
         * updates displayed app info
         */
        updateAppInfo: function(){
            var currentApp = this.getCurrentApp();
            if(!currentApp){
                return;
            }

            this.getView().setHtml(currentApp.get('name'));
        }
    });
    
}());