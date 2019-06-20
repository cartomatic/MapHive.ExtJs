//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    /**
     * basic drag & drop plugin for modern grid
     */
    Ext.define('mh.plugin.grid.DragDrop', {
        extend: 'Ext.AbstractPlugin',
        xtype: 'mh-grid-drag-drop',
        alias: 'plugin.mh-grid-drag-drop',

        mixins: [
            'Ext.mixin.Observable'
        ],

        requires: [
            'Ext.drag.Source',
            'Ext.drag.Target'
        ],

        config: {
            /**
             * a function that renders content displayed in a drag proxy
             */
            contentPresenterFn: null,

            /**
             * clses to ignore; when a grid row contains widgets, this is a way of preventing it from acting as drag handle
             */
            ignoreClses: [],

            /**
             * @cfg {string|atring[]}
             * extra d&d sources for component managed
             */
            ddSource: null,

            /**
             * @cfg {string|atring[]}
             * extra d&d targets for component managed
             */
            ddTarget: null,

            /**
             *
             */
            proxyStyle: null,

            /**
             * cls for a content proxy
             */
            proxyCls: 'mh-grid-drag-drop-proxy',

            /**
             * cls for a proxy when over an invalid target
             */
            proxyInvalidTargetCls: 'mh-grid-drag-drop-proxy-target-invalid',

            /**
             * cls for a proxy when over a valid target
             */
            proxyValidTargetCls: 'mh-grid-drag-drop-proxy-target-valid',

            /**
             * cls for a row when dragged content is over it
             */
            dragOverCls: 'mh-grid-drag-drop-row-over',

            /**
             * validator function that is used do decide whether or not a row can be dragged
             */
            beforeDragStartValidator: null,

            /**
             * custom target validator used to decide whether or not target is valid
             */
            targetValidator: null
        },

        /**
         * component (grid) this plugins is bound to
         * @private
         */
        component: null,

        /**
         * creates a ew instance
         * @param config
         */
        constructor: function(config) {
            //explicitly mixes in the 'observable' goods
            this.mixins.observable.constructor.call(this, config);
        },

        /**
         * time stamp id used for internal source/target setup
         */
        timeStampId: null,

        /**
         * initiates this plugin
         * @param component
         */
        init: function(component) {
            this.component = component;

            this.timeStampId = new Date().getTime();

            this.setupDdSource(component);

            this.setupDdTarget(component);
        },

        /**
         * sets up drag drop target for the passed component
         * @param component
         */
        setupDdTarget: function(component){

            var me = this,
                ddSource = this.getDdSource();

            //make sure dd sources is an array so multiple sources are supported
            if(Ext.isString(ddSource)){
                ddSource =  ddSource.split(',');
            }
            if(!Ext.isArray(ddSource)){
                ddSource = [];
            }
            //if no sources set up, simply set up self as the source
            if(ddSource.length === 0){
                ddSource.push('mh-grid-drag-drop-' + this.timeStampId);
            }

            //working with a grid, so interested in a grid row being target of a drop
            this.target = new Ext.drag.Target({
                element: component.element,
                delegate: '.x-grid-row',
                ddSource: ddSource,
                listeners: {
                }
            });
        },

        /**
         * sets up a drop source for the passed
         * @param component
         */
        setupDdSource: function(component){
            var me = this,
                ddTarget = this.getDdTarget();

            //make sure targets are an array so multiple targets are supported
            if(Ext.isString(ddTarget)){
                ddTarget =  ddTarget.split(',');
            }
            if(!Ext.isArray(ddTarget)){
                ddTarget = [];
            }
            //if no targets set up, simply set up self as the source
            if(ddTarget.length === 0){
                ddTarget.push('mh-grid-drag-drop-' + this.timeStampId);
            }

            //working with a grid, so interested in a grid row being source of a drag
            this.source = new Ext.drag.Source({
                element: component.element,
                delegate: '.x-grid-row',
                ddTarget: ddTarget,

                describe: function(info) {

                    var row = Ext.Component.fromElement(info.eventTarget, component, 'gridrow');
                    if(!row){
                        return;
                    }
                    info.record = row.getRecord();

                    if(component.getSelectable().getMode() === 'multi'){

                        //need to clone arr as otherwise it will fuck up the selection collection
                        info.records = Ext.Array.clone(component.getSelected().items);

                        //make sure record is in the arr, if so ok, drag the range, otherwise drag single rec!
                        if(!Ext.Array.contains(info.records, info.record)){
                            info.records = [info.record];
                        }
                    }

                    info.row = row;
                },

                onDragStart: Ext.bind(this.onDragStart, this),
                onDragMove: Ext.bind(this.onDragMove, this),
                onDragEnd: Ext.bind(this.onDragEnd, this),
                autoDestroy: false,

                proxy: {
                    //initially use the placeholder proxy (Ext.drag.proxy.Placeholder), so the original element is not dragged
                    //this simplifies things - no need to cleanup on an invalid drop!
                    //TODO - make it work also with a Ext.drag.proxy.Original
                    type: 'placeholder',

                    /**
                     * returns a customised element for a drag proxy
                     * @param info
                     * @returns {*}
                     */
                    getElement: function(info) {

                        if(me.proxyEl){
                            me.proxyEl.destroy();
                        }

                        me.proxyEl = Ext.getBody().createChild({
                            cls: me.getProxyCls() || 'mh-grid-drag-drop-proxy'
                        });

                        if(info.record || info.records){

                            var recs = info.records || [],
                                html = 'no custom presenter fn provided',
                                contentPresenterFn = me.getContentPresenterFn(),
                                scope;

                            if(recs.length === 0 && info.record){
                                recs.push(info.record);
                            }

                            //if content presenter has not been provided look around, perhaps it's present elsewhere
                            if(!contentPresenterFn || !Ext.isFunction(contentPresenterFn)){

                                //fn supplied via plugin is not a fn, so trying to obtain it from a grid instance
                                if(this.getSource() && this.getSource().getElement() && this.getSource().getElement().component){

                                    var grid = this.getSource().getElement().component;

                                    //check if fn has been provided via grid class def
                                    if(grid[contentPresenterFn] && Ext.isFunction[grid[contentPresenterFn]]){
                                        //found a fn at the grid comp lvl
                                        contentPresenterFn = grid[contentPresenterFn];
                                        scope = grid;
                                    }
                                    else {
                                        //no luck so far - a desperate try... controller
                                        var ctrlr = grid.getController();

                                        if(ctrlr && ctrlr[contentPresenterFn] && Ext.isFunction(ctrlr[contentPresenterFn])){
                                            contentPresenterFn = ctrlr[contentPresenterFn];
                                            scope = ctrlr;
                                        }
                                    }
                                }
                            }

                            if(contentPresenterFn && Ext.isFunction(contentPresenterFn)){
                                if(scope){
                                    html = contentPresenterFn.call(scope, recs);
                                }
                                else {
                                    html = contentPresenterFn(recs);
                                }
                            }
                            else{
                                //TODO - maybe some sort of nice default content presenter based on the grid column content...
                            }
                            me.proxyEl.show().update(html);
                        }
                        return me.proxyEl;
                    }
                },
                listeners: {
                    scope: me,
                    beforedragstart: Ext.bind(this.onBeforeDragStart, this)
                    // dragstart: this.makeRelayer('dragstart'),
                    // dragmove: this.makeRelayer('dragmove'),
                    // dragend: this.makeRelayer('dragend')
                }
            });
        },


        /**
         * before drag start handler
         * @param event
         * @param info
         * @returns {boolean}
         */
        onBeforeDragStart: function(event, info) {
            if(this.getIgnoreClses().indexOf(info.initialEvent.parentEvent.target.className)!==-1){
                return false;
            }

            //do i have drop targets specified?
            //if not, sorry, no luck
            if(!event.ddTarget || event.ddTarget.length === 0){
                return false;
            }

            //a row is being dragged...
            if(info.row){

                //custom checkup to decide if a row is draggable
                //if a custom logic to decide if can drag has been provided, evaluate it
                if(Ext.isFunction(this.getBeforeDragStartValidator()) && !this.getBeforeDragStartValidator()(info.row.getRecord())){
                    return false;
                }

                //finally store some refs for further usage
                this.rowOver = info.row;
                this.recordOver = info.row.getRecord();
            }
            else {
                //no record under, we're not dragging! sorry dude!
                return false;
            }
        },

        /**
         * drag start handler
         * @param evt
         */
        onDragStart: function(evt){
            //console.warn('dragstart', evt);
        },

        /**
         * marks proxy as invalid
         */
        markProxyInvalid: function(){
            this.proxyEl.el.removeCls('mh-grid-drag-drop-proxy-target-valid');
            this.proxyEl.el.addCls('mh-grid-drag-drop-proxy-target-invalid');
        },

        /**
         * marks proxy as valid
         */
        markProxyValid: function(){
            this.proxyEl.el.removeCls('mh-grid-drag-drop-proxy-target-invalid');
            this.proxyEl.el.addCls('mh-grid-drag-drop-proxy-target-valid');
        },

        /**
         * drag move handler; this is where the context of a drag proxy makes it adjust
         * @param evt
         */
        onDragMove: function(evt){

            if(this.targetValid(evt)){
                this.markProxyValid();
            }
            else {
                this.markProxyInvalid();

                //invalid, no further work
                return;
            }

            var grid = evt.target.getElement().component || {},
                isGrid = grid.baseCls === 'x-grid', //really naive way of checking if is grid... this will blow up with customised grids!
                rowUnder = grid.mouseOverItem,
                recordUnder;

            //Note:
            //currently only row under drop is supported;
            //todo - at some stage also make it work with row over

            if(!rowUnder){
                if(this.lastRowOver){
                    this.lastRowOver.removeCls(this.getDragOverCls());
                }

                if(isGrid){
                    //target is grid, but no row under, so mark as invalid drop target
                    this.markProxyInvalid();
                }

                return;
            }

            recordUnder = rowUnder.getRecord();

            //if same record, mark as invalid drop
            if(recordUnder === this.recordOver){
                this.markProxyInvalid();
            }

            if(recordUnder !== this.recordOver && !rowUnder.hasCls(this.getDragOverCls())) {
                if(this.lastRowOver){
                    this.lastRowOver.removeCls(this.getDragOverCls());
                }
                this.lastRowOver = rowUnder;
                rowUnder.addCls(this.getDragOverCls());
            }
        },

        /**
         * drag end handler
         * @param evt
         */
        onDragEnd: function(evt){

            if(!this.targetValid(evt)){
                return;
            }

            var grid = evt.target.getElement().component,
                rowUnder = (grid || {}).mouseOverItem,
                records = evt.records || [];

            if(records.length === 0 && this.recordOver){
                records.push(this.recordOver);
            }

            if(!rowUnder){
                //looks like no row under is present
                //so this means the dragged object is not a row / rec
            }
            else {
                var recordUnder = rowUnder.getRecord();

                if(recordUnder !== this.recordOver ) {
                    var store = grid.getStore(),
                        indexUnder = store.indexOf(recordUnder);
                    store.remove(records);

                    //looks like need to make some hocus pocus with drop index when multiple records
                    store.insert(records.length > 1 ? indexUnder - 1 : indexUnder, records);
                }
            }

            //clean cls!
            if(this.lastRowOver){
                this.lastRowOver.removeCls(this.getDragOverCls());
            }

            //can notify the grid now...
            this.component.fireEvent('mh-grid-dd-drag-end', {
                event: evt,
                records: records
            });
        },


        /**
         * checks whether or not a drop target is a valid targer
         * @param evt
         * @returns {*|boolean}
         */
        targetValid: function(evt){
            var dropTargets = this.source.ddTarget || [],
                dragSources = evt.target ? evt.target.ddSource || [] : [],
                ok = evt.target && Ext.Array.some(dropTargets, function(g){
                    return dragSources.indexOf(g) >= 0;
                }, this),
                validator = this.getTargetValidator(),
                valid = Ext.isFunction(validator) ? validator(evt) : true;

            return ok && valid;
        },



        /**
         * disables the plugin
         */
        disable: function() {
            this.source.disable();
        },

        /**
         * enables the plugin
         */
        enable: function() {
            this.source.enable();
        },

        /**
         * destroys the plugin
         */
        doDestroy: function() {
            Ext.destroy(this.source);
            this.callParent();
        },

        /**
         * makes an event relayer, so event is fired with a proper scope
         * @param name
         * @returns {function(*, *=): *}
         */
        makeRelayer: function(name) {
            var me = this;
            return function(source, info) {
                return me.fireEvent(name, me, info);
            };
        }
    });
}());
