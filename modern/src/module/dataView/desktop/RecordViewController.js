//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-desktop-record-view',

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
            'mh.mixin.ModalMode',
            'mh.module.dataView.desktop.RecordViewSharedController'
        ],

        /**
         * controllers init
         */
        init: function(){
            //when view kicks in, make sure to add its items
            this.getView().on('initialize', this.onViewInitialize, this);

            this.callMeParent(arguments);
        },

        /**
         * sets a record to be bound on the view model
         * @param id
         */
        loadRecord: function(id, route) {
            this.rewindToFirstView();
            this.callMeParent(arguments);
        },

        /**
         * edit btn tap handler - redirects to an edit url, router will show whatever view is needed
         */
        onBtnEditTap: function() {
            if(this.getModalModeActive()){
                var editor = mh.module.dataView.ModalDataView.show(this.getViewModel().get('record').getEditUrl());
                editor.on('editview::savecompleted', function(rec){this.onRecordLoadSuccess(rec);}, this, {single: true});
            }
            else {
                this.redirectTo(this.getViewModel().get('record').getEditUrl());
            }
        },

        /**
         * back btn tap - go back in history, router will pick up whatever view is required
         */
        onBtnBackTap: function() {
            if(this.getView().getFloated()){
                this.getView().close();
            }
            else {
                Ext.History.back();
            }
        }
    });
}());