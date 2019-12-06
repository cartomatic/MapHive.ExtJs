//Disable some of the JSLint warnings
/*global window,document,console,Ext,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * A set of wrappers around the console object, that simplify logging customised msgs to the console window.
     * This class takes care of extending the console object, so the logging is done as before and should work without any problems when
     * no customised logging is enabled
     * When brpught into the project, it is possible to add style to the msg by simply adding a _s::3d,20 like style info that will be parsed into css styles
     * The styles supported are:
     * _s::3d,20 - 3d: 3d text, 20: pixel size
     * _s::15,red,blue - 15: text size, red: text color, blue: text back
     * _s::img,url,width,height
     *
     * params are always comma separated and their index is important. in order to use a default param do not provide a value, for example: _s::img,url,,16
     */
    Ext.define('mh.util.console.Custom', {

    requires: [
        'Ext.app.Application'
    ],

        singleton: true,

        constructor: function(){

            //Note:
            //since this class is a singleton, it will get initialised before the app init and launch
            //it it therefore safe to do the required modifications here!

            //some IE8 specific stuff for debugging...
            if(Ext.browser.is.IE8){
                console = {
                    warn: Ext.emptyFn,
                    log: Ext.emptyFn,
                    error: Ext.emptyFn
                };
            }

            this.coustomiseConsoleWarn();
            this.customiseConsoleLog();


            //Note: this way the hello will always show up first in the console!
            //oh well, provided, the console.Custom is required first ;)
            var appName = document.title || 'NoName';
            console.log(appName + ' :: Hello there mate!_s::3d,40px');
            this.setAppName(appName);
        },

        /**
         * Customises the console.warn output
         */
        coustomiseConsoleWarn: function(){
            var me = this;
            (function(proxied) {
                console.warn = function() {
                    //proxied.call(this, 'tadam - customised console.warn ;)');

                    return proxied.apply(this, me.prepareArgs(arguments));
                };
            }(console.warn));
        },

        /**
         * Customises the console.log output
         */
        customiseConsoleLog: function(){
            var me = this;
            (function(proxied) {
                console.log = function() {
                    //proxied.call(this, 'tadam - customised console.log ;)');

                    return proxied.apply(this, me.prepareArgs(arguments));
                };
            }(console.log));
        },

        /**
         * checks if args array contains styling data
         * @param args
         * @private
         * @returns {boolean}
         */
        containsStyleArg: function(args){
            var contains = false, a = 0;
            for(a; a < args.length; a++){
                contains = args[a] && typeof(args[a]) === 'string' && args[a].indexOf('_s::') > -1;
                if(contains) {
                    return contains;
                }
            }
            return contains;
        },

        /**
         * prepares the args, so the styling is applied as expected
         * @param args
         * @returns {Array}
         */
        prepareArgs: function(args){

            if(Ext.isIE || Ext.isEdge){
                return this.handleIeArgs(args);
            }

            var stringArgs = [],
                styleArgs = [],
                nonStringArgs = [],
                arg, a = 0;

            //inject app name
            this.injectAppName(stringArgs, styleArgs);

            //check if there are any style attributes provided. if so customise attributes, otherwise return original args
            if(this.containsStyleArg(args)){

                //Do some hocus pocus here
                //basically if an argument contains '_s::' string, it means the preceeding part should have a styling applied
                for(a; a < args.length; a++){

                    arg = args[a];

                    //handle all the strings separately - they get concat ito one tokenised string
                    if(arg && typeof(arg) === 'string') {
                        arg = args[a].split('_s::');

                        if(arg.length > 1){
                            //looks like there was a style definition provided
                            stringArgs.push('%c' + arg[0]);
                            styleArgs.push(this.parseStyle(arg[1]));
                        }
                        else {
                            //just a plain string arg
                            stringArgs.push('%c' + arg); //needs to be tokenised so can apply 'no-style'
                            styleArgs.push(''); //no style
                        }
                    }
                    else {
                        //non-string arg so goes to the end
                        nonStringArgs.push(arg);
                    }
                }
            }
            else {
                for(a; a< args.length; a++){
                    nonStringArgs.push(args[a]);
                }
                //return args;
            }

            return [stringArgs.join(' ')].concat(styleArgs).concat(nonStringArgs).concat([this.getCaller()]);
        },

        handleIeArgs: function(args){
            var outArgs = [],
                a = 0, alen = args.length,
                arg;

            outArgs.push(this.getAppNameToken().replace('%c', ''));

            for(a; a < alen; a++){
                arg = args[a];
                if(arg && typeof(arg) === 'string'){
                    if(arg.indexOf('_s::') > -1){
                        arg = arg.split('_s::')[0];
                    }
                }

                outArgs.push(arg);
            }

            return outArgs;
        },

        /**
         * injects app name into the console log
         * @param stringArgs
         * @param styleArgs
         */
        injectAppName: function(stringArgs, styleArgs){
            stringArgs.push(this.getAppNameToken());
            styleArgs.push('color:blue');
        },

        /**
         * Sets the application name to be used to show where the logs come from; this is handy when there are other apps nested in iframes
         * @param name
         */
        setAppName: function(name){
            this.appName = name;
        },

        appName: null,

        /**
         * Gets application name, so can properly distinguish logs from hosted apps
         * @returns {*}
         */
        getAppNameToken: function(){
            return '%c' + (this.appName ? '[' + this.appName + ']' : '');
        },

        /**
         * Parses custom style string and returns a normalised css
         * @param {string} style
         * @returns {string}
         */
        parseStyle: function(style){
            //basically the style can come in different flavors, but at the very root it is always a comma separated definition
            //with the following structure:
            //styletype,some,settings,

            //style type is used to apply some custom styling to the preceeding argument

            var outStyle = '',
                sData = style.split(','),
                sType = sData[0];


            switch(sType){
                case '3d':
                    outStyle = this.get3dStyleCss(sData);
                    break;

                case 'img':
                    outStyle=this.getImgCss(sData);
                    break;

                default:
                    outStyle = this.getStandardStyleCss(sData);
                    break;
            }

            return outStyle;
        },

        /**
         * Returns a standardised css for the defined style
         * @param {Array} sData
         */
        getStandardStyleCss: function(sData){
            //_s::20,red,blue

            var css = [];

            if(sData[0]){
                css.push('font-size:' + sData[0] +'px');
            }
            if(sData[1]){
                css.push('color:' + sData[1]);
            }
            if(sData[2]){
                css.push('background-color:' + sData[2]);
            }

            return css.length > 0 ? css.join(';') : '';
        },

        /**
         * Gets a 3d text css
         * @param sData
         * @returns {string}
         */
        get3dStyleCss: function(sData){

            //_s::3d,40px

            var defaultFontSize = 50;

            return 'font-size:' + this.parseInt(sData[1], defaultFontSize) + 'px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);';
        },

        /**
         * gets a style for an image
         * @param sData
         */
        getImgCss: function(sData){

            //_s::img,console-info,20,30

            var width = this.parseInt(sData[2], 8), //expecting this to account for a 16px wide img
                height = this.parseInt(sData[3], 14), //also expecting this to account for a 16px heigh img
                url = sData[1].indexOf('http') > - 1 ? sData[1] : this.getBaseUrl() + 'mh/images/console/' + sData[1] + '.png';

            return "background:url('" + url + "');padding-right:" + width + "px;font-size:" + height + "px;";
        },

        baseUrl: null,
        /**
         * Gets the base url of the app to resolve reference image paths!
         * @returns {null}
         */
        getBaseUrl: function(){
            if(!this.baseUrl){
                var s = 0, sHref;
                //obtain the url to the package resources based on the stylesheet location;
                //this way it will work in dev mode too (all the styles is taken dynamically from build/development/......
                for(s = 0; s < document.styleSheets.length; s++){
                    sHref = document.styleSheets[s].href || '';
                    if(sHref.indexOf('-all') > -1){ //assume the style will have -all string; Ext.app.Application.instance.getName() is not instantiated yet!
                        this.baseUrl = sHref.substring(0, sHref.lastIndexOf('/') + 1);
                        break;
                    }
                }
            }
            return this.baseUrl;
        },

        /**
         * parses a string to int, returns a default value if provided or undefined;
         * @param value
         * @param defaultValue
         */
        parseInt: function(value, defaultValue){
            var parsed = parseInt(value);
            return !isNaN(parsed) ? parsed : !isNaN(defaultValue) ? defaultValue : undefined;
        },

        /**
         * gets a caller name with line info
         * inspired by https://stackoverflow.com/questions/29572466/how-do-you-find-out-the-caller-function-in-javascript-when-use-strict-is-enabled:
         */
        getCaller: function(){
            var caller;
            try { throw new Error(); }
            catch (e) {
                var stack = e.stack.split('\n');
                if(Ext.isChrome || Ext.isChromeMobile) {
                    caller = (stack[4] || stack[3] || stack[2] || stack[1] || stack[0]).replace('    at constructor.', '');
                }
                //if(Ext.isFirefox){
                else {
                    caller = stack[3] || stack[2] || stack[1] || stack[0];
                }
            }

            return '\nsource: ' + caller+ '\n';
        }
    });

}());