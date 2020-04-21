//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.settings.UserSettingsController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-user-settings',

        requires: [
            'mh.module.settings.UserSettingsLocalization',
            'mh.util.DarkMode'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.UserCfg',
            'mh.mixin.ApiMap',
            'mh.mixin.InitialCfg',
            'mh.data.Ajax'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            //phones are different, ya know...
            if(Ext.is.Phone){
                let vw = this.getView(),
                    itemsContainer = vw.lookupReference('itemsContainer');

                //view titles are handled differently
                vw.setHeader(false);

                vw.items.items.forEach(item => {
                    if(item !== itemsContainer){
                        item.hide();
                    }
                });

                itemsContainer.setFlex(1);
                itemsContainer.setWidth(undefined);
                itemsContainer.setPadding(20);
            }
        },

        onDarkModeChange: function(sliderFld, newV, oldV, eOpts){
            mh.util.DarkMode.setUiMode(newV ? 'dark' : 'light');
        },
        onDarkMapModeChange: function(sliderFld, newV, oldV, eOpts){
            mh.util.DarkMode.setMapMode(newV ? 'dark' : 'light');
        },

        onShow: function(){

        }

    });
}());
