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
        },

        onDarkModeChange: function(sliderFld, newV, oldV, eOpts){
            mh.util.DarkMode.setUiMode(newV ? 'dark' : undefined);
        },

        onShow: function(){

        }

    });
}());
