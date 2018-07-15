//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

        /**
         * access token issued by the IdentityServer
         * @type {string}
         */
    var accessToken =  null,
        /**
         * Value of the Authorization header to be appended in each request
         * @type {string}
         */
        authorizationHeader = null,

            staticInstance = null,

        getStaticInstance = function(){
            if(!staticInstance){
                staticInstance = Ext.create('mh.data.Ajax');
            }
            return staticInstance;
        }

        /**
         * Provides some customised functionality on the top of Ext.Ajax.
         * handles the access token injection into request header; injects some other data too as required
         * This class is designed to be used as a mixin
         */
        Ext.define('mh.data.Ajax', {

    requires: [
        'mh.communication.MsgBus',
        'mh.data.AjaxLocalization',
        'mh.data.AjaxRequestCfg',
        'mh.localization.Localization'
    ],

    mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters',
            'mh.mixin.Localization',
            'mh.mixin.InitialCfg'
        ],

        statics: {

            /**
             * auth::userauthenticated callback; stores the access token data for further usage
             * @param {string} token
             * access token
             */
            onUserAuthenticated: function(token){
                accessToken = token
                authorizationHeader = accessToken ? 'Bearer ' + accessToken : null;
            },

            onUserLoggedOff: function(){
                accessToken = null;
                authorizationHeader = null;
            },

            /**
             * sets authorization header on custom xhr object
             * @param xhr
             */
            setAuthorizationHeader: function(xhr){
                xhr.setRequestHeader('Authorization', authorizationHeader);
            },

            /**
             * gets standard headers
             * @returns {*}
             */
            getStandardHeaders: function(){
                return getStaticInstance().getStandardHeaders();
            }

            //<debug>
            /**
             * a test method used to preview the set auth token when in the dev mode
             * gets stripped out when compiled
             * @ignore
             */
            , testGetAuthorisationHeader: function () {
                return authorizationHeader;
            }
            /**
             * performs a test request when in the dev mode
             * gets stripped out when compiled
             * @ignore
             */
            , doDummyRequest: function () {
                var ajax = Ext.create('mh.data.Ajax');
                ajax.doPost({
                    url: 'dummy'
                });
            }
            //</debug>
        },

        //some private stuff docs

        /**
         * access token issued by the IdentityServer
         * @type {string}
         */

        /**
         * Value of the Authorization header to be appended in each request
         * @type {string}
         */


        /**
         * Emphasizes the msg text - red bold
         * @param msg
         * @private
         * @returns {string}
         */
        emphasize: function(msg){
            return '<span style="color: red; font-weight: bold;">' + msg + '</span>';
        },



        /**
         * @event ajax::success; fired whenever a request is successful; can be waived off by a request cfg option
         */

        /**
         * @event ajax::unauthorised; fired whenever 401 is returned
         */


        /**
         * Gets standard AJAX request headers used by the app
         */
        getStandardHeaders: function () {
            var headers = {

                //Note: because request headers are being customised, need to prepare some standard ones too

                //let the backend know what is being sent - always json
                'Content-Type': 'application/json; charset=utf-8',

                //make sure JSON output is preferred over xml;
                'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;*/*'
            };
            //some custom headers
            headers[this.getMhCfgProperty('headerLang')] = mh.localization.Localization.langCode;
            headers[this.getMhCfgProperty('headerSource')] = window.location.href;

            //only add the auth header if present, skip it otherwise
            if (authorizationHeader !== null) {
                headers.Authorization = authorizationHeader;
            }

            return headers;
        },


        /**
         * Generic AJAX request helper; starts with underscore so naming does not interfere when mixed into
         * data classes
         * @private
         * @param {mh.data.AjaxRequestCfg} cfg
         */
        _doRequest: function (cfg) {
            //perform a standard post request and set up proxy for the needed callbacks
            Ext.Ajax.request({
                cors: true,
                url: cfg.url,
                method: cfg.method || 'POST',
                headers: Ext.merge(this.getStandardHeaders(), cfg.headers),
                params: Ext.isObject(cfg.params) ? (cfg.method === 'GET' ? Ext.Object.toQueryString(cfg.params) : Ext.JSON.encode(cfg.params)) : null,
                callback: Ext.bind(this._requestCallback, {self: this, cfg: cfg}),
                disableCaching: cfg.disableCaching,
                timeout: cfg.timeout
            });
        },

        /**
         * Standard generic Ext.Ajax.request callback
         * @param {Object} options options passed to the XHR
         * @param {Boolean} success whether or not the op was successful
         * @param {Object} response the actual response object
         */
        _requestCallback: function (options, success, response) {

            //<debug>
            console.log(this.self.cStdIcon(success ? 'accept' : 'exclamation'), this.self.cDbgHdr('ajax'), options.method + ' request ' + (success ? 'success' : 'failure'), response, this);
            //</debug>

            //extract the request configuration object used to setup the service call
            //this object may contain stuff such as scope, success, failure, retry callbacks
            //that can be used to handle success / failure scenarios
            var cfg = this.cfg;

            if (success) {
                //op successful so proceed
                this.self.handleSuccessfulRequest(
                    cfg,

                    //this should prevent deserialisation problems when 204 (no content) pops out
                    [(response.responseText !== '' ? Ext.JSON.decode(response.responseText) : {})]
                );
            }
            else {
                //Houston we've got a problem - need to handle the error
                this.self.handleFailedRequest(
                    response,
                    cfg
                );
            }
        },

        /**
         * Generic callback for the Ajax requested generated by Models
         * When requesting data through models, just make sure to create the model callback by wrapping the AjaxRequestCfg via mh.data.Ajax.generateModelRequestCallback
         */
        onModelRequestComplete: function (records, operation, success) {

            var cfg = this.cfg;

            if (success) {
                //op successful so proceed
                this.self.handleSuccessfulRequest(
                    cfg,
                    arguments
                );
            }
            else {
                //Houston we've got a problem - need to handle the error
                this.self.handleFailedRequest(
                    operation.error.response,
                    cfg
                );
            }
        },

        /**
         * Generates a model related ajax request callback handler
         *@param {mh.data.AjaxRequestCfg} cfg configuration for the callback handlers
         */
        generateModelRequestCallback: function (cfg) {
            return Ext.bind(
                this.onModelRequestComplete,
                {
                    self: this,
                    cfg: cfg
                }
            );
        },


        /**
         * simple request success handler
         * @param {mh.data.AjaxRequestCfg} cfg request configuration
         * @param {Array} args - arguments to be passed to the callback
         * @private
         */
        handleSuccessfulRequest: function (cfg, args) {

            //success so so make sure to extend the session if not specified otherwise
            if (cfg.adviseRequestStatus === true) {
                this.fireGlobal('ajax::success');
            }

            //and execute the configured success callback
            this.executeCallback(cfg.success, cfg.scope, args);
        },

        /**
         * request failure handling procedure
         * this procedure lets user retry the operation if possible. because of that it may be async.
         * the control is returned by calling configured callbacks with the error handler output object.
         * This object looks like this:
         * {
         *      handled {Boolean}; whether or not the exception has been handled; on some occasions one may want to handle
         *      the exception in a custom manner
         *
         *      retryCancelled {Boolean}; whether or not the configured retry op has been cancelled or not
         *
         *      retry {Function}; the original retry function, so it can be handled at the caller level if required
         * }
         *
         * @param {Object} response the response object passed back by the Ajax request
         * @param {mh.data.AjaxRequestCfg} inCfg request configuration
         * @private
         */
        handleFailedRequest: function (response, cfg) {

                //error handler output object passed to the configured failure handler
             var output = {
                    //whether or not the exception has been handled
                    handled: false,

                    //whether or not the retry has been user cancelled
                    retryCancelled: false
                },

                me = this,

                //make sure cfg object is present
                cfg = cfg || {},

                //retry callback
                retry = this.getCallbackFn(cfg.retry, cfg.scope),

                //feedback message related stuff

                //whether the msg should be shown
                showMsg = false,

                //whether or not it should be possible to retry an operation; this is default behavior
                allowRetry = true,

                //whether or not the op timed out
                timedout = response ? response.timedout : false,

             //Note: need to explicitly specify the localizations namespace, as this class is meant to be used as a mixin and otherwise would use the class name of a classes it gets mixed into
                title = this.getTranslation('error', 'mh.data.Ajax') + (cfg.exceptionMsg ? ' :: ' + cfg.exceptionMsg : ''),

                msg =
                    this.getTranslation('srvErrMsg', 'mh.data.Ajax') + this.emphasize(response.status + ' :: ' + response.statusText );


            //add the retry to output too so it can be handled at the caller level when required!
            output.retry = retry;



            //some important stuff within the response
            //response.status
            //response.statusText
            //response.responseText

            //handle the errors ad needed
            switch (response.status) {

                //bad request - input syntax / form errors
                case 400:

                    //see if the client is willing to handle the 400 on its own
                    if(cfg.suppress400 !== true){
                        showMsg = true;

                        //since this is 400 - bad request, bad form data, etc. retrying the request will give the same errors
                        //and there is no point in allowing user to retry
                        allowRetry = false;

                        if(cfg.hideExceptionDetails !== true && response.responseText){
                            msg += response.responseText && response.responseText !== '""' ? '<br/><br/>' + response.responseText : '';
                        }
                    }

                    break;

                //unathorised
                case 401:
                    if (cfg && cfg.autoHandleUnauthorised !== false) {
                        //auto request status broadcasting has not been waived off

                        //only report the request status if configured to do so...
                        //if one waved this off, then likely is about to handle it itself!
                        if (cfg.adviseRequestStatus !== false) {
                            this.fireGlobal('ajax::unauthorised');
                        }

                        //auth failed, so service output will not be valid really
                        output.handled = true;
                    }
                    break;

                //not authorised to use this
                case 403:
                    showMsg = true;
                    msg +=
                        '<br/><br/>' + this.getTranslation('code403', 'mh.data.Ajax');
                    break;

                case 404:

                    //by default auto ignore 404
                    //this is because the standard grid searches will actually trigger 404 whenever there is no search results.
                    //after all the api is RESTful-ish (:))
                    if (cfg.autoIgnore404 === false) {
                        showMsg = true;
                    }

                    break;

                //server error
                case 500:
                    showMsg = true;
                    break;

                default:
                    showMsg = true;

                    if (timedout) {
                        msg = this.emphasize(this.getTranslation('opTimedOut', 'mh.data.Ajax'));
                    }
                    else {
                        msg += '<br/><br/>' + this.getTranslation('unrecognisedErr', 'mh.data.Ajax');
                    }
                    break;
            }


            //show msg if needed
            if (cfg.autoHandleExceptions !== false && showMsg) {

                //mark the output as handled
                output.handled = true;

                //check if a retry method is configured - if so make it clear a user can use it
                if (retry && allowRetry) {
                    msg += '<br/><br/>' +
                        this.getTranslation('tryAgain', 'mh.data.Ajax');
                }


                Ext.Msg.show({
                    title: title,
                    message: msg,
                    width: 550,

                    //modify the buttons text so the
                    buttonText: //Note: looks like specifying alternate text for buttons actually makes them show up...
                        allowRetry && retry ?
                        {
                            ok: this.getTranslation('btnTryAgain', 'mh.data.Ajax'),
                            cancel: this.getTranslation('btnCancel', 'mh.data.Ajax')
                        } :
                        {
                            ok: this.getTranslation('btnOk', 'mh.data.Ajax')
                        },

                    buttons: allowRetry && retry ? Ext.Msg.OKCANCEL : Ext.Msg.OK,

                    fn: function (btn) {

                        if (btn === 'ok' && allowRetry && retry) {
                            retry();
                        }
                        else {
                            //user does not want to retry or no retry configured
                            //so just pass the control to the configured failure handler
                            me.executeCallback(cfg.failure, cfg.scope, [response, output]);
                        }
                    },

                    icon: Ext.MessageBox.WARNING
                });

            }
            else {
                //no msg to be shown, so just execute the needed callback
                this.executeCallback(cfg.failure, cfg.scope, [response, output]);
            }
        },

        /**
         * executes a callback fn within a specified scope
         * @param {Function|String} fn callback to be executed
         * @param {Object} scope
         * @param {Array} args callback fn arguments
         */
        executeCallback: function (fn, scope, args) {

            //get the callback fn
            var callback = this.getCallbackFn(fn, scope, args);

            if (callback) {
                callback();
            }
        },

        /**
         * gets a properly scoped bound callback fn
         * @param {Function|String} fn callback to be executed
         * @param {Object} scope
         * @param {Array} args callback fn arguments
         */
        getCallbackFn: function (fn, scope, args) {

            var callback = null;

            //if scope provided use it
            if (scope) {
                if (Ext.isFunction(fn)) {
                    callback = Ext.bind(fn, scope, args);
                }
                else if (Ext.isFunction(scope[fn])) {
                    callback = Ext.bind(scope[fn], scope, args);
                }
            }
            //otherwise make the scope undefined
            else {
                if (Ext.isFunction(fn)) {
                    callback = Ext.bind(fn, undefined, args);
                }
            }

            return callback;
        },

        /**
         * Performs a GET request
         * @param {Object} cfg
         */
        doGet: function (cfg) {
            cfg.method = 'GET';
            this._doRequest(cfg);
        },

        /**
         * Performs a POST request
         * @param {Object} cfg
         */
        doPost: function (cfg) {
            cfg.method = 'POST';
            this._doRequest(cfg);
        },

        /**
         * Performs a PUT request
         * @param {Object} cfg
         */
        doPut: function (cfg) {
            cfg.method = 'PUT';
            this._doRequest(cfg);
        },

        /**
         * Performs a DELETE request
         * @param {Object} cfg
         */
        doDelete: function (cfg) {
            cfg.method = 'DELETE';
            this._doRequest(cfg);
        }
    },
    function(){

        //we're not instance based here, so the access to the mixed in MsgBus is not possible. but wiring up events to statics is...
        //because of that, need to instantiate the MsgBus - even though MsgBus is meant to be used as a mixin it is save to do so
        //since communication is mixed into this class, it should be available here
        var msgBus = Ext.create('mh.communication.MsgBus');
        msgBus.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
        msgBus.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);

        //TODO - some other listeners too, as the events become callable - session expire mainly, so can wipe out the access token! Also token refresh, as the session will be extended by utilising a refresh token.

        //set listeners globally - need to do it here, as need this class to exist!
        //Ext.Ajax.on('beforerequest', this.onBeforeRequest);
        //Ext.Ajax.on('requestcomplete', this.onRequestComplete);
        //Ext.Ajax.on('requestexception', this.onRequestException);
    });

}());