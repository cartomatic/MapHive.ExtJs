//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/

(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.util.Cookie', {
        singleton: true,

        getMhCookie: function(){
            try {
                return (Cookies.getJSON(__mhcfg__.mhCookie) || {});
            }
            catch(e){
                return {}
            }
        },

        setMhCookie: function(cookie){
            Cookies.set(__mhcfg__.mhCookie, cookie, {expires: __mhcfg__.cookieValidSeconds / (60*60*24)});
        },

        setMhCookieProp: function(pName, pValue){
            var cookie = this.getMhCookie();
            cookie[pName] = pValue;
            this.setMhCookie(cookie);
        },

        getMhCookieProp: function(pName){
            return this.getMhCookie()[pName];
        }
    });
    
}());