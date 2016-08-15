//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.controller.Splash', {
        extend: 'Ext.app.Controller',

        mixins: [
            'mh.communication.MsgBus'
        ],

        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('splash ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('splash::hide', this.onSplashHide, this);
        },

        /**
         * takes care of hiding splash screen
         */
        onSplashHide: function(){
            //hide splash - this will not cause problems if a splash has already been hidden
            if(typeof(splash) !== 'undefined' && Ext.isFunction(splash.hide)){
                splash.hide();
            }
        }

    });
}());