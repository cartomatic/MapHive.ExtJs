//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.phone.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-phone-record-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.PublishApi',
            'mh.module.dataView.RecordLoader',
            'mh.communication.MsgBus',
            'mh.mixin.ModalMode',
            'mh.mixin.CallMeParent',
            'mh.module.dataView.phone.RecordViewSharedController'
        ],

        /**
         * controllers init
         */
        init: function(){
            this.callMeParent(arguments);

            this.publishApi('loadRecord');
            this.setUpActionBtns();
        },

        /**
         * edit btn instance
         */
        btnEdit: null,

        /**
         * sets up action btns for this view
         */
        setUpActionBtns: function(){
            var vw = this.getView(),
                enableEdit = vw.getEnableEdit();

            if(enableEdit){
                this.btnEdit = vw.add({
                    xtype: 'button',
                    floated: true,
                    ui: 'confirm round',
                    right: 15,
                    bottom: 15,
                    hidden: true,
                    iconCls: mh.FontIconsDictionary.getIcon('mhDataViewEdit'),
                    listeners: {
                        tap: 'onBtnEditTap'
                    }
                });
            }
        },

        /**
         * record load success callback
         * @param rec
         */
        onRecordLoadSuccess: function(rec){
            this.callMeParent(arguments);
            this.handleFloatingBtnsVisibility();
        },


        /**
         * edit btn tap handler - redirects to an edit url, router will show whatever view is needed
         */
        onBtnEditTap: function() {
            this.redirectTo(this.getRecEditUrl(this.getViewModel().get('record')));
        },

        /**
         * returns edit url for a rec
         * @template
         * @param rec
         * @returns {*|string}
         */
        getRecEditUrl: function(rec){
            return rec.getEditUrl();
        },

        /**
         * handles floating btns visibility
         * @param show
         */
        handleFloatingBtnsVisibility: function(){
            var vw = this.getView(),
                rec = vw.get('record'),
                enableEdit = vw.getEnableCreate();

            if(this.isActive  && enableEdit === true && this.btnEdit && rec && rec.get('uuid')){ //show edit rec btn only for recs with uuids! no point in showing ot for create mode
                this.btnEdit.show();
            }
            else if(this.btnEdit) {
                this.lookupReference('btnEdit').hide();
            }
        }

    });
}());