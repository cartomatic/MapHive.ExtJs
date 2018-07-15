//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.FontIconsDictionary', {
        singleton: true,

        icons: {
            iconNotFound: 'x-i54c i54c-zombie'
        },

        /**
         * gets an icon by key
         * @param icon
         */
        getIcon: function(icon){
            if(this.icons[icon]){
                return this.icons[icon];
            }
            else {
                //<debug>
                console.error('No icon found for key:' + icon);
                //</debug>
                return this.icons.iconNotFound + ' font-icon-not-found';
            }
        },

        /**
         * adds new icons to the dict
         * @param icons
         * @param overwrite
         */
        addIcons: function(icons, overwrite){
            Ext.Array.each(Ext.Object.getKeys(icons), function(icon){
                if(overwrite || !this.icons[icon]){
                    this.icons[icon] = icons[icon];
                }
            }, this);
        },

        fontCharCache: null,

        getFontChar: function(selector){

            this.fontCharCache = this.fontCharCache || {};

            if(this.fontCharCache[selector]){
                return this.fontCharCache[selector];
            }
            Ext.Array.each(document.styleSheets, function(ss){
                var classes = ss.rules || ss.cssRules;
                Ext.Array.each(classes, function(c){
                    if(c.selectorText === selector){
                        this.fontCharCache[selector] = c.style.content
                                .replace('"', '')
                                .replace('"', '')
                                .charCodeAt(0);
                    }
                }, this);
            }, this);
        }
    });
    
}());