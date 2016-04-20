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
            this.watchGlobal(
                'root::customhashparam_suppress-app-toolbar',
                function(value){
                    if(value !== 'true'){
                        this.getView().show();
                    }
                },
                this,
                {single: true}
            );
            this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar')

            //Note:
            //because there is a need to pass some cfg to the child objects, they are configured here, not through the standard UI declaration!
            //This is still lazy-loading, although since got here the child comps initialisation will happen straight after that.
            //after all a view controller kicks in whenever a view is instantiated

            var v = this.getView(),
                api = v.getApi();

            v.add([
                {
                    xtype: 'mh-app-switcher-button',
                    api:{
                        apps: api.apps
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'some other btn'
                }
                //spacer
                //userinfo
                //spacer
                //cfg btn
            ]);

        }

    });

}());