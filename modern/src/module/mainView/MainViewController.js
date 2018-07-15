//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainView.MainViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-main-view',

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.Router'
        ],

        requires: [
            'Ext.data.Model'
        ],

        /**
         * @event route::register
         * @param route
         * watched event, registers a submitted route
         */
        init: function() {

            //listen to modules willing to register routes
            this.watchGlobal('route::register', this.onRouteRegister, this);

            var vw = this.getView(),
                navMenu = vw.getNavMenu();

            if(navMenu){
                navMenu.zIndex = 4;
                navMenu.reference = 'navmenu';

                vw.setLbar(navMenu);
            }

            //non menu routes registration
            this.registerNonMenuRoutes();
        },

        /**
         * registers non main menu ui routes
         */
        registerNonMenuRoutes: function(){

            var me = this,
                store = Ext.getStore(this.getView().getNonMenuRoutesStore());
            if(!store){
                return;
            }

            store.each(function(rec){
                if(rec.get('navigationRoute')){
                    me.registerRoute(rec.get('navigationRoute'), 'nav');
                }
                if(rec.get('dataRoute')){
                    me.registerRoute(rec.get('dataRoute'), 'data');
                }
            });
        },

        /**
         * global 'route::register' evt handler
         * @param route
         */
        onRouteRegister: function(route){
            this.registerRoute(route.route, route.type);
        },

        /**
         * registers a route
         * @param route
         * @param type
         */
        registerRoute: function(route, type){
            switch (type){
                case 'nav':
                    this.registerNavRoute(route);
                    break;
                case 'data':
                    this.registerDataRoute(route);
                    break;
                default:
                    break;
            }
        },


        /**
         * Called when the view is created
         */
        handleNavigationRoute: function(type, args) {

            var menuStore = Ext.getStore(this.lookup('navmenu').getMenuStore()),
                nonMenuStore = Ext.getStore(this.getView().getNonMenuRoutesStore()),

                //first check if this is a menu route
                entry = menuStore.getById(type),
                xtype = type;

            //not menu but maybe non-menu?
            if(!entry && nonMenuStore){
                entry = nonMenuStore.getById(type);
            }

            //if not a left menu entry, see if can find a component
            if(!entry){

                //check in class manager if xtype exists - both with and without dataview suffix
                var inst = Ext.ClassManager.getByAlias('widget.' + xtype);
                if(!inst){
                    xtype = xtype + '-dataview';
                    inst = Ext.ClassManager.getByAlias('widget.' + xtype);
                }

                entry = Ext.create('Ext.data.Model',{
                    xtype: xtype,
                    id: type
                });
            }

            //mark main menu if it contains an entry for the current path
            this.lookup('navmenu').setSelection(entry);
            if (!entry) {
                return null;
            }

            var className = Ext.getClassName(Ext.ClassManager.getByAlias('widget.' + entry.get('xtype')));

            //<debug>
            console.warn('type from route', type);
            console.warn('xtype', entry.get('xtype'));
            console.warn('className', className);
            //</debug>

            this.activate(
                this.ensureView(type, {
                    xtype: entry.get('xtype')
                }, args));
        },

        /**
         * @param {String} ref Component reference, MUST be valid.
         * @protected
         */
        activate: function(ref) {

            var view = ref.isComponent? ref : this.lookup(ref),
                child = view,
                parent;

            while (parent = child.getParent()) {
                if(!parent.hasInnerItem(child)){
                    break;
                }
                parent.setActiveItem(child);
                child = parent;
            }

            return view;
        },

        /**
         * @event mainview::itemcreated
         * @param evtData
         * @param evtData.item - main view item instance
         * @param evtData.id - main view item id
         * @param evtData.route - main view item route
         */

        /**
         * ensures a view is instantiated
         * @param id
         * @param config
         * @param route
         * @returns {*}
         */
        ensureView: function(id, config, route) {

            var container = this.getView(),
                //search by xtype or id; when found by xtype, item will be reused
                item = container.child('component[xtype=' + config.xtype + ']') || container.child('component[viewId=' + id + ']');

            if (!item) {
                try {
                    item = container.add(Ext.apply({viewId: id}, config));

                    this.fireGlobal('mainview::itemcreated', {
                        viewId: id,
                        item: item
                    });
                }
                catch(e){
                    //<debug>
                    console.error(e.message, e);
                    //</debug>
                }
            }

            if (Ext.isDefined(item.config.route)) {
                item.setRoute(item.config.route);
            }

            return item;
        },

        /**
         * handles data route - route that handles a record by id
         * @param type
         * @param id
         * @param args
         */
        handleDataRoute: function(type, id, args) {
            var me = this,
                args = Ext.Array.clean((args || '').split('/')),
                action, xtype, view;

            // determine the requested action for the given "type":
            // - #{type}/create: create a new "type"
            // - #{type}/{id}: show record with "id"
            // - #{type}/{id}/edit: edit record with "id"

            if (id === 'create') {
                action = 'create';
                id = null;
            } else if (args[0] === 'edit') {
                action = 'edit';
                args.shift();
            } else {
                action = 'show';
            }
            xtype = type + action;

            // leave a developer message in case of new types addition
            if (!Ext.ClassManager.getNameByAlias('widget.' + xtype)) {
                Ext.log.error('Invalid route: no view for xtype: ' + xtype);
            }
            view = me.ensureView(xtype, { xtype: xtype });
            if(!view.getController().isViewAvailable()){
                window.history.back();
                return false;
            }

            me.activate(view);

            //wtf this does not kick in???
            //view.loadRecord(id);
            view.getController().loadRecord(id);
        }

    });
    
}());