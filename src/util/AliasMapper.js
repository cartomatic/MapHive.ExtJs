//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var aliases = {};

    /**
     * utility for providing multiple aliasing for classes
     */
    Ext.define('mh.util.AliasMapper', {
        singleton: true,

        /**
         * gets an xtype by alias
         * @param alias
         * @returns {*}
         */
        getXtypeFromAlias: function(alias){
            if(aliases[alias]){
                return aliases[alias];
            }
            //<debug>
            Ext.log.error('No alias found for: ' + alias);
            //<debug>
            return undefined;
        },

        /**
         * registers aliasses for a newly created class
         * @param classDef
         */
        registerAliases: function(classDef){
            //class def should be the def after it has been defined, so it should be possible to access both xtype and aliases
            if(Ext.isArray(classDef.aliases)){
                Ext.Array.each(classDef.aliases, function(alias){
                    aliases[alias] = classDef.xtype;
                });
            }
        },

        /**
         * returns alias map
         */
        getAliasMap: function(){
            return aliases;
        }
    });
}());
