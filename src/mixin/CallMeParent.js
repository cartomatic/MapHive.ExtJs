//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Because in strict mode access to caller is censored, extending ExtJs classes requires some hocus-pocus (this is still true in ExtJs6; more than likely will change in the future)
     * This class should be used as a mixin to provide an easy to access callParent and callSuper equivalents
     */
    Ext.define('mh.mixin.CallMeParent', {
        /**
         * @protected
         * @static
         * @inheritable
         */
        callMeParent: function(method, args) {

            //work out the caller from the stack trace
            var caller;
            try { throw new Error(); }
            catch (e) {
                var stack = e.stack.split('\n'),
                    stackInfoToParse,
                    i;

                //first find the first line of the stack that mentions this method - the actual caller should be the next one
                for (i = 0; i < stack.length; i++){
                    if(stack[i].indexOf('callMeParent') > -1){
                        stackInfoToParse = stack[i+1];
                        break;
                    }
                }

                //depending on a browser, the stack line looks like this (2k18, september):
                //EDGE: " at getHeaders (https://hgis.maphive.local/packages/local/mh/src/data/proxy/Rest.js?_dc=1535290046672:44:13)"
                //Opera: "    at constructor.getHeaders (https://hgis.maphive.local/packages/local/mh/src/data/proxy/Rest.js?_dc=1535290016921:44:32)"
                //FF: "getHeaders@https://hgis.maphive.local/packages/local/mh/src/data/proxy/Rest.js?_dc=1535289854213:44:27"
                //Chrome: "    at constructor.getHeaders (https://hgis.maphive.local/packages/local/mh/src/data/proxy/Rest.js?_dc=1535289507373:44:32)"

                //Opera & chrome seems to be the same

                if(stackInfoToParse.indexOf('@') > -1){
                    //ff
                    caller = stackInfoToParse.split('@')[0];
                }
                else {
                    //edge chrome, opera
                    caller = Ext.String.trim(stackInfoToParse.split(' (')[0].replace('at', '').replace('constructor.', ''));
                }
            }

            //method not explicitly provided, so assume only args were passed, and the method name is worked out above
            if(method && method.hasOwnProperty('callee')){
                args = method;
                method = caller;
            }

            //WTF is this? some app pack / minify artifact?
            if(method.startsWith('ctor.')){
                method = method.replace('ctor.', '');
                //<debug>
                console.log('Readjusted method name from "ctor.' + method + '" to "' + method + '"');
                //</debug>
            }

            //<debug>
            console.log('[CallMeParent] ', 'method ::', method, 'args :: ',  args);
            //</debug>


            //Note:
            //setting a calledParent flag on an instance results in it being set already for further calls which is not good
            //as it indicates a parent call has been made already and leads to unexpected behavior - parent is not called.
            //therefore need to use a temp object that maps the calls per method, and then wipes them out for further calls
            if(this !== this.superclass){

                //Note: when calling from an app instance level it is not the same as the app declaring class because of some reason
                //need to handle this appropriately by digging one level deeper
                var appInstance = Ext.getClassName(this).indexOf('$') > -1,
                    cacheKey = method;
                    className = Ext.getClassName(this.superclass),
                    cacheKey = className  + '_' + method;

                if(!appInstance && (!this.calledMapCache || !this.calledMapCache[cacheKey])){
                    this.calledMapCache = this.calledMapCache || {};
                    this.calledMapCache[cacheKey] = true;
                    this.resetCalledMapCache(cacheKey);

                    //<debug>
                    console.log('aa', cacheKey, Ext.isFunction(this.superclass[method]));
                    //</debug>
                    return this.superclass[method].apply(this, args);
                }
                else {

                    //Note: in some scenarios calling up the inheritance stack stucks and keeps on spinning over the same class
                    //try to dig deeper
                    // if(Ext.isFunction(this.superclass.superclass[method])){
                    //     return this.superclass.superclass[method].apply(this, args);
                    // }

                    //therefore need to cache the calls locally and if such scenario is hit,
                    //digging a lvl up seem to do the trick

                    //work out the next superclass to call
                    var nextSuperClass = this.superclass.superclass,
                        nextKey = Ext.getClassName(nextSuperClass) + '_' + method;

                    this.calledMapCache = this.calledMapCache || {};

                    while(this.calledMapCache && this.calledMapCache[nextKey]){
                        nextSuperClass = nextSuperClass.superclass;
                        nextKey = Ext.getClassName(nextSuperClass) + '_' + method;
                    }

                    this.calledMapCache[nextKey] = true;
                    this.resetCalledMapCache(nextKey);

                    //<debug>
                    console.log('xx', cacheKey, Ext.isFunction(nextSuperClass[method]));
                    //</debug>

                    if(Ext.isFunction(nextSuperClass[method])){
                        return nextSuperClass[method].apply(this, args);
                    }

                }
            }
            //this is not enough!
            //if(this !== this.superclass){
            //    this.superclass[method].apply(this, args);
            //}
            else {
                //hmmm, looks like this is the case, the superclas[method] apply keeps on spinning over itself
                //not entirely sure why, but it looks like it's caused by the way object inheritance works in ExtJs
                //so need to check if can call deeper
                if(this.superclass && this.superclass.superclass){

                    this.calledMapCache = this.calledMapCache || {};
                    var className = Ext.getClassName(this.superclass),
                        cacheKey = className  + '_' + method;

                    this.calledMapCache[cacheKey] = true;
                    this.resetCalledMapCache(cacheKey);


                    this.superclass.superclass[method].apply(this, arguments);
                }
            }

            //This exposes a problem with setting a prop on an instance described above
            // if(!this.calledParent){
            //     this.calledParent = true;
            //     this.superclass[method].apply(this, args);
            // }
            // else {
            //     //hmmm, looks like this is the case, the superclas[method] apply keeps on spinning over itself
            //     //so need to dive deeper
            //     this.superclass.calledParent = true;
            //     this.superclass.superclass[method].apply(this.superclass, arguments);
            // }
        },

        /**
         * @protected
         * @static
         * @inheritable
         */
        callMeSuper: function(args) {
            //TODO...
        },
        
        /**
         * cached map of the called methods in a call chain. gets reset after each call with a little timeout
         */
        calledMapCache: null,

        /**
         * resets call map chain cache
         * @param method
         */
        resetCalledMapCache: function(method){
            Ext.defer(function(){
                if(this.calledMapCache && this.calledMapCache[method]){
                    delete this.calledMapCache[method];
                }
            }, 1, this);
        }
    });

}());
