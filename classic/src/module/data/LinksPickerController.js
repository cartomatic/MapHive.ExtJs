//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 6/9/2016.
     */
    Ext.define('mh.module.data.LinksPickerController', {

        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-links-picker',

        requires: [
            'mh.module.data.LinksPickerLocalisation'
        ],

        mixins: [
            'mh.mixin.ModalMode',
            'mh.mixin.Localisation',
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
            this.injectLocalisationToViewModel()
            this.trackModalModeStatus();

            this.publishApi(['setDataView']);

            this.getView().on('show', this.onShow, this);
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
                console.error('[LINKSPICKER] - ooops, the configured data view does not expose the getSelection method. Unable to obtain links!!! See mh.module.data.DataViewBaseController for details');
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
            if(Ext.isFunction(this.dataView.getTitle) && this.dataView.getTitle()){
                this.getView().setTitle(this.getTranslation('title') + this.getTranslation('titleSeparator') + this.dataView.getTitle());
            }
            else {
                this.getView().setTitle(this.getTranslation('title'));

                //<debug>
                console.error('[LINKSPICKER] - ooops, the configured data view does not expose the getTitle method. Unable to obtain links!!! See mh.module.data.DataViewBaseController for details');
                //</debug>
            }
            
            //and a selection model
            if(Ext.isFunction(this.dataView.setSelectionModel)){
                this.dataView.setSelectionModel('MULTI');
            }
            //<debug>
            else {
                console.error('[LINKSPICKER] - ooops, the configured data view does not expose the setSelectionModel method. Unable to obtain links!!! See mh.module.data.DataViewBaseController for details');
            }
            //</debug>
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
                this.dataView.resetGrid();
            }
            //<debug>
            else {
                console.error('[LINKSPICKER] - ooops, the configured data view does not expose the resetGrid method. Unable to obtain links!!! See mh.module.data.DataViewBaseController for details');
            }
            //</debug>
        }
    });

}());