//Note: for the production minify this script and link as loader.min.js
//use any sensible toolkit, for example a web based: https://jscompress.com/

//Make sure strict mode is on
'use strict';

/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));

/**
 * MapHive bootstrap v 1.0
 * used to load all the required client configurations as defined in the config/webclient.js.
 * DO NOT modify this script and always use the one defined under mh/bootstrap
 */
(function(){
    /**
     * script loader utility - used to load js files
     * @param src
     * @param callback
     * @returns {Promise}
     */
    var loadScript = function(src, callback) {
            return new Promise(function (resolve, reject) {

                var head = document.getElementsByTagName("head")[0],
                    rnd = '?dc=' + (new Date()).getTime(),
                    script  = document.createElement('script');

                script.type = "text/javascript";
                script.src  = src + rnd;
                script.async = false;

                //IE has a different way of handling <script> loads, so check for it here
                if(script.readyState) {
                    script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            resolve();
                        }
                    };
                } else {
                    script.onload = function(){
                        resolve();
                    };
                }
                head.appendChild(script);
            });
        },
        /**
         * loads configured API endpoints
         * @returns {Promise}
         */
        loadApiEndpoints = function(){
            return loadScript('config/webclient.js');
        },
        /**
         * verifies loaded api endpoints; makes sure appropriate objects were loaded
         * @returns {Promise}
         */
        verifyApiEndpoints = function() {
            return new Promise(function (resolve, reject) {
                if(!__mhcfg__.apiEndPoints) {
                    throw 'Whoaaa, it looks like the core MapHive APIs are not configured properly. ' +
                    'You should really, really take care of it dude... ' +
                    'See configuration/webclient.js for details';
                }
                resolve();
            });
        },
        /**
         * loads webclient conffiguration off a remote MapHive core API
         * @returns {Promise}
         */
        loadWebclientConfig = function(){
            return loadScript(__mhcfg__.apiEndPoints.coreApi.url + 'configuration/webclient');
        },
        /**
         * works out lang code to be used from the url string
         * @returns {string | void}
         */
        getLangFromUrl = function(){
            var paramsRaw = document.location.href.split('#')[0].split('?')[1],
                params = paramsRaw ? paramsRaw.split('&') : [],
                lng = __mhcfg__.langParam + '=',
                p = 0, plen = params.length;
            for(p; p < plen; p++){
                if(params[p].indexOf(lng) === 0){
                    return params[p].replace(lng, '');
                }
            }
        },
        /**
         * grabs data saved in a mh cookie
         * TODO - make it work with local storage for clients that do not use cookies! also see saveLang
         * @returns {*}
         */
        getMhCookie = function(){
            try {
                return (Cookies.getJSON(__mhcfg__.mhCookie) || {});
            }
            catch(e){
                return {}
            }
        },
        /**
         * extracts lang from mh cookie
         */
        getLangFromCookie = function(){
            return getMhCookie()[__mhcfg__.langParam];
        },
        /**
         * extracts language from browser
         */
        getBrowserLang = function(){
            var lng = navigator.languages && navigator.languages[0] ||
                navigator.language ||
                navigator.userLanguage;

            //truncate it to the 2 first letters
            return lng.substring(0,2).toLowerCase();
        },

        /**
         * returns a valid and supported lang and also sets it in the __mhcfg__
         */
        getLang = function(){
            var lng = getLangFromUrl() || getLangFromCookie() || getBrowserLang();
            if(lng){
                for(var l = 0; l <__mhcfg__.supportedLangs.length; l++){
                    if(lng.toLowerCase() === __mhcfg__.supportedLangs[l].toLowerCase()){
                        //because lang is supported set it as the current one
                        __mhcfg__.langCode = lng;
                        return __mhcfg__.supportedLangs[l];
                    }
                }
            }
            return __mhcfg__.defaultLang;
        },

        /**
         * saves lng to a cookie
         * TODO - make it work with clients that do not support cookies - use local storage instead; also see getMhCookie
         */
        saveLang = function(lng){
            var cookie = getMhCookie();
            cookie[__mhcfg__.langParam] = lng;
            Cookies.set(__mhcfg__.mhCookie, cookie, {expires: __mhcfg__.cookieValidSeconds / (60*60*24)});
        },
        /**
         * loads locale data
         */
        loadLocale = function(){
            var lng = getLang(),
                namespaces = __mhcfg__.namespacesToLocalize.join(',');

            //save lng for the future...
            saveLang(lng);

            //and load the appropriate data
            return loadScript(__mhcfg__.apiEndPoints.coreApi.url + 'applocalization/localizeit/script?appidentifiers=' + namespaces + '&langcode=' + lng);
        },

        /**
         * load finalization - the actual ExtJs bootstrap kick in
         */
        finaliseLoad = function(){
            //make sure to reload script so caching is avoided. this script should not be to heavy...
            //this should also avoid dev time caching too
            return loadScript('bootstrap.js');
        };

    //do the actual loading
    loadApiEndpoints()
        .then(verifyApiEndpoints)
        .then(loadWebclientConfig)
        .then(loadLocale)
        .then(finaliseLoad)
        .catch(function(err){
            console.warn(err);
        });
}());