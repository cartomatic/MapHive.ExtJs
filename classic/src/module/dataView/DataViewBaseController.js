//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.DataViewBaseController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-dataview-base',

    requires: [
        'mh.module.dataView.DataViewBaseLocalisation',
        'mh.module.dataView.Editor',
        'Ext.menu.CheckItem'
    ],

    mixins: [
            'mh.mixin.Localisation',
            'mh.data.Ajax',
            'mh.mixin.PublishApi',
            'mh.mixin.CustomConfig',
            'mh.mixin.ResponseValidationErrorReader'
        ],


        /**
         * How long should wait before triggering the filters
         */
        freeTextSearchFilterWaitTimeout: 500,

        /**
         * Default editor to be used by this class
         */
        defaultEditor: 'mh.module.dataView.Editor',

        /**
         * whether or not the editability has been enabled during the setup
         */
        editabilityEnabled: false,

        /**
         * whenther or not the auto filtering has been enabled during the setup
         */
        autoFilterEnabled: false,

        /**
         * Called when the view is created
         */
        init: function() {

            //bring in translations to a view model - ui txt is bound via view model
            this.injectLocalisationToViewModel();

            //apply custom configurations
            this.applyCustomViewConfig();

            this.publishApi(['getSelection', 'getTitle', 'setSelectionMode', 'resetGrid', 'resetSelection']);

            //some translations
            var refs = this.getReferences(),
                view = this.getView(),
                gridHolder = this.lookupReference('gridHolder'),
                formHolder = this.lookupReference('formHolder'),
                grid = view.getGrid(),
                gridIconCls = view.getGridIconCls(),
                form = view.getForm(),
                formIconCls = view.getFormIconCls(),
                formWidth = view.getFormWidth() || formHolder.getWidth(),
                hideGridHeader = view.getHideGridHeader(),
                hideFormHeader = view.getHideFormHeader(),

                gridOpts = {
                    reference: 'grid',
                    //set the sel model, so it is easy to just change the selection mode
                    selModel: {
                        selType: 'rowmodel', // rowmodel is the default selection model
                        mode:  view.getSelMode() || 'SINGLE'
                    }
                },
                formOpts = {
                    reference: 'form'
                },

                toggleRegions = false;

            //hide the grid's header; useful when using nested
            if(hideGridHeader === true){
                gridHolder.header = false;
            }

            if(hideFormHeader === true){
                formHolder.header = false;
            }

            //instantiate grid + data view and inject into layout
            grid = this.ensureGridDef(grid);
            if(grid){

                //if a grid has defined width, then will have to swap regions
                toggleRegions = grid.width !== undefined;

                //Note: grabbing store off a view model, as grid initially will have an empty one and will bind to viewmodel's one later it seems
                var store = this.getViewModel().get('gridstore');

                //do a postponed autoload. load the data when view is rendered and activated for the first time
                //in this case, the activate event will not fire as it is reserved for card based layouts such as card, tab panel. so hooking up to after layout as it is fired when the view gets ready to be displayed
                if(view.getAutoLoad()){
                    view.on('afterlayout', function(){
                        store.loadPage(1);
                    }, this, {single: true})
                }
                
                //set remote sorting and or filtering based on the dataview cfg
                store.setRemoteSort(view.getRemoteSort());
                store.setRemoteFilter(view.getRemoteFilter());

                gridHolder.add(this.createInstance(grid, gridOpts));

                if(gridIconCls){
                    gridHolder.setIconCls(gridIconCls);
                }

                //wire up some grid store evt listeners. This is needed so the error handling can be passed to generic grid utils
                //and it is possible to handle it further here, so grid does not break on errors, but instead just loads empty data

                store.on('load', this.onGridStoreLoad, this);
            }
            else {
                gridHolder.hide();
            }

            //now goes the form
            form = this.ensureFormDef(form);
            if(form){
                formHolder.add(this.createInstance(form, formOpts));

                if(formIconCls) {
                    formHolder.setIconCls(formIconCls)
                }

                formHolder.setWidth(formWidth)
            }
            else {
                formHolder.hide();
                this.lookupReference('eastOuterHolder').hide();
            }

            if(toggleRegions && grid && form){
                var westHolder = this.lookupReference('westOuterHolder'),
                    centerHolder = this.lookupReference('centerOuterHolder'),
                    eastHolder = this.lookupReference('eastOuterHolder');

                westHolder.show();
                westHolder.setWidth(grid.width);
                westHolder.add(gridHolder);

                centerHolder.add(formHolder);

                eastHolder.hide();

                //Note: dunno why the titles get unbound??? maybe because the components are moved around and change parents??? need to reset them manually which sucks a bit
                gridHolder.setTitle(this.getTranslation('gridTitle'));
                formHolder.setTitle(this.getTranslation('formTitle'));
            }

            //the top toolbar setup...
            this.setUpEditUi();
            this.setUpAutoFilter();
            this.manageTbarVisibility();

            //wire up a layout change listenr on the toolbar, so can control some internal sizing of btns
            this.lookupReference('gridTbar').on('afterlayout', this.onAfterToolbarLayout, this);
        },

        //Some APIs exposed on the view, so it can be used for links pickers!
        //--------------------------------------------------------------------------------------------------------------

        /**
         * returns the current selection in the grid component
         */
        getSelection: function(){
            return this.lookupReference('grid').getSelection();
        },



        /**
         * returns this view's title
         */
        getTitle: function(){
            return this.getViewModel().get('localisation.gridTitle');
        },

        /**
         * Sets a selection model for a grid component; although it looks like going from single to multi messes the selection behavior a lot - especially unselects on click, shift, ctrl key modifiers; dunno why really. looks like extjs boogy woogy
         * @param sMode
         */
        setSelectionMode: function(sMode){
            this.lookupReference('grid').getSelectionModel().setSelectionMode(sMode);
        },

        /**
         * Resets grid - removes the filters, triggers reload
         */
        resetGrid: function(){

            var store = this.getViewModel().get('gridstore');

            //reset the filters
            this.onBtnClearFiltersClick(null);

            //and reload the store
            store.loadPage(1);
        },

        /**
         * resets selection in the grid
         */
        resetSelection: function(){
            this.lookupReference('grid').getSelectionModel().deselectAll();
        },

        //--------------------------------------------------------------------------------------------------------------
        //EO Exposed APIs


        /**
         * last known tbar width; used to check if a toolbar related layout works are needed
         */
        lastToolbarWidth: null,

        /**
         * toolbar after layout logic scheduler; used to collect multiple calls and do the work just once
         */
        currentToolbarAfterLayoutScheduler: null,

        /**
         * tbar after layout callback; takes care of showing / hiding the text on the edit btns depending on the tbar width
         * @param tbar
         */
        onAfterToolbarLayout: function(tbar){
            clearTimeout(this.currentToolbarAfterLayoutScheduler);
            this.currentToolbarAfterLayoutScheduler = Ext.defer(
                function(){
                    var w = tbar.getWidth(),
                        me = this,
                        restoreTxt = function(btn){
                            btn = me.lookupReference(btn);
                            if(btn.origTxt){
                                btn.setText(btn.origTxt);
                                btn.origTxt = null;
                            }
                        },
                        hideTxt = function(btn){
                            btn = me.lookupReference(btn);
                            if(!btn.origTxt){
                                btn.origTxt = btn.getText();
                                btn.setText('');
                            }
                        };

                    if(this.lastToolbarWidth !== w){
                        this.lastToolbarWidth = w;

                        if(w > 670){
                            restoreTxt('btnCreate');
                            restoreTxt('btnEdit');
                            restoreTxt('btnDelete');
                        }
                        else {
                            hideTxt('btnCreate');
                            hideTxt('btnEdit');
                            hideTxt('btnDelete');
                        }
                    }
                },
                25,
                this
            );
        },

        /**
         * Sets up the edit ui - takes care of the edit btns visibility
         */
        setUpEditUi: function(){
            var preventEdit = this.getView().getEditForm() === false,
                items, i = 0, len,
                startHiding = false;

            if(preventEdit){

                items = this.lookupReference('gridTbar').items.items;
                len = items.length;

                //quite
                for(i; i < len; i++){

                    //just hide all the stuff starting with btnCreate.
                    if(startHiding || items[i].reference === 'btnCreate'){
                        startHiding = true;
                        items[i].hide();
                    }
                }
            }

            //set internal state
            this.editabilityEnabled = !preventEdit;
        },

        /**
         * hides the toolbar if there are no visible items
         */
        manageTbarVisibility: function() {
            if (this.editabilityEnabled || this.autoFilterEnabled){
                this.lookupReference('gridTbar').show();
            }
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
                this.lookupReference('grid').getView().focusRow(0);

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
         * Sets up the auto filter
         */
        setUpAutoFilter: function(){
            var view = this.getView(),
                autoFilter = view.getUseAutoFilter(),
                grid,
                cols, c = 0, clen, col,

                colSpecifierSplitBtnItems = [],

                tbar;

            if(autoFilter !== true)
                return;

            //got here so have to check if any of the columns of a grid are actually set up with filters
            grid = this.lookupReference('grid');
            cols = grid.columns;
            clen = cols.length;

            for(c; c < clen; c++){
                col = cols[c];

                if(col.filter){
                    //looks like there is a filter set on a column...
                    var checkboxItem = Ext.create('Ext.menu.CheckItem',{ //instantiating the checkbox, so can properly set backrefs...
                        checked: !col.hidden,
                        text: this.getTranslation(col.dataIndex),
                        listeners: {
                            checkchange: 'onFilterByCheckChange'
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

                tbar = this.lookupReference('gridTbar');

                tbar.insert(0, [
                    {
                        xtype: 'textfield',
                        reference: 'txtFilterInput',
                        emptyText: this.getTranslation('filterBlankText'),
                        width: 250,
                        enableKeyEvents: true,
                        listeners: {
                            keyup: 'onFilterInputChange',
                            change: 'onFilterInputChange'
                        },
                        triggers: {
                            foo: {
                                cls: 'x-fa fa-remove',
                                handler: 'onBtnClearFiltersClick'
                            }
                        }
                    },
                    {
                        xtype: 'splitbutton',
                        iconCls: 'x-fa  fa-filter',
                        text: this.getTranslation('btnFilterOn'),
                        tooltip: this.getTranslation('btnFilterOnTooltip'),
                        menu: {
                            xtype: 'menu',
                            items: colSpecifierSplitBtnItems
                        }
                    }
                ]);
            }


        },

        /**
         * clear filter btn callback
         */
        onBtnClearFiltersClick: function(){
            var txt = this.lookupReference('txtFilterInput');
            if(txt && txt.getValue()){
                txt.setValue(null);
            }
            else {
                //looks like filter value was null already, so need to enforce filter reset explicitly
                this.setFilters(null);
            }
        },

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
                    //delegate the filter value setter further.
                    if(checked){
                        //just use whatever the last filter value was
                        this.setFilters(this.lastFilterValue);
                    }
                    else {
                        chckbox.filter.setActive(false);
                    }
                },
                this.freeTextSearchFilterWaitTimeout,
                this
            )
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

            var grid = this.lookupReference('grid'),
                cols = grid.columns,
                c = 0, clen = cols.length,
                filter,

                parseValue;

            for(c; c < clen; c++){

                var fValue = null;

                filter = cols[c].filter;

                if(filter && filter.filterByCheckbox.checked){
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
                        var currValue = Ext.isFunction(filter.filter.getValue) ? filter.filter.getValue() : filter.filter.eq.getValue();

                        //make sure to not re-apply same value, as this triggers store reload
                        //but only if a filter is active! if it's not active, we need to set its value and activate it in order to trigger store reload
                        if(!filter.active || fValue !== currValue){

                            if(filter.type === 'number' || filter.type === 'date'){
                                //date && number filters are TriFilters - they have 3 inputs: eq, lt, gt, and the filter value must be provided in a
                                //specific format
                                fValue = {
                                    eq: fValue
                                }
                            }

                            //need to activate a filter prior to setting its value as otherwise it'll not work
                            filter.setActive(true);
                            filter.setValue(fValue);
                        }
                    }
                    else {
                        filter.setActive(false); //dbl check as setting filter value to null should do on its own
                    }
                }
                else if (filter){
                    //reset even if not checked - this should give a one point access to the filter reset. this should be handy dandy
                    filter.setActive(false);
                }
            }
        },

        /**
         * Creates an instance of an object with the specified opts (if def is a string) or an object literal with merged opts
         * @param def
         * @param opts
         * @returns {*}
         */
        createInstance: function(def, opts){
            var instance = null;
            opts = opts || {};
            if(def){
                if(Ext.isString(def)){

                    //need to set a parent fot the data model. because the object is instantiated 'manually' it seems to not get proper
                    //view model links to parents. therefore need to enforce it!!!
                    //when using xtypes this does not seem to be required. dunno why
                    Ext.merge(
                        opts,
                        {
                            viewModel: {
                                parent: this.getViewModel()
                            }
                        }
                    )
                    instance = Ext.create(def, opts);
                }
                else {
                    instance = Ext.merge(def, opts);
                }
            }
            return instance;
        },

        /**
         * Fixes grid def - just provides a default mock for a grid that should be overriden;
         * @param grid
         * @returns {*}
         */
        ensureGridDef: function(grid){
            if(grid !== false && !grid){
                //creating a fake grid, so will need a store for this too
                this.getViewModel().set(
                    'gridstore',
                    Ext.create('Ext.data.Store', {
                        fields: [
                            { name: 'col1', type: 'string'},
                            {name: 'col2', type: 'number'}
                        ],
                        data: (function(){ //some fake data for the temp store
                            var data = [];
                            for(var i = 1; i <= 25; i++){
                                data.push({col1: 'String value ' + i, col2: i});
                            }
                            return data;
                        }())
                    })
                );

                grid = {
                    xtype: 'grid',
                    bind: { store: '{gridstore}' },
                    columns: [
                        {
                            bind: { text: '{localisation.col1}'},
                            dataIndex: 'col1',
                            flex: 1
                        },
                        {
                            bind: { text: '{localisation.col2}'},
                            dataIndex: 'col2',
                            flex: 1
                        }
                    ]
                };
            }
            return grid;
        },

        /**
         * provides a default form implementation if no form is declared. This is to show, the form should be overriden
         * @param form
         * @returns {*}
         */
        ensureFormDef: function(form){
            if(form !== false && !form){
                form = {
                    xtype: 'form',
                    layout: 'form',
                    bind: { title: '{localisation.formTitle}'},
                    split: true,
                    items: [
                        {
                            xtype: 'displayfield',
                            value: '<span style="color:brown;">You should really declare a data view form you know...</span>'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                fieldLabel: '{localisation.col1}',
                                value: '{rec.col1}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            bind: {
                                fieldLabel: '{localisation.col2}',
                                value: '{rec.col2}'
                            }
                        }
                    ]
                };
            }
            return form;
        },

        /**
         * Instance of a configured editor
         */
        editor: null,

        /**
         * Gets a configured editor instance; if it is not possible to create an instance, a msg is given and null is returned
         * @param btn
         * btn that trigerred the editor creation
         * @returns {*}
         */
        getEditor: function(btn){
            if(!this.editor){

                var view = this.getView(),
                    editForm = view.getEditForm() || view.getForm(),
                    editor = view.getEditor();

                //auto default to the basic mh.module.dataView.Editor
                if(editor !== false && !editor){
                    editor = this.defaultEditor;
                }

                //Note:
                //editor is expected to be defined as a class name
                //editor is expected to expose some apis that let one show / hide it
                //and listen for grid reload requests - this happens when an editor manages to save the data

                try {
                    this.editor = Ext.create(editor, {

                    });
                    this.editor.setForm(this.createInstance(editForm))
                }
                catch(e){
                    //<debug>
                    console.warn('Failed to create edit form', e);
                    //</debug>
                    //give a msg
                    Ext.Msg.show({
                        title: this.getTranslation('editorCfgErrTitle'),
                        message: this.getTranslation('editorCfgErrMsg') + e.message,
                        width: 300,
                        buttons: Ext.Msg.OK,
                        animateTarget: btn ? btn : undefined,
                        icon: Ext.MessageBox.ERROR
                    });
                }

            }

            //editor exists, so just set the animate target to an triggering btn
            //no nice setter here though...
            this.editor.animateTarget = btn;

            //hook to save complete
            this.editor.on('savecomplete', this.onSaveComplete, this, {single: true});

            return this.editor;
        },


        /**
         * save complete evt callback; savecomplete is fired by editor
         * @param record
         */
        onSaveComplete: function(success, record){
            //only think about reloading a grid when a save has been successful; no point in doing so otherwise
            if(success){
                //Q: should check if a rec has been modified??? save success has already commited changes anyway...

                //for the time being just reload the grid.
                this.reloadGrid();
            }
        },

        /**
         * btn create click callback
         * @param btn
         */
        onBtnCreateClick: function(btn){

            var editor = this.getEditor(btn),
                store = this.getViewModel().getStore('gridstore'),
                //grab the model off the gridstore
                model = store.getModel(),
                rec;

            //do make sure editor instance is available
            if(!editor){
                return;
            }

            //bind an empty rec to the editor
            rec = Ext.create(model);
            editor.setRecord(rec);


            editor.show();
        },

        /**
         * btn edit click callback
         * @param btn
         */
        onBtnEditClick: function(btn){
            var editor = this.getEditor(btn),
                recs = this.lookupReference('grid').getSelection() || [],
                rec;

            //do make sure editor instance is available
            if(!editor || recs.length !== 1){
                return;
            }

            rec = recs[0];
            editor.setRecord(rec);

            editor.show();
        },

        /**
         * btn delete click callback
         * @param btn
         */
        onBtnDeleteClick: function(btn){
            var recs = this.lookupReference('grid').getSelection() || [],
                confirmTitle = recs.length > 1 ? this.getTranslation('confirmDeleteManyTitle')
                    : this.getTranslation('confirmDeleteSingleTitle'),
                confirmMsg = recs.length > 1 ? this.getTranslation('confirmDeleteManyRecords')
                    : this.getTranslation('confirmDeleteSingleRecord'),
                me = this;

            //make sure there is work to be done
            if(recs.length === 0){
                return;
            }

            //prompt user if he is sure to delete a record
            Ext.Msg.show({
                title: confirmTitle,
                message: confirmMsg,
                width: 300,
                buttons: Ext.Msg.OKCANCEL,
                amimateTarget: btn,
                icon: Ext.Msg.WARNING,
                fn: function(msgBtn){
                    if(msgBtn === 'ok'){
                        me.deleteRecords(recs);
                    }
                }
            });
        },

        /**
         * A collection of records queued for deletion
         */
        recsToBeDeleted: null,

        /**
         * Initiates the records delete procedure.
         *
         * Note: a little dilemma here... This is data view, so records delete do not fit here that much. perhaps should use a generic record remover???
         * @param recs
         */
        deleteRecords: function(recs){
            var loadMaskMsg = recs.length > 1 ? this.getTranslation('deleteLoadmaskMany')
                    : this.getTranslation('deleteLoadmaskSingle'),

                exceptionMsg = this.getTranslation('deleteFailureMsg'),

                r = 0, rlen = recs.length,

                me = this,

                //prepares a wrapper for the deletion op
                prepareDeletionOp = function(rec){
                    var cfg = {
                            scope: me,
                            success: me.onRecDeleteSuccess,
                            failure: me.onRecDeleteFailure,
                            exceptionMsg: exceptionMsg,
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

                    return op;
                };

            //make sure there is work to be done
            if(rlen === 0){
                return;
            }

            //show loadMask
            this.getView().mask(loadMaskMsg);

            //soo.... now need to queue the records to be deleted and keep on deleting until the queue is empty.
            this.recsToBeDeleted = [];
            for(r; r < rlen; r++){
                this.recsToBeDeleted.push(prepareDeletionOp(recs[r]));
            }

            this.deleteNextRecord();
        },

        /**
         * deletes next record
         */
        deleteNextRecord: function(){
            if(this.recsToBeDeleted && this.recsToBeDeleted.length > 0){
                var nextOp = this.recsToBeDeleted.shift();
                nextOp();
            }
            else {
                //looks like there isn't much to delete... So just unmask and reload
                this.getView().unmask();
                this.reloadGrid();
            }
        },

        /**
         * Successful record delete callback
         * @param record
         * @param operation
         */
        onRecDeleteSuccess: function(record, operation){
            //just go back to the deleteNextRecord; it will handle things for us
            this.deleteNextRecord();
        },

        /**
         * record deletion failure callback
         * @param record
         * @param operation
         */
        onRecDeleteFailure: function(response, operation){
            //uups, deletion failed, and user chose to not repeat the op
            //Note: potentially we could give a user another option to retry here: something like - there are still pending deletions, try again??? not that it matters as a user can always trigger the deletion again!
            this.getView().unmask();
            this.reloadGrid();

            this.showValidationMsgServerErr(
                this.getFriendlyServerValidationFeedback(response.responseText)
            );
        },
        
        /**
         * reloads the grid
         */
        reloadGrid: function(){
            //this should load the store with the last filters, sorters and such.
            this.lookupReference('grid').getStore().load();
        }
    });

}());