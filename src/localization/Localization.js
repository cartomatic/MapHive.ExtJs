//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * localization service; meant to be used as a mixin
     */
    Ext.define('mh.localization.Localization', {
        singleton: true,

        mixins: [
            'mh.mixin.InitialCfg',
            'mh.communication.MsgBus',
            'mh.util.console.Formatters'
        ],

        requires: [
            'mh.localization.LocalizationLocalization'
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
            this.defaultLangCode = this.getMhCfgProperty('defaultLangCode') || this.defaultLangCode;
            this.langCode = this.getMhCfgProperty('langCode') || this.defaultLangCode;

            //translations are injected via separate script
            if(typeof __mhcfg__ === 'undefined'){
                __mhcfg__ = {};
            }
            __mhcfg__.localization = __mhcfg__.localization || {};
            this.translations = __mhcfg__.localization;

            this.registerTranslations(mh.localization.LocalizationLocalization);

            this.watchGlobal('lang::switch', function(lng){
                this.switchLang(lng);
            }, this);
        },

        /**
         * @property {Object}
         * A collection of translation strings - dictionary - class name -> translation string -> lang code -> translation
         */
        translations: null,

        /**
         * Name of a private property that keeps a namespace ref to a superclass of a translations class...
         * @property
         * @private
         */
        translationsSuperclass: '___extends',

        /**
         * registers translations for a given class
         * @param translationsClass
         */
        registerTranslations: function(translationsClass){

            var key = this.getTranslationNamespace(Ext.getClassName(translationsClass)),

                newTranslations = translationsClass.localization || {},

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

                    if(translationKey === this.translationsSuperclass) continue;

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

            //Finally add a translationsSuperclassProperty info to the translations dict so can do a proper translations lookup in the parent classes
            if(translationsClass.inherits){
                this.translations[key][this.translationsSuperclass] = translationsClass.inherits;
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

            //first obtain the translation in the requested lang code
            var translation = this.getTranslationInternal(translationKey, namespace, langCode);

            //if no translation has been found, try the default lang code
            if(!translation && langCode !== this.defaultLangCode){
                translation = this.getTranslationInternal(translationKey, namespace, this.defaultLangCode);
            }


            //no translation found for neither detected lang code not default lang code and also nothing found in the parent class...
            if(!translation){
                //this should make it obvious, some translations are missing ;)
                if(suppressWarningReturn !== true){

                    var warningMsg = 'No "' + langCode + '" translation key detected for "' + namespace + 'Localization.' + translationKey + ' nor its superclasses."';

                    translation = warningMsg;

                    //and log to console too!
                    //<debug>
                    console.log(this.cStdIcon('lang_missing'), this.cDbgHdr('lang'), warningMsg);
                    //</debug>
                }
            }

            return translation;
        },

        /**
         * Internal translation lookup - drills down to inspect all the classes a translation namespace inherits from
         * @param translationKey
         * @param namespace
         * @param langCode
         */
        getTranslationInternal: function(translationKey, namespace, langCode){

            namespace = this.getTranslationNamespace(namespace);

            var me = this,
                getTranslation = function(langCode){
                    if(me.translations[namespace] && me.translations[namespace][translationKey] && me.translations[namespace][translationKey][langCode]){
                        return me.translations[namespace][translationKey][langCode];
                    }
                },

                getTranslationSuperClass = function(){
                    if(me.translations[namespace] && me.translations[namespace][me.translationsSuperclass]){
                        return  me.translations[namespace][me.translationsSuperclass];
                    }
                },
                translationSuperclass = getTranslationSuperClass(),

                translation = getTranslation(langCode);

            //if at this stage there is no translation, try to check if a translation class inherits from another translation...
            //If so, try to explore it
            if(!translation && translationSuperclass){
                translation = this.getTranslationInternal(translationKey, translationSuperclass, langCode); //suppressWarningReturn when digging deeper; no point in re-logging the msg over and over again
            }

            return translation;
        },

        /**
         * Gets a list of all the translation keys registered for given namespace
         * @param namespace
         * @param {bool} [includeInherited] whether or not the inherited keys should also be included in the output
         * @returns {Array}
         */
        getTranslationKeys: function(namespace, includeInherited){
            namespace = this.getTranslationNamespace(namespace);

            var translationKeys = [],
                currentTranslationKeys;

            while(namespace){

                currentTranslationKeys = this.translations[namespace] ?
                    //need to exclude the superclassProperty! Otherwise when injecting translations to a view model the this.translationsSuperclass would be passed to be extracted
                    Ext.Array.remove(
                        Ext.Object.getKeys(this.translations[namespace]), this.translationsSuperclass
                    )
                    : [];

                translationKeys = Ext.Array.merge(translationKeys, currentTranslationKeys);

                if(!includeInherited || !(this.translations[namespace] && this.translations[namespace].hasOwnProperty(this.translationsSuperclass)))
                    break;

                namespace = this.getTranslationNamespace(this.translations[namespace][this.translationsSuperclass]);
            }

            return translationKeys;
        },

        /**
         * Cached map of calling classes to actual translation namespaces
         */
        translationsNamespaceCache: {},

        /**
         * Gets a translation namespace based on a class name. returns a string without the last Controller or Module or localization word
         * @param className
         */
        getTranslationNamespace: function(className){

            className = this.fixClassName(className);

            //need to cut the Controller, Model, localization from the end of the String.
            //Just assuming the localization file name to class name mapping is always as follows:
            //some.Class -> some.ClassLocalization
            //some.ClassController -> some.ClassLocalization
            //some.ClassModel -> some.ClassLocalization

            if(this.translationsNamespaceCache[className]){
                return this.translationsNamespaceCache[className];
            }

            var remove = false,
                namespace = className;

            //truncate ending Controller / Model / localization so can obtain a 'main' class name for the translations file
            if(Ext.String.endsWith(className, 'Controller')){
                remove = 'Controller';
            }
            else if(Ext.String.endsWith(className, 'Model')){
                remove = 'Model';
            }
            else if(Ext.String.endsWith(className, 'Localization')){
                remove = 'Localization';
            }

            if(remove) {
                namespace = className.substring(0, className.lastIndexOf(remove));
            }

            this.translationsNamespaceCache[className] = namespace;

            return namespace;
        },
        
         /**
         * fixes the application class name. for the application object Ext.getClassName returns $application
         * @param className
         */
        fixClassName: function(className){
            var idx = className.indexOf('$'),
                strToReplace, replacement;
            if(idx > -1){
                strToReplace = className.substring(className.indexOf('$'), className.indexOf('$') + 2);
                replacement = strToReplace.replace('$', '').toUpperCase();

                className = className.replace(strToReplace, replacement)
            }
            return className;
        },


        /**
         * Collects localised class names
         */
        getLocalisedClassNames: function(){
            return Ext.Object.getKeys(this.translations);
        },

        /**
         * gets app localizations in a form of a list of LocalizationClass
         */
        getAppLocalizations: function(namespaces, langs){
            var me = this,
                localizationClasses = [];

            Ext.Array.each(this.getLocalisedClassNames(), function(lcn){
                //need to check if a class is actually defined in code. basically it should, but in some scenarios some localization classes may not be defined in code as such (dev mode, mistakes...)
                //and therefore will not have a clientside equivalent
                var clientLocalizationClassName = lcn + 'Localization',
                    clientLocalizationClass = Ext.ClassManager.get(clientLocalizationClassName);

                //discard translations with namespaces other than required
                if(namespaces && !namespaces.some(ns => clientLocalizationClassName.startsWith(`${ns}.`))){
                    return;
                }

                if(clientLocalizationClass){
                    localizationClasses.push({
                        applicationName: lcn.substring(0, lcn.indexOf('.')),
                        className: lcn.substring(lcn.indexOf('.') + 1),
                        inheritedClassName: clientLocalizationClass.inherits,
                        translationKeys: me.updateTranslationsInheritanceInfo(
                            clientLocalizationClass,
                            me.extractLocalizationClassTranslationKeys(clientLocalizationClass, langs)
                        )
                    });
                }
            });

            return localizationClasses;
        },

        /**
         * extracts localization class translation keys. drills down the inheritance chain and extracts also the inherited keys.
         * flags the keys as inherited / overwritten as required
         * @param localizationClass
         * @param langsToExtract
         * @returns {[]}
         */
        extractLocalizationClassTranslationKeys: function(localizationClass, langsToExtract){
            let me = this,
                translationKeys = [],
                inheritedKeys = [];

            Ext.Array.each(Ext.Object.getKeys(localizationClass.localization), function(tk){

                //ignore the 'extends' key
                if(tk === me.translationsSuperclass){
                    return;
                }

                var translationKey = {
                    key: tk,
                    translations: {}
                };
                Ext.Array.each(Ext.Object.getKeys(localizationClass.localization[tk]), function(lng){
                    //skip langs that are not required
                    if(langsToExtract && langsToExtract.indexOf(lng) === -1){
                        return;
                    }
                    translationKey.translations[lng] = localizationClass.localization[tk][lng];
                });

                translationKeys.push(translationKey);
            });

            //grab inherited keys and merge with own keys
            if(localizationClass.inherits){
                inheritedKeys = me.extractLocalizationClassTranslationKeys(Ext.ClassManager.get(localizationClass.inherits), langsToExtract);
                inheritedKeys.forEach((itk) => {
                    if(!translationKeys.some((tk) => tk.key === itk.key)){
                        translationKeys.push(itk);
                    }
                });
            }

            return translationKeys;
        },

        /**
         * updates inheritance info of translations
         * @param localizationClass
         * @param translationKeys
         * @returns {*}
         */
        updateTranslationsInheritanceInfo: function(localizationClass, translationKeys){
            let me = this;

            (translationKeys || []).forEach((tk) => {
                tk.inherited = me.translationKeyInherited(localizationClass, tk);
                tk.overwrites = me.translationKeyOverwrites(localizationClass, tk);
            });

            return translationKeys;
        },

        /**
         * whether or not translation key is inherited
         * @param localizationClass
         * @param tk
         * @returns {boolean}
         */
        translationKeyInherited: function(localizationClass, tk){
            let inherited = false,
                inheritedClass;

            //it makes point to check only when class inherits ;)
            if(localizationClass.inherits){
                inheritedClass = Ext.ClassManager.get(localizationClass.inherits);

                while(inheritedClass){

                    Ext.Array.each(Ext.Object.getKeys(inheritedClass.localization), function(itk){

                        if(tk.key === itk){
                            inherited = true;
                            return false;
                        }
                    });

                    if(inherited){
                        inheritedClass = false;
                        break;
                    }

                    if(!inheritedClass.inherits){ //when undefined, ext class manager will return window...
                        break;
                    }

                    inheritedClass = Ext.ClassManager.get(inheritedClass.inherits);
                }
            }

            return inherited;
        },

        /**
         * whether or not a translation key overwrites inherited value
         * @param localizationClass
         * @param tk
         * @returns {boolean}
         */
        translationKeyOverwrites: function(localizationClass, tk){
            let overwrites = false,
                inheritedClass;

            //it makes point to check only when class inherits ;)
            if(localizationClass.inherits){
                inheritedClass = Ext.ClassManager.get(localizationClass.inherits);

                while(inheritedClass){

                    Ext.Array.each(Ext.Object.getKeys(inheritedClass.localization), function(itk){

                        if(tk.key === itk){

                            let inheritedKey = inheritedClass.localization[itk],
                                tkLangKeys = Ext.Object.getKeys(tk.translations),
                                itkLangKeys = Ext.Object.getKeys(inheritedKey);

                            //first check counts of translations
                            if(tkLangKeys.length !== itkLangKeys.length){
                                overwrites = true;
                                return false;
                            }

                            //looks like lang key count is the same. check the values now
                            Ext.Array.each(tkLangKeys, (lngKey) => {
                                if(tk.translations[lngKey] !== inheritedKey[lngKey])
                                {
                                    overwrites = true;
                                    return false;
                                }
                            });

                            //break the loop
                            if(overwrites){
                                return false;
                            }
                        }
                    });

                    if(overwrites){
                        inheritedClass = false;
                        break;
                    }

                    if(!inheritedClass.inherits){ //when undefined, ext class manager will return window...
                        break;
                    }

                    inheritedClass = Ext.ClassManager.get(inheritedClass.inherits);
                }
            }

            return overwrites;
        },

        /**
         * Saves app localizations
         * @param cfg.overwrite
         * @param cfg.upsert
         * @param cfg.langsToImport
         * @param cfg.namespaces
         */
        saveAppLocalizations: function(cfg){

            //note: need to avoid recursion in mixing in classes, so just calling stuff via class instances...
            //note: the variables are there so WebStorm's Sencha plugin does not do auto requires, that in return triggers circular ref err
            //just collect the data and post to the server
            var ajax = 'mh.data.Ajax',
                apiMap = 'mh.mixin.ApiMap';

            Ext.create(ajax).doPost({
                url: Ext.create(apiMap).getApiEndPointUrl('appLocalizationsBulkSave'),
                params: {
                    overwrite: cfg.overwrite,
                    langsToImport: cfg.langsToImport,
                    appLocalizations: this.getAppLocalizations(cfg.namespaces, cfg.langsToImport)
                },
                autoHandleExceptions: false,
                success: Ext.emptyFn,
                failure: Ext.emptyFn
            });
        },

        /**
         * initiates lang switch procedure
         * @param langCode
         */
        switchLang: function(langCode){

            //make sure changing lang makes sense at all...
            if(this.getMhCfgProperty('langCode') === langCode || !Ext.Array.contains(this.getMhCfgProperty('supportedLangs'), langCode)){
                return;
            }

            //mask the app
            this.fireGlobal('loadmask::show', this.getTranslation('langSwitchMask', 'mh.localization.LocalizationLocalization'));

            var me = this,
                params = {};
            params[this.getMhCfgProperty('langParam')] = langCode;

            //defer a bit so a load mask is visible...
            Ext.defer(function(){
                //and fire global!
                me.fireGlobal(
                    'root::reloadwithparams',
                    {
                        params: params,
                        replace: false
                    }
                );
            }, 500);
        },

        /**
         * gets lang supported
         * @returns {Array}
         */
        getSupportedLangs: function(){
            var supportedLangs = this.getMhCfgProperty('supportedLangs'),
                langs = [];

            Ext.Array.each(supportedLangs, function(langCode){
                langs.push({
                    code: langCode,
                    name: mh.localization.Localization.getTranslation(langCode, 'mh.localization.LocalizationLocalization')
                });
            });

            return langs;
        },

        getLocalizedString: function(wouldBeMultiLangString){
            if(!wouldBeMultiLangString){
                return wouldBeMultiLangString;
            }
            //assume a pipe is a multilang string delimiter
            if(wouldBeMultiLangString.indexOf('|') > -1){
                let me = this,
                    translated,
                    dflt;

                (wouldBeMultiLangString.split('|')).forEach(str => {
                    if(str.startsWith(`${me.langCode}:`)){
                        translated = str.substring(3);
                    }
                    if(str.startsWith(`${me.defaultLangCode}:`)){
                        dflt = str.substring(3);
                    }
                });

                return translated || dflt || `Multi lang string does not contain translation for neither corrent lang (${me.langCode}) nor default lang (${me.defaultLangCode})`;

            }
            return wouldBeMultiLangString;
        }
    });

}());
