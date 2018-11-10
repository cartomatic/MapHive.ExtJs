//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.RecordViewSharedController', {

        requires: [
            'Ext.History',
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
         * handles view initialization setup - this is where the screens cfg gets processed
         * @param vw
         * @param eOpts
         */
        onViewInitialize: function(vw, eOpts){
            vw.lookup('tabPanel').add(vw.getScreens());

            this.configureActionBtns();
        },

        /**
         * configures action btns - uis and such
         */
        configureActionBtns: function(){
            var vw = this.getView();

            if(this.lookupReference('btnNext')){
                this.lookupReference('btnNext').setUi(vw.getBtnPrevUi() || 'mh-record-view-btn-prev');
            }
            if(this.lookupReference('btnPrev')){
                this.lookupReference('btnPrev').setUi(vw.getBtnNextUi() || 'mh-record-view-btn-next');
            }
            if(this.lookupReference('btnEdit')){
                this.lookupReference('btnEdit').setUi(vw.getBtnEditUi() || 'mh-record-view-btn-edit');
            }
            if(this.lookupReference('btnBack')){
                this.lookupReference('btnBack').setUi(vw.getBtnBackUi() || 'mh-record-view-btn-back');
            }
        },


        /**
         * gets the count of tabs items in this view
         * @param tabs
         * @returns {number}
         */
        getItemCount: function(tabs) {
            return tabs.getInnerItems().length;
        },

        /**
         * gets an index of active tab
         * @param tabs
         * @returns {number}
         */
        getActiveIndex: function(tabs) {
            return tabs.getInnerItems().indexOf(tabs.getActiveItem());
        },

        /**
         * moves to a next view
         * @param increment
         */
        advance: function(increment) {
            var me = this,
                tabs = me.lookup('tabPanel'),
                index = me.getActiveIndex(tabs),
                count = me.getItemCount(tabs),
                next = index + increment;

            tabs.setActiveItem(Math.max(0, Math.min(count-1, next)));
        },

        /**
         * re-syncs tab state after adding / removing screens
         */
        resync: function() {
            var me = this,
                vm = me.getViewModel(),
                tabs = me.lookup('tabPanel'),
                prev = me.lookup('btnPrev'),
                next = me.lookup('btnNext'),
                index = me.getActiveIndex(tabs),
                count = me.getItemCount(tabs),
                single = count < 2;

            tabs.getTabBar().setHidden(single);
            prev.setDisabled(index <= 0).setHidden(single);
            next.setDisabled(index == -1 || index >= count-1).setHidden(single);
        },

        /**
         * prev btn tap
         */
        onBtnPrevTap: function() {
            this.advance(-1);
        },

        /**
         * next btn tap
         */
        onBtnNextTap: function() {
            this.advance(1);
        },

        /**
         * rewinds form to first view
         */
        rewindToFirstView: function(){

            //find index to turn on
            var tabPanel = this.lookup('tabPanel'),
                tabs = tabPanel.getTabBar().items.items;

            //first shown tab to be activated
            Ext.Array.each(tabs, function(tab, idx){
                if(tab.getHidden())
                {
                    return ;
                }
                else {
                    tabPanel.setActiveItem(idx);
                    return false;
                }
            });
        },

        /**
         * rewinds to a specified view (tab needs to have a hash property
         * @param hash
         */
        rewindToView: function(hash){
            //find index to turn on
            var tabPanel = this.lookup('tabPanel'),
                tabs = tabPanel.getTabBar().items.items;

            //first shown tab to be activated
            Ext.Array.each(tabs, function(tab, idx){
                if(tab.getHidden())
                {
                    return ;
                }
                else if (tab.card.hash === hash){
                    tabPanel.setActiveItem(idx);
                    return false;
                }
            });
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
            if(this.getView().getFloated()){
                this.getView().setMasked(false);
            }
            else {
                this.fireGlobal('loadmask::hide');
            }
        }
    });
}());