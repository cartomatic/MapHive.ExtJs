//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * generic app wide loadmask
     */
    Ext.define('mh.module.loadMask.LoadMask', {
        singleton: true,

        mixins: [
            'mh.communication.MsgBus'
        ],

        constructor: function(){
            this.watchGlobal('loadmask::show', this.onLoadMaskShow, this);
            this.watchGlobal('loadmask::hide', this.onLoadMaskHide, this);
        },

        onLoadMaskShow: function(msg){
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: msg
            });
        },

        onLoadMaskHide: function(){
            Ext.Viewport.setMasked(null);
        }
    });
}());
