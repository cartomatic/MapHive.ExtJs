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
            urlTokenDelimiters.org;
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
            var urlParts = window.location.href.split('#')[0].split('/'),
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
                tokenUpdated = false;

            Ext.Array.each(urlParts, function(p, idx){
                if(p.indexOf(delimiter) === 0){
                    urlParts[idx] = delimiter + tokenValue;
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

            return urlParts.join('/') +
                (params ? '?' + params : '') +
                (hash ? '#' + hash : '');
        }

    });
    
}());