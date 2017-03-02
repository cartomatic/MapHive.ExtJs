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
            Ext.getBody().mask(msg);

            //TODO - modern toolkit
        },

        onLoadMaskHide: function(){
            Ext.getBody().unmask();

            //TODO - moder toolkit
        }
    });
    
}());