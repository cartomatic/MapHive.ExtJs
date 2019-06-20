//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Cfg extraction helpers. Used when a cfg property is passed at some level above in the view hierarchy and is meant to drill down to the children;
     * Note: implementation actually is that it is a child that tries to extract a cfg property explicitly, so the drilling is done up the stack.
     */
    Ext.define('mh.mixin.ObjectConfigUtils', {

        /**
         * tries to locate a config property; if a property setter is present and is fn, the output will be passed to the setter; otherwise the output will be returned directly from this function
         * @param cfgProperty
         * @param outputPropertySetter
         * @returns {*}
         */
        tryLocateConfigProperty: function(cfgProperty, outputPropertySetter){

            var view = this.getView();

            if(view.rendered){
                return this.tryLocateConfigPropertyInternal(cfgProperty, view);
            }
            else {
                //only wire up listener if it is a fn. otherwise it will not make sense using it at all
                if(Ext.isFunction(outputPropertySetter)){
                    view.on('render', function(){
                        outputPropertySetter(this.tryLocateConfigPropertyInternal(cfgProperty));
                    }, this);
                }
            }
        },

        /**
         * tries to locate a config property of a view by travelling up the view components hierarchy
         * @param cfgProperty
         */
        tryLocateConfigPropertyInternal: function(cfgProperty, view){

            var g = this.getGetterName(cfgProperty),
                pValue;

            //if !view assume this is a view controller
            if(!view && Ext.isFunction(this.getView)){
                view = this.getView();
            }

            if(!view)
                return null;

            //see if can extract the cfg value at this level
            if(Ext.isFunction(view[g])){
                pValue = view[g]();
            }

            //if value is undefined keep travelling up the stack
            if(pValue === undefined || pValue === null){
                if(view.ownerCt){
                    pValue = this.tryLocateConfigPropertyInternal(cfgProperty, view.ownerCt);
                }
            }
            return pValue;
        },

        /**
         * gets a getter name for a config property
         * @param cfgProperty
         * @returns {string}
         */
        getGetterName: function(cfgProperty){
            return 'get' + cfgProperty[0].toUpperCase() + cfgProperty.substr(1);
        }
    });

}());