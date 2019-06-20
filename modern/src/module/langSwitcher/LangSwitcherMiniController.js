//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcherMiniController', {

        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-lang-switcher-mini',

        requires: [
            'mh.module.langSwitcher.LangSwitcherMiniLocalization'
        ],

        mixins: [
            'mh.mixin.Localization'
        ],

        init: function() {

            this.injectLocalizationToViewModel();

            this.getView().setIcon(this.getFlagIcon(mh.localization.Localization.langCode));

            var langs = [];

            Ext.Array.each(mh.localization.Localization.getSupportedLangs(), function(lng){
                langs.push({
                    xtype: 'menuitem',
                    icon:  this.getFlagIcon(lng.code),
                    iconCls: this.getFlagIconCls(),
                    text: this.getTranslation(lng.code),
                    lng: lng.code,
                    handler: function(menuItem){
                        mh.localization.Localization.switchLang(menuItem.lng);
                    }
                });
            }, this);

            this.getView().setMenu({
                xtype: 'menu',
                items: langs
            });
        },

        getFlagIcon: function(lng){
            var lngIcon = 'mh/resources/images/lang-flags/' + lng + '.png';

            //<debug>
            lngIcon = 'packages/local/mh/resources/images/lang-flags/' + lng + '.png';
            //</debug>

            return lngIcon;
        },

        getFlagIconCls: function(){
            return Ext.manifest.profile === 'phone' ? 'mh-lang-switcher-mini-menu-flag-phone' : 'mh-lang-switcher-mini-menu-flag-desktop';
        }

    });
}());
