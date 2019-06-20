//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * An AJAX request configuration object. This class pretty much describes all the options that can be passed to the mh.data.Ajax methods.
     * The class is never instantiated directly; it's main purpose id the documentation
     */
    Ext.define('mh.data.AjaxRequestCfg', {
        /**
         * @property {Object} [params] object with params to be sent
         */

        /**
         * @property {Object} [scope]
         */

        /**
         * @property {Function|String} [success]
         * Either a success callback function or its name;
         * if the scope is provided, function is executed within that scope, otherwise the scope is undefined
         * if the function name is provided, a valid scope also must be provided in order to execute the callback
         */

        /**
         * @property {Function|String} [failure]
         * Either a failure callback function or its name;
         * if the scope is provided, function is executed within that scope, otherwise the scope is undefined
         * if the function name is provided, a valid scope also must be provided in order to execute the callback
         * the failure callback is provided with two params:
         * * the actual response object of the ajax request
         * * error handler output: {
         *      //whether or not the exception has been handled
         *      handled: false,
         *
         *      //whether or not the retry has been cancelled
         *      retryCancelled: false
         * }
         * exception handler output
         */

        /**
         * @property {Function|String} [retry]
         * Either a retry callback function or its name;
         * if the scope is provided, function is executed within that scope, otherwise the scope is undefined
         * if the function name is provided, a valid scope also must be provided in order to execute the callback
         */

        /**
         * @property {String} [method='POST']
         * request method; defaults to POST
         */

        /**
         * @property {String} [exceptionMsg]
         * main exception message to be displayed. can be used in order to give a better description of the exception returned by the server
         */

        /**
         * @property {Boolean} [autoHandleExceptions = true]
         * whether or not the exception handling should be skipped, and the control returned to the failure fn; by default the AJAX exceptions are handled automatically
         */

        /**
         * @property {Boolean} [autoHandleUnauthorised=true]
         * whether or not the 401 should be handled automatically or not; defaults to true;
         */

        /**
         * @property {Boolean} [autoIgnore404=true]
         * By default 404s are ignored, and the control is passed to the failure callback so the customised
         * handling can take place. On some occasions though it may be required to actually fail loudly on 404 and this option
         * set to false will trigger such behavior
         */

        /**
         * @property {Boolean} [suppress400=false]
         * by default 400s are not ignored, and ajax utils takes care of handling them, but on some occassions, such as form editing, ignoring 400 comes in handy so
         * a form can handle the expected exception on its own and provide a customised msg to a user.
         */

        /**
         * @property {Boolean} [adviseRequestStatus=true]
         * Whether or not each successful request info is advised. Can be used for session lifetime handling. While automatic session prolongation is useful
         * some scenarios may actually result in the session being extended indefinitely (ajax polling) and this is a reason behind making this option configurable
         */

        /**
         * @property {Boolean} [hideExceptionDetails=false]
         * Whether or not the exception details should be hidden in the msg; By default the full backend generated info is displayed
         */

        /**
         * @property {Boolean} [disableCaching=false]
         * Whether or not the request caching should be disabled; when caching is disabled, Ext.Ajax will not send the random param
         */
    });

}());