//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * controls the generic data view behavior - filtering, sorting, reloading and such
     */
    Ext.define('mh.module.dataView.DataViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-data-view',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.data.Ajax',
            'mh.mixin.PublishApi'
        ],

        init: function(){
            this.injectLocalizationToViewModel();

            this.publishApi('reloadStore', 'getGridInstance', 'onViewActivate');

            this.configureGrid();
        },

        /**
         * a shortcut for grabbing a grid instance off this view
         * @returns {null}
         */
        getGridInstance: function(){
            return this.grid;
        },

        /**
         * grid instance
         */
        grid: null,

        /**
         * configures grid instance
         */
        configureGrid: function() {

            var vw = this.getView(),
                gridCfg = vw.getGridCfg(),
                store = this.getViewModel().getStore('gridstore');

            //add some handy btns to grid
            this.addGridBtns(gridCfg);

            this.grid = Ext.create(gridCfg);
            this.grid.setStore(store);
            this.grid.setViewModel(this.getViewModel()); //so localization and such is propagated down the stack

            vw.add(this.grid);

            this.setUpAutoFilter();

            //observe store load, so can handle errors properly!
            store.on('load', this.onGridStoreLoad, this);

            //also, this is really fucked up, BUT in modern binding to grid selection does not work,
            //so need to wire up an evt and push the shit to the view model
            this.grid.on('select', this.bumpUpSelectionChangeTimeStamp, this);
            this.grid.on('deselect', this.bumpUpSelectionChangeTimeStamp, this);

            //needed for empty loads. selection does not change in such scenario!
            store.on('load', this.bumpUpSelectionChangeTimeStamp, this);


            //inject refresh btn into paging toolbar
            //unfortunately in modern tkit this one is missing, duh...
            Ext.Array.each(this.grid.getPlugins(), function(p){
                if(p.type === 'pagingtoolbar'){
                    p.getToolbar().insert(0, {
                       xtype: 'button',
                       iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnRefresh'),
                       handler: 'reloadStore'
                   });
                   return false;
                }
            }, this);


            this.handleInitialTbarBtnsVisibility();
        },

        /**
         * bumps up a selection timestamp, so can work with grid 'selections' and actually bind to selection and its changes
         */
        bumpUpSelectionChangeTimeStamp: function(){
            this.getViewModel().set('selectionchangetimestamp', new Date().getTime());
        },

        /**
         * adds some generic buttons to the grid columnset, so grid actions can be triggerred from grid rows too
         * @param gridCfg
         */
        addGridBtns: function(gridCfg){
            var me = this,
                view = this.getView(),
                preventEdit = view.getPreventEdit() === true,
                preventDestroy = view.getPreventDestroy() === true;

            //add edit btn
            if(!preventEdit){
                gridCfg.columns.push(
                    {
                        width: 45,
                        reference: 'gridBtnEdit',
                        menuDisabled: true,
                        cell: {
                            xtype: 'widgetcell',
                            widget: {
                                xtype: 'button',
                                ui: 'base', //TODO - change
                                tooltip: this.getTranslation('btnEdit'),
                                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnEdit'),
                                handler: function(btn){
                                    var rec = btn.ownerCmp.ownerCmp.getRecord();
                                    if(rec) {
                                        me.redirectTo(rec.getEditUrl());
                                    }
                                }
                            }
                        }
                    }
                );
            }


            //add destroy btn
            if(!preventDestroy){
                gridCfg.columns.push(
                    {
                        width: 45,
                        menuDisabled: true,
                        reference: 'gridBtnDestroy',
                        cell: {
                            xtype: 'widgetcell',
                            widget: {
                                xtype: 'button',
                                ui: 'base', //TODO - change
                                tooltip: this.getTranslation('btnDestroy'),
                                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDestroy'),
                                handler: function(button){
                                    var rec = button.ownerCmp.ownerCmp.getRecord();
                                    if(rec) {
                                        var dialog = Ext.create({
                                            xtype: 'dialog',
                                            title: me.getTranslation('confirmDestroySingleTitle'),
                                            html: me.getTranslation('confirmDestroySingleRecord'),
                                            buttons: {
                                                yes: {
                                                    ui: 'base',
                                                    text: me.getTranslation('yes'),
                                                    handler: function () {
                                                        dialog.destroy();
                                                        me.destroyRecords([record]);
                                                    }
                                                },
                                                no: {
                                                    ui: 'base',
                                                    text: me.getTranslation('no'),
                                                    handler: function () {
                                                        dialog.destroy();
                                                    }
                                                }
                                            }

                                        });
                                        dialog.show();
                                    }
                                }
                            }
                        }
                    }
                );
            }

            return gridCfg;
        },

        /**
         * handles initial configured btns visibility
         */
        handleInitialTbarBtnsVisibility: function(){
            var view = this.getView(),
                hidden = {
                    btnCreate: view.getPreventCreate() === true,
                    btnEdit: view.getPreventEdit() === true,
                    btnDestroy: view.getPreventDestroy() === true
                };

            Ext.Array.each(['btnCreate', 'btnEdit', 'btnDestroy'], function(btn){
                //assume btns may not be present in the module - for example it uses a custom tbar...
                if(this.lookupReference(btn)){
                    this.lookupReference(btn).setVisibility(!hidden[btn]);
                }
            }, this);
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
                var firstRow = this.grid.getViewItems()[0];
                if(firstRow){
                    this.grid.getScrollable().ensureVisible(firstRow.el);
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
                                this.getViewModel().get('gridstore').loadRecords([]);
                            },
                            this
                        )
                    }
                )
            }
        },

        /**
         * view activate callback - reloads store, so when user enters this view data is always fresh
         */
        onViewActivate: function() {
            this.reloadStore();
        },

        /**
         * reloads grid store
         */
        reloadStore: function() {

            var store = this.getViewModel().getStore('gridstore');
            if(store.type === 'chained'){
                store.source.load();
            } else {
                store.load();
            }
        },


        /**
         * grid row default dbl tap handler - 'opens up' record by redirecting to the 'show' url
         * @param grid
         * @param cell
         */
        onGridRowDblTap: function(grid, cell) {
            if(this.getView().getDisableGridDblTap() !== true){
                this.redirectTo(cell.record.getViewUrl());
            }
        },

        /**
         * edit btn tap handler
         * @param btn
         * @param e
         * @param rec
         */
        onBtnEditTap: function(btn, e){
            var grid = this.lookup('dataviewgrid'),
                record = grid.getSelection();

            this.initRecordEdit(record);
        },

        /**
         * initiates editing for a record
         * @param rec
         */
        initRecordEdit: function(rec){
            if(rec) {
                this.redirectTo(record.toEditUrl());
            }
        },

        /**
         * destroy btn tapo handler
         * @param btn
         * @param e
         */
        onBtnDestroyTap: function(btn, e){
            var grid = this.lookup('dataviewgrid'),
                //need to clone selection arr as otherwise would fuck up the selection collection during array slicing
                records = Ext.Array.clone(grid.getSelected().items);

            this.initRecordDestroy(records);
        },


        /**
         * initiates records destroy procedure
         * @param records
         */
        initRecordDestroy: function(records){
            if(records.length === 0){
                //nothing to delete mate
                return;
            }

            var dialog = Ext.create({
                xtype: 'dialog',
                title: me.getTranslation(records.length > 1 ? 'confirmDeleteManyTitle' : 'confirmDestroySingleTitle'),
                html: me.getTranslation(records.length > 1 ? 'confirmDeleteManyRecords' : 'confirmDestroySingleRecord'),
                buttons: {
                    yes: {
                        text: me.getTranslation('yes'),
                        handler: function() {
                            dialog.destroy();
                            me.destroyRecords(records);
                        }
                    },
                    no: {
                        text: me.getTranslation('no'),
                        handler: function() {
                            dialog.destroy();
                        }
                    }
                }

            });
            dialog.show();
        },

        /**
         * performs destroy on a collection of records
         */
        destroyRecords: function(records){
            var grid = this.getGridInstance();

            grid.setMasked({
                xtype: 'loadmask',
                message: this.getTranslation(records.length > 1 ? 'deleteLoadmaskMany' : 'deleteLoadmaskSingle')
            });

            //basically going via store delete hooks is tempting but
            //Houston got A PROBLEM... EVENTS GET FIRED TOO FUCKING EARLY
            //this is because remove / datachanged event fires before the proxy finished deletions...
            //looks like removing recs from store is quick, then proxy handles ops silently in the background
            //therefore need to handle this one by one on a record level instead....

            if(records.length === 0){
                //looks like we're done here
                grid.setMasked(false);
                this.reloadStore();
                this.afterRecordDestroy();
                return;
            }

            var me = this,
                rec = records.pop(),
                cfg = {
                    scope: me,
                    success: function(){
                        //keep on deleting until done
                        me.destroyRecords(records);
                    },
                    failure: me.destroyRecordsFailure,
                    exceptionMsg: me.getTranslation('destroyFailureMsg'),
                    autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                    suppress400: true//so can handle 400 here
                },
                callback = me.generateModelRequestCallback(cfg),

                op = function(){
                    rec.erase({
                        callback: callback
                    });
                };

            cfg.retry = op;

            op();
        },

        /**
         * rec delete failure handler; unmasks and reloads grid
         */
        destroyRecordsFailure: function(){
            var grid = this.getGridInstance();
            grid.setMasked(false);
            this.lookup('dataviewgrid').getStore().load();
        },

        /**
         * create btn tap handler - redirects to a 'create' view
         */
        onBtnCreateTap: function(){
            var model = Ext.create(
                    Ext.getClassName(this.lookup('dataviewgrid').getStore().getModel())
                );

            this.redirectTo(model.getCreateUrl());
        },

        /**
         * After delete callback - custom after delete logic can be hooked in here
         * @template
         */
        afterRecordDestroy: function () {
        },


        /**
         * filter input fld ref holder. Used, so the filter stuff can be used in external views. Perhaps at some point the filter itself should be abstracted into
         * an own class.
         * @property
         * @private
         */
        filterInput: null,

        /**
         * filter on btn ref holder; Used, so the filter stuff can be used in external views. Perhaps at some point the filter itself should be abstracted into
         * an own class.
         */
        btnFilterOn: null,

        /**
         * Sets up the auto filter
         */
        setUpAutoFilter: function(){
            var grid = this.lookupReference('dataviewgrid'),
                cols = grid.getColumns(), c = 0, clen = cols.length, col,
                colSpecifierSplitBtnItems = [],
                tbar;

            for(c; c < clen; c++){
                col = cols[c];

                //looks like there is a filter set on a column...
                //need an actual setup dude.
                if(col.filter){
                    //if not set work out filter property from grid binding
                    //in some scenarios may want to display one column but filter on another one...
                    if(!col.filter.property){
                        col.filter.property = col.getDataIndex();
                    }

                    col.filter = Ext.create('Ext.util.Filter', col.filter);


                    //instantiating the checkbox, so can properly set backrefs...
                    var checkboxItem = Ext.create('Ext.menu.CheckItem', {
                        checked: !col.hidden,
                        //assume the filter name is translated via dataIndex property
                        text: this.getTranslation(col.getDataIndex()),
                        listeners: {
                            //in order to make the component movable elsewhere, bind event explicitly
                            //this way it will be possible to take a comp and add ot to another container
                            //while its handlers will remain intact
                            checkchange: Ext.bind(this.onFilterByCheckChange, this)
                        },
                        filter: col.filter //filter ref
                    });

                    colSpecifierSplitBtnItems.push(checkboxItem);

                    //check a checkbox ref on a filter too
                    col.filter.filterByCheckbox = checkboxItem;
                }
            }

            //make sure the filter input should be created
            if(colSpecifierSplitBtnItems.length > 0){
                //set internal state
                this.autoFilterEnabled = true;

                tbar = this.lookupReference('dataviewtoolbar');

                //TODO: consider this to be somewhat setup-able, maybe just put it in the bar by default, but hidden or something...
                tbar.insert(0, [
                    this.filterInput = Ext.create('Ext.field.Search',{
                        xtype: 'searchfield',
                        reference: 'searchInput',
                        placeholder: this.getTranslation('filterBlankText'),
                        //bind: '{filters.search}',
                        enableKeyEvents: true,
                        listeners: {
                            //in order to make the component movable elsewhere, bind event explicitly
                            //this way it will be possible to take a comp and add ot to another container
                            //while its event handlers remain where bound
                            keyup: Ext.bind(this.onFilterInputChange, this),
                            change: Ext.bind(this.onFilterInputChange, this),
                            clearicontap: Ext.bind(this.onBtnClearFiltersTap, this)
                        }
                    }),
                    this.btnFilterOn = Ext.create('Ext.Button', {
                        xtype: 'splitbutton',
                        iconCls: mh.FontIconsDictionary.getIcon('mhDataViewFilter'),
                        text: this.getTranslation('btnFilterOn'),
                        tooltip: this.getTranslation('btnFilterOnTooltip'),
                        reference: 'btnFilterOn',
                        menu: {
                            xtype: 'menu',
                            items: colSpecifierSplitBtnItems
                        }
                    })
                ]);
            }
        },

        /**
         * clear filter btn callback
         */
        onBtnClearFiltersTap: function(){
            var filterInput = this.filterInput;

            if(filterInput && filterInput.getValue()){
                filterInput.setValue(null);
            }
            else {
                //looks like filter value was null already, so need to enforce filter reset explicitly
                this.setFilters(null);
            }
        },

        /**
         * How long should wait before triggering the filters
         */
        freeTextSearchFilterWaitTimeout: 500,

        /**
         * last check change timeout. so can collect multiple checks and fire changes once only
         * @private
         */
        filterByCheckChangeTimeout: null,

        /**
         * filter by menu check item checkchange callback
         * @param chckbox
         * @param checked
         * @param eOpts
         */
        onFilterByCheckChange: function(chckbox, checked, eOpts){

            clearTimeout(this.filterByCheckChangeTimeout);

            //wait a bit so a user has some time to play with the checkboxes
            this.filterByCheckChangeTimeout = Ext.defer(
                function(){
                    //always disable; setting value on checked filter will enable what's needed
                    chckbox.filter.setDisabled(true);

                    //just use whatever the last filter value was
                    this.setFilters(this.lastFilterValue);
                },
                this.freeTextSearchFilterWaitTimeout,
                this
            );
        },

        /**
         * Last filter value. used to decide whether or not a filter should be applied
         * @private
         */
        lastFilterValue: null,

        /**
         * last filter timeout. used to enable timeout reset when filter keeps on changing quickly
         * @private
         */
        lastFilterValueTimeout: null,

        /**
         * Filter input keyup evt listener
         * @param txt
         * @param e
         * @param eOpts
         */
        onFilterInputChange: function(txt, e, eOpts){
            //collect the changes...

            clearTimeout(this.lastFilterValueTimeout);

            this.lastFilterValueTimeout = Ext.defer(
                function(){
                    this.onFilterInputChangeInternal(txt);
                },
                this.freeTextSearchFilterWaitTimeout,
                this
            );
        },

        /**
         * Internal callback for the filter input changes
         * @param txt
         */
        onFilterInputChangeInternal: function(txt){
            var newValue = txt.getValue();

            if(newValue !== this.lastFilterValue){
                this.lastFilterValue = newValue;

                this.setFilters(newValue);
            }
        },

        /**
         * Sets filters value
         * @param value
         */
        setFilters: function(value){
            //need to work out the filters to be applied. it's pretty much about parsing the values for filter types
            //other than string and if a value is parsable, then a filter should be applied

            var grid = this.lookup('dataviewgrid'),
                view = this.getView(),
                cols = grid.getColumns(),
                store = grid.getStore(),
                filtersToApply = [],
                c = 0, clen = cols.length,
                filter,
                parseValue;

            view.getFiltersSet().forEach(function(filter){
                store.removeFilter(filter);
            });

            for(c; c < clen; c++){

                var fValue = null;

                filter = cols[c].filter;

                if(filter && filter.filterByCheckbox.getChecked()){
                    switch(filter.type){
                        case 'string':
                            parseValue = function(v){
                                return v;
                            };
                            break;

                        case 'date':
                            //try parse the date; for the time being just do the date without the time part
                            parseValue = function(v){
                                return Ext.Date.parse(v, "Y-m-d");
                            };
                            break;

                        case 'number':
                            parseValue = function(v){
                                //make sure to replace commas with dots; first comma will do
                                v = v.replace(',', '.');

                                //do not parse if v contains dashes
                                v = v.indexOf('-') > 0 ? null : parseFloat(v);
                                return !isNaN(v) ? v: null;
                            };
                            break;

                        case 'boolean':
                            parseValue = function(v){
                                return v.toLowerCase() === 'true' ? true :
                                    v.toLowerCase() === 'false' ? false : null;
                            };

                        case 'list':
                            //todo - if value.toString() === list key.toString() -> apply filter
                            break;
                    }

                    if(value !== null && value !== ''){
                        fValue = parseValue(value);
                    }

                    if(fValue !== null){

                        //pick a proper function to use. TriFilter has this a bit more nested...
                        //ps. grid's filter.getValue is to closely tied up with the input fields, so if they are not rendered it fails
                        //hence to obtain the currently set value need to use the utilFilter instead the grid filters
                        var currValue = Ext.isFunction(filter.getValue) ? filter.getValue() : filter.eq.getValue();

                        //make sure to not re-apply same value, as this triggers store reload
                        //but only if a filter is active! if it's not active, we need to set its value and activate it in order to trigger store reload
                        if(!filter.disabled || (filter.disabled && fValue !== currValue)){

                            if(filter.type === 'number' || filter.type === 'date'){
                                //date && number filters are TriFilters - they have 3 inputs: eq, lt, gt, and the filter value must be provided in a
                                //specific format
                                // fValue = {
                                //     eq: fValue //fixme: date will not get hit really... need gt/lt
                                // };

                                //Note: in modern tkit filter serializes wrong when set as above. in classic all seems ok...!
                                //perhaps because col filter plugin makes 3 independent filters out of it!
                                //FIXME - This will have to be addressed at some stage; guess when it becomes annoying enough ;)
                            }

                            //need to activate a filter prior to setting its value as otherwise it'll not work
                            filter.setDisabled(false);
                            filter.setValue(fValue);
                            filtersToApply.push(filter);

                        }
                    }
                    else {
                        //dbl check as setting filter value to null should be enough on its own
                        filter.setDisabled(true);
                    }
                }
                else if (filter){
                    //reset even if not checked - this should give a one point access to the filter reset. this should be handy dandy
                    filter.setDisabled(true);
                }
            }
            view.setFiltersSet(filtersToApply);
            store.filter(filtersToApply);
        }
    });
}());