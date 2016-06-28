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

            if(this !== this.superclass){
                this.superclass[method].apply(this, args);
            }
            else {
                //hmmm, looks like this is the case, the superclas[method] apply keeps on spinning over itself
                //not entirely sure why, but it looks like it's caused by the way object inheritacne works in ExtJs
                //so need to check if can call deeper
                if(this.superclass && this.superclass.superclass){
                    this.superclass.superclass[method].apply(this.superclass, arguments);
                }
            }

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
        }
    });

}());