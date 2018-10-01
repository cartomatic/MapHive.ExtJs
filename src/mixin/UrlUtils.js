(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * tokens use to delimit app and org
     */
    var urlTokenDelimiters = {
        app: '!',
        org: '@'
    };

    /**
     * URL Utils. Provides some URL manipulation related functionality; class intended to be used as a mixin
     */
    Ext.define('mh.mixin.UrlUtils', {

        /**
         * get app url token delimiter
         * @returns {string}
         */
        getUrlAppTokenDelimiter: function(){
            return urlTokenDelimiters.app;
        },

        /**
         * gets org url token delimiter
         */
        getUrlOrgTokenDelimiter: function(){
            return urlTokenDelimiters.org;
        },

        /**
         * extracts an org identifier (name or uuid) off the url
         */
        getUrlAppIdentifier: function(){
            return this.getUrlToken(urlTokenDelimiters.app);
        },

        /**
         * extracts an app identifier (name or uuid) off the url
         */
        getUrlOrgIdentifier: function(){
            return this.getUrlToken(urlTokenDelimiters.org);
        },

        /**
         * gets a url part that starts with a specified token
         * @param delimiter
         */
        getUrlToken: function(delimiter){
            var urlParts = window.location.href.split('#')[0].split('?')[0].split('/'),
                tokenValue;

            Ext.Array.each(urlParts, function(p){
                if(p.indexOf(delimiter) === 0){
                    tokenValue = p.replace(delimiter,'');
                    return false;
                }
            });

            return tokenValue;
        },

        /**
         * removes the app token from the url
         * @param url
         * @returns {*}
         */
        removeUrlAppToken: function(url){
            return this.updateUrlAppToken(url, null);
        },

        /**
         * removed the org token from the url
         * @param url
         * @returns {*}
         */
        removeUrlOrgToken: function(url){
            return this.updateUrlOrgToken(url, null);
        },

        /**
         * updates app token in the url and returns the updated url; does not update the url in the url bar
         * @param app
         * @returns {*}
         */
        updateUrlAppToken: function(url, app){
            return this.updateUrlToken(url, urlTokenDelimiters.app, app);
        },

        /**
         * updates org token in the url and returns the updated url; does not update the url in the url bar
         * @param org
         * @returns {*}
         */
        updateUrlOrgToken: function(url, org){
            return this.updateUrlToken(url, urlTokenDelimiters.org, org);
        },

        /**
         * updates a url token and returns an updated url; does not update the url in the url bar
         * @param delimiter
         * @param tokenValue
         * @returns {string}
         */
        updateUrlToken: function(url, delimiter, tokenValue){
            var inUrl = (url || window.location.href).split('#')[0],
                hash = (url || window.location.href).split('#')[1],
                params = inUrl.split('?')[1],
                urlParts = inUrl.split('?')[0].split('/'),
                tokenUpdated = false,
                cleanedUpUrlParts = [];

            Ext.Array.each(urlParts, function(p, idx){
                if(p.indexOf(delimiter) === 0){
                    urlParts[idx] = tokenValue ? delimiter + tokenValue : null;
                    tokenUpdated = true;
                    return false;
                }
            });

            if(tokenValue && !tokenUpdated){
                if(!urlParts[urlParts.length - 1]){
                    urlParts[urlParts.length - 1] = delimiter + tokenValue;
                }
                else {
                    urlParts.push(delimiter + tokenValue);
                }
            }

            //remove the potentially empty url parts
            Ext.Array.each(urlParts, function(up){
                if(up !== null){
                    cleanedUpUrlParts.push(up);
                }
            });

            return cleanedUpUrlParts.join('/') +
                (params ? '?' + params : '') +
                (hash ? '#' + hash : '');
        },

        /**
         * params that get removed from url when normalizing it
         */
        appUrlParamsToClear: [
            'lng=',
            'cache=',
            'testmode=',
            'testsonside=',
            'spec=',
            'throwFailures=',
            'catch=',
            'debug=',
            'platformTags='
        ],

        /**
         * matcher regex
         */
        appUrlParamsMatcher: null,

        /**
         * gets a url that should uniquely identify an app - removes all the parts of the url that can be dynamically added during the standard maphive app (re)loading
         */
        getAppIdentifyingUrl: function(){
            var outUrl,
                url = decodeURIComponent(window.location.href.split('#')[0]).split('?'),
                baseUrl = url[0], urlParts = [],
                baseParams = (url[1] || '').split('&'),
                outParams,
                appToken = this.getUrlAppTokenDelimiter(),
                orgToken = this.getUrlOrgTokenDelimiter();

            //if'_dev' string in url then treat it as a dev deploy that is not deployed under the main app domain
            //but rather under something like https://some.url.com/_dev/666-beasty-branch
            if(baseUrl.indexOf('_dev') > -1){
                baseUrl = baseUrl.substring(0, baseUrl.indexOf('_dev'));
            }

            //note: need to extract the lang param off the app identifier prior to going on with the comparison.

            //note: also params order plays an important role here... this is a future todo though

            //remove org and app identifiers from the url!
            Ext.Array.each(baseUrl.split('/'), function(u){
                if(u.indexOf(appToken) > -1 || u.indexOf(orgToken) > -1){
                    return;
                }
                urlParts.push(u);
            }, this);

            outUrl = urlParts.join('/');

            //take care of params if any
            if(baseParams.length > 1){
                outParams = [];

                if(!this.appUrlParamsMatcher){
                    this.appUrlParamsMatcher = new RegExp(this.appUrlParamsToClear.join('|'), "g");
                }

                Ext.Array.each(baseParams, function(param){
                    //if(param.indexOf('lng=') === -1){
                    if(!param.match(this.appUrlParamsMatcher)){
                        outParams.push(param);
                    }
                });

                if(outParams.length > 0){
                    outUrl += '?' + outParams.join('&');
                }
            }
            return outUrl;
        },

        /**
         * standardises app identifier url by removing the last / and ? if there is no content that follows it
         * this is so it's easier to compare identifying urls
         * @param url
         */
        standardiseAppIdentifyingUrl: function(url){
            //make sure the last ? and / are removed
            if(Ext.String.endsWith(url, '?')){
                url = url.substring(0, url.length - 1);
            }
            if(Ext.String.endsWith(url, '/')){
                url = url.substring(0, url.length - 1);
            }
            return url;
        }

    });
    
}());