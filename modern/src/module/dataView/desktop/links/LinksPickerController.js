//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.links.LinksPickerController', {

        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-desktop-links-picker',

        requires: [
            'mh.module.dataView.desktop.links.LinksPickerLocalization'
        ],

        mixins: [
            'mh.mixin.ModalMode',
            'mh.mixin.Localization',
            'mh.mixin.PublishApi'
        ],

        /**
         * an instance of a view with a grid. This requires some specific API to be present in order to work properly.
         * if the methods are not there, some functionality will simply not work as expected.
         */
        dataView: null,

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();
            this.trackModalModeStatus();

            this.publishApi(['setDataView', 'getDataViewTitle']);

            this.getView().on('show', this.onShow, this);
            this.getView().on('hide', this.onHide, this);
        },

        /**
         * add btn click callback
         */
        onBtnAddClick: function(){

            var records = [];

            //need to collect a selection off the grid and maybe fire an event
            if(Ext.isFunction(this.dataView.getSelection)){
                records = this.dataView.getSelection();
            }
            //<debug>
            else {
                console.error('[LINKSPICKER] - ooops, the configured data view does not expose the getSelection method. Unable to obtain links!!! See mh.module.dataView.DataViewBaseController for details');
            }
            //</debug>

            
            if(records.length > 0){
                this.getView().fireEvent('linkspicked', records);

                //then need to hide the view
                this.getView().hide();
            }
        },

        /**
         * sets a dataview in this component
         * @param dv
         */
        setDataView: function(dv){
            this.dataView = this.getView().add(dv);

            //try to set a title...
            this.setTitle();

            //Note: selection mode for the grid now comes from the links grid cfg - see selModel property or a direct cfg on a dataview object
            //note: just setting selection mode to 'multi' did cause unexpected behavior - selecting did not work as expected
            // //and a selection model
            // if(Ext.isFunction(this.dataView.setSelectionMode)){
            //     this.dataView.setSelectionMode(dataViewSelectionMode || 'MULTI');
            // }
            // //<debug>
            // else {
            //     console.error('[LINKSPICKER] - ooops, the configured data view does not expose the setSelectionMode method. Unable to obtain links!!! See mh.module.dataView.DataViewBaseController for details');
            // }
            // //</debug>
        },

        /**
         * sets the window title
         */
        setTitle: function(){

            var dataViewTitle = this.getDataViewTitle(),
                title = this.getTranslation('title');

            if(dataViewTitle){
                title += this.getTranslation('titleSeparator') + dataViewTitle;
            }

            this.getView().setTitle(title);
        },

        /**
         * tries to obtaina dataview title
         * @returns {*}
         */
        getDataViewTitle: function() {
            var dataViewTitle;

            //check if can obtain a title of the view title
            if(Ext.isFunction(this.dataView.getTitle) && this.dataView.getTitle()){
                dataViewTitle = this.dataView.getTitle();
            }
            //maybe set via view model bindings, so should be at a _title property
            else if(this.dataView._title){
                dataViewTitle = this.dataView._title;
            }
            else if(this.dataView.getViewModel().get('localization.viewName')){
                dataViewTitle = this.dataView.getViewModel().get('localization.viewName');
            }
            else {
                //<debug>
                console.error('[LINKSPICKER] - ooops, could not obtain title for a view. Tried getTitle(), _title * viewModel.get("localization.viewName")');
                //</debug>
            }

            return dataViewTitle;
        },

        /**
         * cancel btn callback
         */
        onBtnCancelClick: function(){
            this.getView().hide();
        },

        /**
         * view show callback; triggers grid reset
         */
        onShow: function(){
            if(Ext.isFunction(this.dataView.resetGrid)){
                var defer = this.getView().getDeferLinksPickerRefresh();
                if(defer){
                    Ext.defer(
                        function(){
                            this.dataView.resetGrid();
                        },
                        defer === true ? 1 : defer,
                        this
                    )
                }
                else {
                    this.dataView.resetGrid();
                }
            }
            //<debug>
            else {
                console.error('[LINKSPICKER] - ooops, the configured data view does not expose the resetGrid method. Unable to obtain links!!! See mh.module.dataView.DataViewBaseController for details');
            }
            //</debug>
        },

        /**
         * on hide logic
         */
        onHide: function(){
            //unselect all on hide
            if(Ext.isFunction(this.dataView.resetSelection)){
                this.dataView.resetSelection();
            }
        }
    });

}());