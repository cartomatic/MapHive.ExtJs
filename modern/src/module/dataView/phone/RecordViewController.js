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
            'mh.mixin.CallMeParent'
        ],

        /**
         * controllers init
         */
        init: function(){
            this.callMeParent(arguments);

            this.publishApi('loadRecord');
            this.setUpActionBtns();

            var vw = this.getView(),
                viewItems = vw.getViewItems();

            if(viewItems && viewItems.length > 0){
                this.lookupReference('viewItemsHolder').add(viewItems);
            }
        },

        /**
         * sets up action btns for this view
         */
        setUpActionBtns: function(){
            var vw = this.getView(),
                enableEdit = vw.getEnableEdit(),
                enableDismiss = vw.getEnableDismiss();

            if(enableEdit) {
                this.lookupReference('editBtn').show();
            }

            if(enableDismiss){
                this.lookupReference('dismissBtn').show();
            }
        },

        /**
         * record load success callback
         * @param rec
         */
        onRecordLoadSuccess: function(rec){
            this.callMeParent(arguments);
        },


        /**
         * edit btn tap handler - redirects to an edit url, router will show whatever view is needed
         */
        onBtnEditTap: function() {
            this.redirectTo(this.getRecEditUrl(this.getViewModel().get('record')));
        },

        /**
         * btn dismiss tap handler
         */
        onBtnDismissTap: function(){
            //simply navigate back from this view
            Ext.History.back();
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
         * whether or not the view is currently active
         */
        isActive: false,

        onViewActivate: function() {
            this.isActive = true;

            //scroll to top on show
            this.lookupReference('viewItemsHolder').getScrollable().scrollTo(0, 0, true);
        },

        onViewDeactivate: function(){
            this.isActive = false;
        }

    });
}());