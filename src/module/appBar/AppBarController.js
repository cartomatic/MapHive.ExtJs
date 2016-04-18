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
            'mh.module.appBar.AppSwitcherButton'
        ],

        init: function(){

            //because need to pass some cfg to the child objects, they are inited here!
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