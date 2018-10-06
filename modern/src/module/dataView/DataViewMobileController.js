//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 05.10.2018.
     */
    Ext.define('mh.module.dataView.DataViewMobileController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-data-view-mobile',

        requires: [
            'mh.module.dataView.DataViewMobileLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.Localization',
            'mh.data.Ajax'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            this.configureListView();

            this.configureActionBtns();
        },

        /**
         * an instance of a listview used by this module
         */
        listView: null,

        /**
         * configures list view
         */
        configureListView: function(){
            var vw = this.getView(),
                viewCfg = vw.getViewCfg(),
                store = this.getViewModel().getStore('listviewstore');

            if(!viewCfg){
                console.error('You need to configure a list for this view');
            }

            this.listView = Ext.create(viewCfg);
            this.listView.setStore(store);
            this.listView.setViewModel(this.getViewModel()); //so localization and such is propagated down the stack

            vw.add(this.listView);

            //observe store load, so can handle errors properly!
            store.on('load', this.onGridStoreLoad, this);
        },

        /**
         * Store load evt callback; used to redirect err handling
         * @param store
         * @param records
         * @param success
         * @param operation
         * @param eOpts
         */
        onGridStoreLoad: function(store, records, success, operation, eOpts){
            if(success){
                //on success focus first row, so grid scrolls to top
                var firstRow = this.listView.getViewItems()[0];
                if(firstRow){
                    this.listView.getScrollable().ensureVisible(firstRow.el);
                }
                //Note: this does not change the selection if present; just scrolls to top
            }
            else {
                this.handleFailedRequest(
                    operation.error.response,
                    {
                        failure: Ext.bind(
                            function(){
                                //just load empty arr, so grid removes previously displayed data
                                this.getViewModel().get('listviewstore').loadRecords([]);
                            },
                            this
                        )
                    }
                )
            }
        },

        configureActionBtns: function(){
            var vw = this.getView(),
                enableEdit = vw.getEnableEdit(),
                enableDestroy = vw.getEnableDestroy();

            //TODO - swipe edit / delete

            //Note: floating btns handled on view activate / deactivate
        },

        /**
         * whether or not a view is currently active
         */
        isActive: false,

        /**
         * view activate callback - reloads store, so when user enters this view data is always fresh
         */
        onViewActivate: function() {
            this.isActive = true;
            this.handleFloatingBtnsVisibility();
            this.reloadStore();
        },

        onViewDeactivate: function(){
            this.isActive = false;
            this.handleFloatingBtnsVisibility();
        },

        /**
         * handles floating btns visibility
         * @param show
         */
        handleFloatingBtnsVisibility: function(){
            var vw = this.getView(),
                enableCreate = vw.getEnableCreate();

            if(this.isActive && enableCreate === true){
                this.lookupReference('btnCreate').show();
            }
            else {
                this.lookupReference('btnCreate').hide();
            }
        },

        /**
         * reloads grid store
         */
        reloadStore: function() {

            var store = this.getViewModel().getStore('listviewstore');

            if(store.type === 'chained'){
                store.source.load();
            } else {
                store.load();
            }
        },

        /**
         * create btn tap handler - redirects to a 'create' view
         */
        onBtnCreateTap: function(){
            var model = Ext.create(
                Ext.getClassName(this.getViewModel().getStore('listviewstore').getModel())
            );

            this.redirectTo(model.getCreateUrl());
        }
    });
}());
