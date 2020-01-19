//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
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

            var brk = false;

            Ext.Array.each(document.styleSheets, function(dSs){
                var classes = (dSs.rules || dSs.cssRules);

                Ext.Array.each(classes, function(c){
                    if(c instanceof CSSImportRule){

                        var classes1 = c.styleSheet.rules || c.styleSheet.cssRules;
                        Ext.Array.each(classes1, function(c1){
                            if(c1.selectorText === selector){
                                this.fontCharCache[selector] = this.extractFontCharFromStyle(c1);
                                brk = true;
                            }
                            if(brk){
                                return false;
                            }
                        }, this);
                    }
                    else{
                        if(c.selectorText === selector){
                            this.fontCharCache[selector] = this.extractFontCharFromStyle(c);
                            brk = true;
                        }
                    }
                    if(brk){
                        return false;
                    }
                }, this);

                if(brk){
                    return false;
                }
            }, this);

            if(this.fontCharCache[selector]){
                return this.fontCharCache[selector];
            }
        },

        extractFontCharFromStyle: function(cssClass, selector){
            return (cssClass.style.content
                .replace('"', '')
                .replace('"', '')
                .charCodeAt(0));
        }

    });
    
}());