//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcherController', {

        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-lang-switcher',

        requires: [
            'mh.module.langSwitcher.LangSwitcherLocalization'
        ],

        mixins: [
            'mh.mixin.Localization'
        ],

        init: function() {

            this.injectLocalizationToViewModel();

            var me = this,
                store = this.getViewModel().getStore('langs');

            //need to load langs store for combo
            store.loadData(mh.localization.Localization.getSupportedLangs());
            //translate langs
            store.each(function(rec){
                rec.set('name', me.getTranslation(rec.get('code')));
                rec.set('icon', me.getFlagIcon(rec.get('code')));
            });

            //and set current lang
            this.lookupReference('combo').setValue(mh.localization.Localization.langCode);
            this.lookupReference('icon').setSrc(this.getFlagIcon(mh.localization.Localization.langCode));

        },

        getFlagIcon: function(lng){
            var lngIcon = 'mh/resources/images/lang-flags/' + lng + '.png';

            //<debug>
            lngIcon = 'packages/local/mh/resources/images/lang-flags/' + lng + '.png';
            //</debug>

            return lngIcon;
        },


        /**
         * lang combo change evt handler
         * @param cmb
         * @param newV
         * @param oldV
         */
        onLangChange: function(cmb, newV, oldV){
            mh.localization.Localization.switchLang(newV);
        }

    });
}());
