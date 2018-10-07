//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.phone.RecordViewSharedController', {

        requires: [
            'Ext.History'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.PublishApi',
            'mh.module.dataView.RecordLoader',
            'mh.communication.MsgBus',
            'mh.mixin.ModalMode'
        ],

        /**
         * shows loadmask for this module
         * @param msg
         */
        showLoadMask: function(msg){
            this.fireGlobal('loadmask::show', msg);
        },

        /**
         * hides loadmask for this module
         */
        hideLoadMask: function(){
            this.fireGlobal('loadmask::hide');
        },

        /**
         * handles floating btns visibility
         * @param show
         */
        handleFloatingBtnsVisibility: Ext.emptyFn,

        /**
         * whether or not the view is currently active
         */
        isActive: false,

        onViewActivate: function() {
            this.isActive = true;
            this.handleFloatingBtnsVisibility();
        },

        onViewDeactivate: function(){
            this.isActive = false;
            this.handleFloatingBtnsVisibility();
        }

    });
}());