//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.store.IconsStoreBase', {
        extend: 'Ext.data.Store',
        model: 'mh.data.model.Icon',

        /**
         * gets an icon class
         * @param key
         * @param size; must be an int 2,3,4,5
         * @returns {*}
         */
        getIconClass: function(key, size){
            //make it possible to search by both keys & names
            var rec = this.getAt(this.find('key', key)) || this.getAt(this.find('name', key)),
                prefix, key, css;
            if(rec){
                prefix = rec.get('cssPrefix');
                key = rec.get('key');
                css = 'x-' + prefix + ' ' + prefix + '-' + key;

                if(size){
                    css += ' ' + prefix + '-' + size + 'x'
                }

                return css;
            }

            return null;
        },

        /**
         * returns an icon class with no x-something prefix
         * @param key
         * @returns {*}
         */
        getIconClassWithoutPrefix: function(key){

            //make it possible to search by both keys & names
            var rec = this.getAt(this.find('key', key)) || this.getAt(this.find('name', key)),
                prefix, key, css;

            if(rec){
                prefix = rec.get('cssPrefix');
                key = rec.get('key');
                css = prefix + '-' + key;

                return css;
            }

            return null;
        },

        /**
         * returns a font declared for icon
         * @param key
         * @returns {*}
         */
        getIconFont: function(key){

            //make it possible to search by both keys & names
            var rec = this.getAt(this.find('key', key)) || this.getAt(this.find('name', key));

            if(rec){
                return rec.get('font');
                return css;
            }

            return null;
        }
    });

}());