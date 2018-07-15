//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Plugs in localization utilities into other classes
     */
    Ext.define('mh.mixin.Localization', {

    requires: [
        'mh.localization.Localization'
    ],

    /**
         * Retrieves a value of a translation string for a specified namespace (or if not provided works out the namespace based on a class calling a method)
         * @param {string} translationKey
         * @param {string} [namespace]
         * @param {boolean} suppressWarningReturn
         * if true, null is returned instead of a warning msg; useful to test a couple of translations before defaulting to an own one
         */
        getTranslation: function(translationKey, namespace, suppressWarningReturn){
            if(!namespace){
                namespace = Ext.getClassName(this);
            }
            return mh.localization.Localization.getTranslation(translationKey, namespace, null, suppressWarningReturn);
        },

        /**
         * Injects all the translations registered for given namespace and injects them into a view model; handy when binding the UI to view model.
         * @param namespace
         */
        injectLocalizationToViewModel: function(namespace){
            if(!namespace){
                namespace = Ext.getClassName(this);
            }
            var translationKeys = mh.localization.Localization.getTranslationKeys(namespace, true),
                tk = 0, tklen = translationKeys.length,
                localization = {};

            for(tk; tk < tklen; tk++){
                localization[translationKeys[tk]] = this.getTranslation(translationKeys[tk], namespace);
            }

            this.getViewModel().set('localization', localization);
        }
    });

}());