//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.RecordViewSharedController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-record-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization',
            'mh.module.dataView.ModalDataView'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.PublishApi',
            'mh.module.dataView.RecordLoader',
            'mh.communication.MsgBus',
            'mh.mixin.ModalMode'
        ],

        /**
         * controllers init
         */
        init: function(){
            //Note: in most cases injected localizations will inherit from specific data views and in consequence from mh.module.dataView.DataViewLocalization
            //this is why translations for this module are not placed in its own file but in mh.module.dataView.DataViewLocalization instead
            this.injectLocalizationToViewModel();

            this.publishApi('loadRecord');

        },

        /**
         * sets a record to be bound on the view model
         * @param id
         */
        loadRecord: function(id, route) {

            this.rewindToFirstView();

            this.showLoadMask(
                //try to grab customized translation first and fallback for default
                this.getTranslation('loadRecLoadMask', null, true) || this.getTranslation('loadRecLoadMask', 'mh.module.dataView.DataViewLocalization')
            );

            this.loadRecordInternal(id, route);
        },



        /**
         * record load success callback
         * @param rec
         */
        onRecordLoadSuccess: function(rec){
            this.getViewModel().set('record', rec);
            this.hideLoadMask();
        },

        /**
         * record load failure callback
         */
        onRecordLoadFailure: function(){
            this.getViewModel().set('record', null);
            this.hideLoadMask();
        },

        /**
         * edit btn tap handler - redirects to an edit url, router will show whatever view is needed
         */
        onBtnEditTap: function() {
            this.redirectTo(this.getViewModel().get('record').getEditUrl());
        },

        /**
         * shows loadmask for this module
         * @param msg
         */
        showLoadMask: function(msg){
            if(this.getView().getFloated()){
                this.getView().setMasked({
                    xtype: 'loadmask',
                    message: msg
                });
            }
            else {
                this.fireGlobal('loadmask::show', msg);
            }
        },

        /**
         * hides loadmask for this module
         */
        hideLoadMask: function(){
            this.fireGlobal('loadmask::hide');
        }
    });
}());