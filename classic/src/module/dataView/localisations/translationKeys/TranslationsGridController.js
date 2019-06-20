//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.translationKeys.TranslationsGridController', {
        extend: 'mh.module.dataView.BindableStoreGridController',
        alias: 'controller.mh-translationsgrid',

        requires: [
            'Ext.data.Store',
            'mh.data.model.Translation',
            'mh.module.dataView.localizations.translationKeys.TranslationsGridLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.GridUtils',
            'mh.mixin.PublishApi'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            //self translate - bring in translations to a view model - ui txt is bound via view model
            this.injectLocalizationToViewModel();


            //create a grid store and bind it to a grid
            this.gridStore = Ext.create('Ext.data.Store', {
                model: 'mh.data.model.Translation',
                data: []
            });
            this.getView().setStore(this.gridStore);

            this.publishApi(['enableEditMode']);
        },

        loadedRec: null,

        /**
         * whether or not the data is being currently pumped into a store. used to avoid store change callbacks
         */
        duringDataSet: false,

        /**
         * Customised set data...
         * @param data
         */
        setGridData: function(rec){

            //bind data only once per record!
            if(this.loadedRec === rec)
                return;

            var data = [],
                translations, tkeys, tk, tklen;
            this.loadedRec = rec;

            //grab the translations off the rec and load them to a local store
            if(rec){

                translations = rec.get('translations') || {};
                tkeys = Ext.Object.getKeys(translations);
                tk = 0; tklen = tkeys.length;

                for(tk; tk < tklen; tk++){
                    data.push(Ext.create(this.gridStore.getModel(), {
                        langCode: tkeys[tk],
                        translation: translations[tkeys[tk]]
                    }));
                }
            }

            //make sure to flag self as during the data set, so store change events are ignored during this time
            this.duringDataSet = true;
            this.gridStore.setData(data);
            this.duringDataSet = false;
        },

        /**
         * enables edit mode
         */
        enableEditMode: function(){

            this.activateActiveColsTooltips(this.getView());

            this.lookupReference('translationsgrid_coldelete').show();
            this.lookupReference('translationsgrid_tbar').show();


            //watch the grid store for changes
            //looks like in 6.5.3 datachanged evt listener will go nuts without a buffer
            //this.gridStore.on('datachanged', this.onDataChanged, this, {buffer: 250}); //rec add, remove
            // this.gridStore.on('add', this.onDataChanged, this);
            // this.gridStore.on('remove', this.onDataChanged, this);
            this.gridStore.on('refresh', this.onDataChanged, this);
            this.gridStore.on('update', this.onDataChanged, this); //rec edit
        },

        /**
         * store data changed / update listener
         */
        onDataChanged: function(){
            if(this.loadedRec && !this.duringDataSet){ //make sure to not mess around when setting data, so can avoid a bloody callback flood
                //set changed data back on the original record
                this.loadedRec.set('translations', this.getTranslationsData());
            }
        },

        /**
         * Gets translations data and sets it back on a record
         * @returns {Array}
         */
        getTranslationsData: function(){
            var data = {};
            this.gridStore.each(function(r){
                data[r.get('langCode')] = r.get('translation');
            });
            return data;
        },

        /**
         * btn add translation click callback
         */
        onBtnAddTranslationClick: function(){
            //insert an empty model
            this.gridStore.add(Ext.create(this.gridStore.getModel()));
        },

        /**
         * grid rec remove btn callback
         * @param view
         * @param rowIdx
         * @param colIdx
         * @param item
         * @param e
         * @param record
         */
        onTranslationDeleteClick: function(view, rowIdx, colIdx, item, e, record){
            this.gridStore.remove(record);
        }
    });

}());