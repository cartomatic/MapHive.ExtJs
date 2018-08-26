//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.RecordViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-record-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.PublishApi',
            'mh.module.dataView.RecordLoader',
            'mh.communication.MsgBus'
        ],

        /**
         * controllers init
         */
        init: function(){
            //when view kicks in, make sure to add its items
            this.getView().on('initialize', this.onViewInitialize, this);

            //Note: in most cases injected localizations will inherit from specific data views and in consequence from mh.module.dataView.DataViewLocalization
            //this is why translations for this module are not placed in its own file but in mh.module.dataView.DataViewLocalization instead
            this.injectLocalizationToViewModel();

            this.publishApi('loadRecord');
        },

        /**
         * handles view initialization setup - this is where the screens cfg gets processed
         * @param vw
         * @param eOpts
         */
        onViewInitialize: function(vw, eOpts){
            vw.lookup('tabPanel').add(vw.getScreens());
        },

        /**
         * sets a record to be bound on the view model
         * @param id
         */
        loadRecord: function(id) {

            this.rewindToFirstView();

            this.showLoadMask(
                //try to grab customized translation first and fallback for default
                this.getTranslation('loadRecLoadMask', null, true) || this.getTranslation('loadRecLoadMask', 'mh.module.dataView.DataViewLocalization')
            );

            this.loadRecordInternal(id);
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
         * back btn tap - go back in history, router will pick up whatever view is required
         */
        onBtnBackTap: function() {
            Ext.History.back();
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
         * scrfeen add handler
         */
        onScreenAdd: function() {
            this.resync();
        },

        /**
         * screen remove handler
         * @param tabs
         */
        onScreenRemove: function(tabs) {
            if (!tabs.destroying) {
                this.resync();
            }
        },

        /**
         * screen activate handler
         * @param tabs
         */
        onScreenActivate: function(tabs) {
            // This event is triggered when the view is being destroyed!
            if (!tabs.destroying) {
                this.resync();
            }
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