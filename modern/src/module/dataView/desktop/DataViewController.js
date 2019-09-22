//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){



    //Make sure strict mode is on
    'use strict';

    var logHdr = '[DESKTOP DATA VIEW],_s::,purple';

    /**
     * controls the generic data view behavior - filtering, sorting, reloading and such
     */
    Ext.define('mh.module.dataView.desktop.DataViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-desktop-data-view',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.DataViewLocalization',
            'mh.module.dataView.ModalDataView'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.data.Ajax',
            'mh.mixin.PublishApi',
            'mh.mixin.ModalMode',
            'mh.mixin.ResponseValidationErrorReader'
        ],

        statics: {
            /**
             * handles link redirect wih modal respect to modal mode.
             * if modal mode is on, a floating modal viewer will be shown, otherwise a standard redirect should occur
             * @param componentId identifier of a component to obtain a controller to call store refresh
             * @param route
             * @returns {boolean}
             */
            handleLinkRedirectRespectingModalMode: function(componentId, reloadFn, route){

                if(mh.mixin.ModalMode.getModalModeActive()){
                    //<debug>
                    console.log(logHdr, 'modal mode detected - preventing link re-route; showing modal view instead.');
                    //</debug>
                    var viewer = mh.module.dataView.ModalDataView.show(route);
                    viewer.on(
                        'close',
                        function(rec){
                            try{
                                if(reloadFn === '[reload-fn]'){
                                    reloadFn = 'reloadStore'
                                }
                                var ctrl = Ext.ComponentManager.get(componentId).getController();
                                if(Ext.isFunction(ctrl[reloadFn])){
                                    ctrl[reloadFn]();
                                }
                            }
                            catch(e){
                                //ignore
                            }
                        },
                        this,
                        {single: true}
                    );

                    //false to prevent the default link behavior
                    return false;
                }
                //else - this should simply follow a link
                //<debug>
                console.log(logHdr, 'modal mode off - standard link re-route');
                //</debug>
            }
        },

        translationsNameSpace: null,

        init: function(){
            this.injectLocalizationToViewModel();

            this.translationsNameSpace = this.getView().getTranslationsNameSpace();

            this.publishApi('reloadStore', 'getGridInstance', '__onViewActivate', 'getSelection', 'resetGrid', 'setPageSize');

            this.configureGrid();

            this.configureActionBtns();

            this.handleInitialTbarBtnsVisibility();

            this.adjustClickableLinksTemplates();
        },

        /**
         * spins through the columns to check if any col has a template. If so it replaces a view-id token with the actual view id, so
         * it is possible to properly handle lick clicks in modal mode later
         */
        adjustClickableLinksTemplates: function(){
            var grid = this.getGridInstance(),
                cols = grid.getColumns(),
                cmpId = this.getView().getId();

            Ext.Array.each(cols, function(c){
                var tpl = c.getTpl();

                if(tpl && tpl.html.indexOf('[src-component-id]') > -1){
                    tpl.html = tpl.html.replace('[src-component-id]', cmpId);
                }
            });
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
                store = this.getViewModel().getStore('gridstore'),
                autoLoad = vw.getAutoLoad(),
                remoteSort = vw.getRemoteSort(),
                remoteFilter = vw.getRemoteFilter(),
                pageSizes = vw.getPageSizes(),
                selMode = vw.getSelMode();

            //override selection mode if provided
            if(selMode){
                gridCfg.selectable = gridCfg.selectable || {};
                gridCfg.selectable.mode = selMode;
            }

            store.setAutoLoad(autoLoad);
            store.setRemoteSort(remoteSort);
            store.setRemoteFilter(remoteFilter);


            this.addCustomColumns(gridCfg);

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
                    var toolbar = p.getToolbar();

                    //always insert refresh btn
                    toolbar.insert(0, {
                       xtype: 'button',
                       iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnRefresh'),
                       handler: 'reloadStore'
                   });

                    //also insert a combo with a resultset count - 25, 50, 75, 100; based on a view cfg!
                    if(Ext.isArray(pageSizes) && pageSizes.length > 0){

                        if(pageSizes.indexOf(store.getPageSize()) === -1){
                            pageSizes.push(store.getPageSize());
                            pageSizes = pageSizes.sort(function(a,b){
                                return a - b;
                            });
                        }

                        var storeData = [];
                        Ext.Array.each(pageSizes, function(ps){
                            storeData.push({value: ps});
                        });

                        var pageSizeCmb = toolbar.insert(1, {
                            xtype: 'combobox',
                            reference: 'pageSizeCmb',
                            displayField: 'value',
                            valueField: 'value',
                            editable: false,
                            queryMode: 'local',
                            store: storeData,
                            bind: {
                                label: '{localization.pageSize}'
                            },
                            labelWidth: 65,
                            width: 115,
                            labelAlign: 'left',
                            listeners: {
                                change: 'onPageSizeChange'
                            }
                        });

                        pageSizeCmb.setValue(store.getPageSize())
                    }

                   return false;
                }
            }, this);
        },

        /**
         * page size combo change handler
         * @param cmb
         * @param newV
         * @param oldV
         */
        onPageSizeChange: function(cmb, newV, oldV){
            var store = this.getViewModel().getStore('gridstore');

            if(store.getPageSize() !== newV){
                store.setPageSize(newV);
                store.load();
            }
        },

        /**
         * sets paging toolbar page size
         * @param pageSize
         */
        setPageSize: function(pageSize, silent){
            var cmb = this.lookupReference('pageSizeCmb'),
                store = cmb.getStore();

            store.each(function(ps){
                if(ps.get('value') === pageSize){
                    if(!silent){
                        cmb.setValue(ps);
                        store.load();
                    }
                    else {
                        cmb.suspendEvent('change');
                        cmb.setValue(ps);
                        cmb.resumeEvent('change');
                    }
                }
            });
        },

        /**
         * bumps up a selection timestamp, so can work with grid 'selections' and actually bind to selection and its changes
         */
        bumpUpSelectionChangeTimeStamp: function(){
            this.getViewModel().set('selectionchangetimestamp', new Date().getTime());
        },

        /**
         * Called just before addGridBtns - used as an extension hook for modifying grids
         * @template
         */
        addCustomColumns: Ext.emptyFn,

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
                                ui: view.getGridBtnEditUi() || 'mh-data-view-grid-btn-edit',
                                tooltip: this.getTranslation('btnEdit', this.translationsNameSpace),
                                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnEdit'),
                                handler: function(btn){
                                    me.initRecordEdit(btn.ownerCmp.ownerCmp.getRecord());
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
                                ui: view.getGridBtnDestroyUi() || 'mh-data-view-grid-btn-destroy',
                                tooltip: this.getTranslation('btnDestroy', this.translationsNameSpace),
                                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDestroy'),
                                handler: function(button){
                                    var rec = button.ownerCmp.ownerCmp.getRecord();
                                    if(rec) {
                                        var dialog = Ext.create({
                                            xtype: 'dialog',
                                            title: me.getTranslation('confirmDestroySingleTitle', me.translationsNameSpace),
                                            html: me.getTranslation('confirmDestroySingleRecord', me.translationsNameSpace),
                                            buttons: {
                                                yes: {
                                                    ui: 'base',
                                                    text: me.getTranslation('yes', me.translationsNameSpace),
                                                    handler: function () {
                                                        dialog.destroy();
                                                        me.destroyRecords([rec]);
                                                    }
                                                },
                                                no: {
                                                    ui: 'base',
                                                    text: me.getTranslation('no', me.translationsNameSpace),
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
         * configures action btns - uis and such
         */
        configureActionBtns: function(){
            var vw = this.getView();

            if(this.lookupReference('btnCreate')){
                this.lookupReference('btnCreate').setUi(vw.getBtnCreateUi() || 'mh-data-view-btn-create');
            }
            if(this.lookupReference('btnEdit')){
                this.lookupReference('btnEdit').setUi(vw.getBtnEditUi() || 'mh-data-view-btn-edit');
            }
            if(this.lookupReference('btnDestroy')){
                this.lookupReference('btnDestroy').setUi(vw.getBtnDestroyUi() || 'mh-data-view-btn-destroy');
            }
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
        __onViewActivate: function() {
            if(this.getView().getAutoReloadOnViewActivate() === true){
                this.reloadStore();
            }
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
                //check if in modal mode and if so init modal viewer
                //otherwise simply redirect
                if(this.getModalModeActive()){
                    var viewer = mh.module.dataView.ModalDataView.show(this.getRecViewUrl(cell.record));
                    viewer.on('close', function(rec){this.reloadStore();}, this, {single: true});
                }
                else {
                    this.redirectTo(this.getRecViewUrl(cell.record));
                }
            }
        },

        /**
         * gets a view url for a record
         * @template
         * @param rec
         */
        getRecViewUrl: function(rec){
            return rec.getViewUrl();
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
                //check if in modal mode and if so init modal editor
                //otherwise simply redirect
                if(this.getModalModeActive()){
                    var editor = mh.module.dataView.ModalDataView.show(this.getRecEditUrl(rec));
                    editor.on('close', function(rec){this.reloadStore();}, this, {single: true});
                }
                else {
                    this.redirectTo(this.getRecEditUrl(rec));
                }
            }
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
         * destroy btn tapo handler
         * @param btn
         * @param e
         */
        onBtnDestroyTap: function(btn, e){
            var grid = this.lookup('dataviewgrid'),
                //need to clone selection arr as otherwise would fuck up the selection collection during array slicing
                records = Ext.Array.clone(grid.getSelected().items);
                //record = grid.getSelection();


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

            var me = this,
                dialog = Ext.create({
                xtype: 'dialog',
                title: me.getTranslation(records.length > 1 ? 'confirmDeleteManyTitle' : 'confirmDestroySingleTitle', me.translationsNameSpace),
                html: me.getTranslation(records.length > 1 ? 'confirmDeleteManyRecords' : 'confirmDestroySingleRecord', me.translationsNameSpace),
                buttons: {
                    yes: {
                        text: me.getTranslation('yes', me.translationsNameSpace),
                        handler: function() {
                            dialog.destroy();
                            me.destroyRecords(records);
                        }
                    },
                    no: {
                        text: me.getTranslation('no', me.translationsNameSpace),
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


            //basically going via store delete hooks is tempting but
            //Houston got A PROBLEM... EVENTS GET FIRED TOO FUCKING EARLY
            //this is because remove / datachanged event fires before the proxy finished deletions...
            //looks like removing recs from store is quick, then proxy handles ops silently in the background
            //therefore need to handle this one by one on a record level instead....

            if(records.length === 0){
                //looks like we're done here
                grid.setMasked(false);
                //this.afterRecordDestroy(); //firing per rec destroy now with destroyed rec instance, so no point in firing it here now; see below
                this.reloadStore();
                return;
            }

            //redirecting the actual record delete to a separate fn, so it is possible to customise delete procedure where required!
            var me = this,
                rec = records.pop(),
                success = function(){
                    //fire after rec destroy every time record has been destroyed
                    this.afterRecordDestroy(rec);
                    me.destroyRecords(records);
                },
                failure = me.destroyRecordsFailure;

            //same with mask msg - this makes it possible to customise feedback
            grid.setMasked({
                xtype: 'loadmask',
                message: this.getDeleteLoadMaskMsg(records, rec)
            });

            this.destroyRecord(rec, success, failure);
        },

        /**
         * destroys a single record and returns the control to callbacks provided
         * @param record
         * @param success
         * @param failure
         */
        destroyRecord: function(record, success, failure){

            var me = this,
                cfg = {
                    scope: me,
                    success: success,
                    failure: failure,
                    exceptionMsg: me.getTranslation('destroyFailureMsg', me.translationsNameSpace),
                    autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                    suppress400: true//so can handle 400 here
                },
                callback = me.generateModelRequestCallback(cfg),

                op = function(){
                    record.erase({
                        callback: callback
                    });
                };

            cfg.retry = op;

            op();
        },

        /**
         * gets a delete records load mask msg
         * @param records
         * @param currentRec
         * @returns {*}
         */
        getDeleteLoadMaskMsg: function(records, currentRec){
            return this.getTranslation(records.length > 1 ? 'deleteLoadmaskMany' : 'deleteLoadmaskSingle', this.translationsNameSpace);
        },

        /**
         * rec delete failure handler; unmasks and reloads grid; tries to show a msg if found
         */
        destroyRecordsFailure: function(response){

            var grid = this.getGridInstance();
            grid.setMasked(false);
            this.lookup('dataviewgrid').getStore().load();

            //uhuh, looks like it's a server err...
            this.showValidationMsgServerErr(
                this.getFriendlyServerValidationFeedback(response.responseText || response.responseJson)
            );
        },

        /**
         * create btn tap handler - redirects to a 'create' view
         */
        onBtnCreateTap: function(){
            var model = Ext.create(
                    Ext.getClassName(this.lookup('dataviewgrid').getStore().getModel())
                );

            //check if in modal mode and if so init modal editor
            //otherwise simply redirect
            if(this.getModalModeActive()){
                var editor = mh.module.dataView.ModalDataView.show(this.getRecCreateUrl(model));
                editor.on('close', function(rec){this.reloadStore();}, this, {single: true});
            }
            else {
                this.redirectTo(this.getRecCreateUrl(model));
            }
        },

        /**
         * returns a create url for a rec
         * @param rec
         * @template
         */
        getRecCreateUrl: function(rec){
            return rec.getCreateUrl();
        },

        /**
         * After delete callback - custom after delete logic can be hooked in here
         * @param rec detroyed record
         * @template
         */
        afterRecordDestroy: Ext.emptyFn,


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
                        text: this.getTranslation(col.getDataIndex(), this.translationsNameSpace),
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
                        placeholder: this.getTranslation('filterBlankText', this.translationsNameSpace),
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
                        text: this.getTranslation('btnFilterOn', this.translationsNameSpace),
                        tooltip: this.getTranslation('btnFilterOnTooltip', this.translationsNameSpace),
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

        currentFilterSet: null,

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

            (this.currentFilterSet || []).forEach(function(filter){
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
            this.currentFilterSet = filtersToApply;
            store.filter(filtersToApply);
        },

        /**
         * gets grid selection
         * @returns {MediaStream | Response | MediaStreamTrack | Request}
         */
        getSelection: function(){
            return  Ext.Array.clone(this.lookup('dataviewgrid').getSelected().items);
        },

        /**
         * resets grid
         */
        resetGrid: function(){

            var store = this.getViewModel().get('gridstore');

            //reset the filters
            this.setFilters(null);

            //and reload the store
            //store.loadPage(1);
        },

        /**
         * toolbar resize handler
         * @param toolbar
         * @param newW
         * @param newH
         * @param oldW
         * @param oldH
         * @param info
         * @param eOpts
         */
        onToolbarResize: function(toolbar, newW, newH, oldW, oldH, info, eOpts){
            Ext.defer(function(){
                if(this.shouldCollapseButtons()){
                    this.collapseButtons();
                }
                else {
                    this.expandButtons();
                }
            }, 250, this);
        },

        /**
         * whether or not should collapse btns
         */
        shouldCollapseButtons: function(){
            var btnsTotalWidth = this.getTotalBtnWidth(),
                spaceAvailable = this.lookupReference('dataviewtoolbar').el.getWidth() - this.lookupReference('spacer').el.getLeft();

            return spaceAvailable < btnsTotalWidth;
        },

        /**
         * @private
         */
        btnWidths: null,

        /**
         * gets total width of expanded btns
         * @returns {PaymentItem | number | *}
         */
        getTotalBtnWidth: function(){
            if(!this.btnWidths){
                this.btnWidths = {
                    btnDestroy: this.lookupReference('btnDestroy') ? this.lookupReference('btnDestroy').el.getWidth() : 0,
                    btnEdit: this.lookupReference('btnEdit') ? this.lookupReference('btnEdit').el.getWidth() : 0,
                    btnCreate: this.lookupReference('btnCreate') ? this.lookupReference('btnCreate').el.getWidth() : 0
                }
                this.btnWidths.total = this.btnWidths.btnDestroy + this.btnWidths.btnEdit + this.btnWidths.btnCreate;
            }
            return this.btnWidths.total;
        },

        /**
         * gets a collaction of btn refs that should be collapsible
         * @returns {string[]}
         */
        getCollapsibleBtns: function(){
            return ['btnDestroy', 'btnEdit', 'btnCreate'];
        },

        /**
         * collapses btns
         */
        collapseButtons: function(){
            Ext.Array.each(this.getCollapsibleBtns(), function(btnRef){
                var btn = this.lookupReference(btnRef);
                if(btn && !btn.collapsed){
                    btn.collapsed = true;
                    btn.origText = this.getBtnText(btn);
                    btn.setText(null);
                }
            }, this);
        },

        /**
         * expands btns
         */
        expandButtons: function(){
            Ext.Array.each(this.getCollapsibleBtns(), function(btnRef){
                var btn = this.lookupReference(btnRef);
                if(btn && btn.collapsed){
                    btn.collapsed = false;
                    btn.setText(btn.origText);
                }
            }, this);
        },

        /**
         * gets a btn Text
         * @param btn
         * @returns {*|string}
         */
        getBtnText: function(btn){

            var title;

            //try to grab a title from the 'conventional places'
            //this should account for the dynamic titles too

            //does it have a title getter?
            if(Ext.isFunction(btn.getText)){
                title = btn.getText();
            }

            //maybe set explicitly
            if(!title){
                if(btn.text){
                    title = btn.text;
                }
            }

            //maybe set via bindings
            if(!title){
                if(btn._text){
                    title = btn._text;
                }
            }

            return title || '';
        }
    });
}());