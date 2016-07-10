//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.TranslationsGridController', {
        extend: 'mh.module.dataView.BindableStoreGridController',
        alias: 'controller.mofp-email-templates-translationsgrid',

    requires: [
        'Ext.data.Store',
        'mh.module.dataView.localisations.emailTemplates.TranslationsGridLocalisation',
        'mh.data.model.EmailTemplateTranslation',
        'mh.data.model.Translation'
    ],

    mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.GridUtils',
            'mh.mixin.PublishApi'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            //self translate - bring in translations to a view model - ui txt is bound via view model
            this.injectLocalisationToViewModel();


            //create a grid store and bind it to a grid
            this.gridStore = Ext.create('Ext.data.Store', {
                model: 'mh.data.model.EmailTemplateTranslation',
                data: []
            });
            this.lookupReference('translationsgrid').setStore(this.gridStore);

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
                        title: translations[tkeys[tk]].title,
                        body: translations[tkeys[tk]].body
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

            this.activateActiveColsTooltips(this.lookupReference('translationsgrid'));

            this.lookupReference('translationsgrid_coldelete').show();
            this.lookupReference('translationsgrid_tbar').show();

            this.lookupReference('htmleditor').setReadOnly(false);

            //watch the grid store for changes
            this.gridStore.on('datachanged', this.onDataChanged, this); //rec add, remove
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
                data[r.get('langCode')] = {
                    title: r.get('title'),
                    body: r.get('body')
                }
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