//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var views = {};

    Ext.define('mh.module.dataView.phone.ModalRecordViewSharedController', {

        requires: [
        ],

        mixins: [
            'mh.mixin.ModalMode'
        ],

        /**
         * stack of active dialogs, so can properly unwire events when multiple dialogs are shown
         */
        activeDialogsStack: [],

        /**
         * registers a view for modal display. It expects the view to be of type that can be displayed fullscreen and exposes show / hide methods as well as hide event;
         * usually derived from mh.module.dataView.phone.ModalRecordView
         * @param key
         * @param className
         * @param opts
         * @returns {*}
         */
        registerModalView: function(key, className, opts){
            views[key] = Ext.create(className, Ext.Object.merge(opts ||{}, {
                fullscreen: true,
                closable: false,
                hidden: true
            }));
            return views[key];
        },

        /**
         * whether or not modal view is registered
         * @param key
         * @returns {boolean}
         */
        isModalViewRegistered: function(key){
            return !!views[key];
        },

        /**
         * returns a record view
         */
        getModalView: function(key){
            if(!views[key]){
                throw {msg: key + ' has not been registered' }
            }

            return views[key];
        },

        /**
         * shows a record view
         * @param keyOrObject
         */
        showModalView: function(keyOrObject){
            if(Ext.isString(keyOrObject)){
                keyOrObject = this.getView(keyOrObject);
            }
            this.showModalViewInternal(keyOrObject);
        },

        /**
         * shows a modal view
         * private
         * @param view
         */
        showModalViewInternal: function(view){
            if(this.activeDialogsStack.length === 0){
                //wire up history change listener so can hide dialog on back btn press
                Ext.util.History.on('change', this.historyTriggerredHide, this);
            }

            //keep the track of the stack...
            this.activeDialogsStack.push(view);

            view.on('hide', this.onModalViewHide, this, {single: true});

            view.show();

            this.startModalMode();
        },

        /**
         * hides shared view
         */
        historyTriggerredHide: function(){
            var view = this.activeDialogsStack.pop();
            view.hide();
        },

        /**
         * view hide callback - cleans up the view related evts & trackers
         * @param view
         */
        onModalViewHide: function(view){
            //make sure to filter the views stack in a case call comes directly, not via history back
            this.activeDialogsStack = this.activeDialogsStack.filter(function(item){
                return item !== view;
            });

            if(this.activeDialogsStack.length === 0) {
                Ext.util.History.un('change', this.historyTriggerredHide, this);
            }

            this.endModalMode();
        }

    });
}());
