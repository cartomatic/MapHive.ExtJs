//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Because in strict mode access to caller is censored, extending ExtJs classes requires some hocus-pocus (this is true in ExtJs6; more than likely will change in the future)
     * This class should be used as a mixin to provide an easy to access callParent and callSuper equivalents
     */
    Ext.define('mh.util.CallMeParent', {
        /**
         * @protected
         * @static
         * @inheritable
         */
        callMeParent: function(args) {

            var e = new Error(), stack;
            if (e.stack) {
                stack = e.stack;
            } else if (e.stacktrace) {
                stack = e.stacktrace;
            }

            console.warn('stack', stack);

            // var sCallerName;
            // {
            //     let re = /(\w+)@|at (\w+) \(/g;
            //     let aRegexResult = re.exec(new Error().stack);
            //     sCallerName = aRegexResult[1] || aRegexResult[2];
            // }
            // console.log(sCallerName);

            //err stack output in ff and chrome.
            //https://developer.mozilla.org/en-US/docs/Web/API/Console/trace

            // var method;
            //
            // // This code is intentionally inlined for the least amount of debugger stepping
            // return (method = this.callParent.caller) && (method.$previous ||
            //     ((method = method.$owner ? method : method.caller) &&
            //     method.$owner.superclass.self[method.$name])).apply(this, args || noArgs);
        },

        /**
         * @protected
         * @static
         * @inheritable
         */
        callMeSuper: function(args) {
            var method;

            // This code is intentionally inlined for the least amount of debugger stepping
            return (method = this.callSuper.caller) &&
                ((method = method.$owner ? method : method.caller) &&
                method.$owner.superclass.self[method.$name]).apply(this, args || noArgs);
        }
    });

}());