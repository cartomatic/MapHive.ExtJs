//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * localisation service; meant to be used as a mixin
     */
    Ext.define('mh.localisation.Localisation', {
        singleton: true,

        mixins: [
            'mh.mixin.InitialCfg',
            'mh.communication.MsgBus',
            'mh.util.console.Formatters'
        ],

        /**
         * current lang code as detected on init (supplied by the server side)
         */
        langCode: null,

        /**
         * default lang code to be used if a translation is missing for a recognised lang;
         * this should be the lang the code is written in, so there is always a translation available
         */
        defaultLangCode: 'en',

        /**
         * Creates an instance
         */
        constructor: function(){
            //suck in server supplied translations
            this.translations = this.getMhCfgProperty('localisation') || {};
            this.defaultLangCode = this.getMhCfgProperty('defaultLangCode') || this.defaultLangCode;
            this.langCode = this.getMhCfgProperty('langCode') || this.defaultLangCode;

        },

        /**
         * @property {Object}
         * A collection of translation strings - dictionary - class name -> translation string -> lang code -> translation
         */
        translations: null,

        /**
         *
         * @param translationsClass
         */
        registerTranslations: function(translationsClass){
            //basically translations are defined as statics. problems pop out when inheriting translations.
            //therefore need to check a superclass of a translations class and if it exists and has its own translations, need to re-register them
            //for this class too
            //so first own translations are registered
            this.registerTranslationsInternal(translationsClass.localisation, Ext.getClassName(translationsClass));

            //and then the base class translations, as they should not override the parent!
            this.registerSuperclassTranslations(translationsClass);
        },

        /**
         * registers superclass translations
         * @param translationsClass
         * @param namespace
         */
        registerSuperclassTranslations: function(translationsClass, namespace){
            if(!namespace) {
                namespace = Ext.getClassName(translationsClass);
            }

            var superClassName = Ext.getClassName(translationsClass.superclass),
                classNameParts, cnp, cnplen,
                root;

            //if the class inherits, and not from base, then see if there are any translations to register
            if(translationsClass.superclass && superClassName !== '' && superClassName !== 'Ext.Base'){
                //grab a ref to a class
                classNameParts = superClassName.split('.');
                cnp = 0; cnplen = classNameParts.length;
                root = window;

                for(cnp; cnp < cnplen; cnp++){
                    //Note: since class name is known by ext, it should be safe to dig in this way without risking null refs
                    root = root[classNameParts[cnp]];
                }

                if(root.localisation){
                    //at this stage should have a ref to a base class, so can register translations:
                    this.registerTranslationsInternal(root.localisation, namespace);
                }

                //also continue up the inheritance chain
                this.registerSuperclassTranslations(root, namespace);
            }
        },

        /**
         * Registers newTranslations for a particular namespace
         * @param {Object} newTranslations - an object containing new translations for a namespace
         * @param {String} namespace
         */
        registerTranslationsInternal: function(newTranslations, namespace){
            var key = this.getTranslationNamespace(namespace),
                currentTranslations = this.translations[key],
                translationKeys, translationKey, tk, tklen,
                currentTranslationsForKey,
                translationsForKey,
                langCodes, langCode, lc, lclen;

            //by default the server provided newTranslations are more important than the locally coded ones.
            //since the server newTranslations are loaded in bulk on init, when registering newTranslations, it is required to only supply the ones
            //that have not yet been provided



            //initially use the newTranslations specified in code
            if(!currentTranslations){
                this.translations[key] = newTranslations;
            }
            else {
                //whoaa, looks like there is some serverside based data, so need to make sure what is being added as defined in code!

                //just test the incoming translation keys - server does not have to override everything. Even though it will usually be the case
                translationKeys = Ext.Object.getKeys(newTranslations);
                tk = 0; tklen = translationKeys.length;


                for(tk; tk < tklen; tk++){
                    translationKey = translationKeys[tk];

                    currentTranslationsForKey = currentTranslations[translationKey];
                    translationsForKey = newTranslations[translationKey];

                    //if no translations for a given key is provided from the backend side, just override it completely
                    if(!currentTranslationsForKey){
                        //only apply the translations if there is something. no point in adding a key with undefined value
                        if(translationsForKey) {
                            currentTranslations[translationKey] = translationsForKey;
                        }
                    }
                    else {
                        //ok, looks like server does have something for given translation string, so override it lang by lang
                        langCodes = Ext.Object.getKeys(translationsForKey);
                        lc = 0; lclen = langCodes.length;

                        for(lc; lc < lclen; lc++){
                            langCode = langCodes[lc];

                            if(!currentTranslationsForKey[langCode]){
                                currentTranslationsForKey[langCode] = translationsForKey[langCode];
                            }
                        }
                    }
                }
            }
        },

        /**
         * Retrieves a value of a translation key for a specified namespace
         * @param {string} translationKey
         * @param {string} namespace
         * @param {string} [langCode]
         * @param {boolean} [suppressWarningReturn]
         * if true, null is returned instead of a warning msg; useful to test a couple of translations before defaulting to an own one
         */
        getTranslation: function(translationKey, namespace, langCode, suppressWarningReturn){

            if(!langCode){
                langCode = this.langCode;
            }

            namespace = this.getTranslationNamespace(namespace);

            var me = this,
                getTranslation = function(langCode){
                    if(me.translations[namespace] && me.translations[namespace][translationKey] && me.translations[namespace][translationKey][langCode]){
                        return me.translations[namespace][translationKey][langCode];
                    }
                },
                getWaringMsg = function(langCode){
                    return 'No "' + langCode + '" translation key detected for "' + namespace + 'Localisation.' + translationKey + '"';
                },
                translation = getTranslation(langCode);

            //try to use a translation for the default lang
            if(!translation && langCode !== this.defaultLangCode) {
                translation = getTranslation(this.defaultLangCode);
                if(translation){
                    //got the translation eventually, so just log to console there is a problem
                    //<debug>
                    console.log(this.cStdIcon('lang_missing'), this.cDbgHdr('lang'), getWaringMsg(langCode));
                    //</debug>
                }
            }

            //no translation found for neither detected lang code not default lang code...
            if(!translation){
                //this should make it obvious, some translations are missing ;)
                if(suppressWarningReturn !== true){
                    translation = getWaringMsg(langCode);

                    //and log to console too!
                    //<debug>
                    console.log(this.cStdIcon('lang_missing'), this.cDbgHdr('lang'), getWaringMsg(langCode));
                    //</debug>
                }
            }

            return translation;
        },

        /**
         * Gets a list of all the translation keys registered for given namespace
         * @param namespace
         */
        getTranslationKeys: function(namespace){
            namespace = this.getTranslationNamespace(namespace);
            return this.translations[namespace] ? Ext.Object.getKeys(this.translations[namespace]) : [];
        },

        /**
         * Cached map of calling classes to actual translation namespaces
         */
        translationsNamespaceCache: {},

        /**
         * Gets a translation namespace based on a class name. returns a string without the last Controller or Module or localisation word
         * @param className
         */
        getTranslationNamespace: function(className){

            //need to cut the Controller, Model, localisation from the end of the String.
            //Just assuming the localisation file name to class name mapping is always as follows:
            //some.Class -> some.ClassLocalisation
            //some.ClassController -> some.ClassLocalisation
            //some.ClassModel -> some.ClassLocalisation

            if(this.translationsNamespaceCache[className]){
                return this.translationsNamespaceCache[className];
            }

            var remove = false,
                namespace = className;

            //truncate ending Controller / Model / localisation so can obtain a 'main' class name for the translations file
            if(Ext.String.endsWith(className, 'Controller')){
                remove = 'Controller';
            }
            else if(Ext.String.endsWith(className, 'Model')){
                remove = 'Model';
            }
            else if(Ext.String.endsWith(className, 'Localisation')){
                remove = 'Localisation';
            }

            if(remove) {
                namespace = className.substring(0, className.lastIndexOf(remove));
            }

            this.translationsNamespaceCache[className] = namespace;

            return namespace;
        }
    });

}());