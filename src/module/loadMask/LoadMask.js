(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 02.03.2017.
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
            if(Ext.isModern){
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: msg
                });
            }
            else {
                Ext.getBody().mask(msg);
            }
        },

        onLoadMaskHide: function(){
            if(Ext.isModern){
                Ext.Viewport.setMasked(null);
            }
            else {
                Ext.getBody().unmask();
            }
        }
    });
    
}());