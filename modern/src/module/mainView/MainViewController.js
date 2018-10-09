//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var consoleHdr = '[ROUTER@Main]_s::,orange,';

    Ext.define('mh.module.mainView.MainViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-main-view',

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.Router',
            'mh.mixin.ModalMode',
            'mh.mixin.DirtyMode',
            'mh.util.console.Formatters'
        ],

        requires: [
            'Ext.data.Model',
            'mh.util.AliasMapper'
        ],


        /**
         * @event route::register
         * @param route
         * watched event, registers a submitted route
         */
        init: function() {

            //listen to modules willing to register routes
            this.watchGlobal('route::register', this.onRouteRegister, this);

            var vw = this.getView();

            //menu && non menu routes registration
            this.registerRoutes(vw.getMenuRoutesStore());
            this.registerRoutes(vw.getNonMenuRoutesStore());
        },

        /**
         * registers menu routes store
         * @param storeId
         */
        registerRoutes: function(storeId){

            var me = this,
                store = Ext.getStore(storeId);
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
        onRouteRegister: function(routes){
            if(!Ext.isArray(routes)){
                routes = [routes];
            }
            Ext.Array.each(routes, function(route){
                this.registerRoute(route.route, route.type);
            }, this);
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
         * handles navigation route - creates a view for it and displays it. returns a navigation route rec and view
         * @param routeParams
         */
        handleNavigationRoute: function(routeParams) {

            //<debug>
            console.warn(consoleHdr, 'Handling NAV route', routeParams[0]);
            //</debug>

            //properly handle MODAL MODE!
            if (this.getModalModeActive()) {

                //<debug>
                console.log(consoleHdr, 'prevented route adjustment - MODAL mode active!');
                //</debug>

                window.location.hash = this.getModalModeRouteSnapshot();
                return;
            }

            //properly handle DIRTY MODE
            if (this.getDirtyModeShouldPreventForCurrentRoute()) {
                //<debug>
                console.log(consoleHdr, 'prevented route adjustment - DIRTY mode active!');
                //</debug>

                var me = this;

                //show msg!
                Ext.Msg.show({
                    title: me.getDirtyModeTitle(),
                    message: me.getDirtyModeMsg(),
                    width: 300,
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.WARNING,
                    fn: function(msgBtn){
                        if(msgBtn === 'ok'){
                            me.endDirtyMode(true); //waive off dirty mode, as a user decided a view is about to change; true to suppress the default route restore
                            me.handleNavigationRouteInternal(routeParams);
                        }
                        else {
                            window.location.hash = me.getDirtyModeRouteSnapshot();
                        }
                    }
                });

                return;
            }

            this.handleNavigationRouteInternal(routeParams);
        },

        /**
         * handles nav route
         * @param routeParams
         * @returns {*}
         */
        handleNavigationRouteInternal: function(routeParams){
            var registeredRouteRec = this.getNavViewRouteRecFromRouteParams(routeParams),
                xtype;

            //no route rec, for the hash, so no such route...
            if (!registeredRouteRec) {
                return null;
            }

            xtype = registeredRouteRec.get('xtype');

            //<debug>
            console.log(consoleHdr, 'xtype:', xtype);
            console.log(consoleHdr, 'className:', Ext.getClassName(Ext.ClassManager.getByAlias('widget.' + xtype)));
            //</debug>

            var view = this.activate(
                this.ensureView(xtype, {
                    xtype: xtype
                }));

            return {
                registeredRouteRec: registeredRouteRec,
                view: view
            };
        },

        /**
         * handles data route - route that handles a record by id
         * @param routeParams
         */
        handleDataRoute: function(routeParams) {

            //<debug>
            console.warn(consoleHdr, 'Handling DATA route', routeParams[0]);
            //</debug>

            //properly handle MODAL MODE!
            if (this.getModalModeActive()) {

                //<debug>
                console.log(consoleHdr, 'prevented route adjustment - modal mode active!');
                //</debug>

                window.location.hash = this.getModalModeRouteSnapshot();
                return;
            }

            //properly handle DIRTY MODE
            if (this.getDirtyModeShouldPreventForCurrentRoute()) {
                //<debug>
                console.log(consoleHdr, 'prevented route adjustment - DIRTY mode active!');
                //</debug>

                var me = this;

                //show msg!
                Ext.Msg.show({
                    title: me.getDirtyModeTitle(),
                    message: me.getDirtyModeMsg(),
                    width: 300,
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.WARNING,
                    fn: function(msgBtn){
                        if(msgBtn === 'ok'){
                            me.endDirtyMode(true); //waive off dirty mode, as a user decided a view is about to change; true to suppress the default route restore
                            me.handleDataRouteInternal(routeParams);
                        }
                        else {
                            window.location.hash = me.getDirtyModeRouteSnapshot();
                        }
                    }
                });

                return;
            }

            this.handleDataRouteInternal(routeParams);
        },

        /**
         * handles data route
         * @param routeParams
         */
        handleDataRouteInternal: function(routeParams){

            var xtype = this.getDataViewXtypeFromRouteParams(routeParams),
                view;

            try{
                //using xtype as id, as edit/view/create will have the same type! also, sometimes dataview can have the same type too
                //a type in this sceario is the main route key, for example 'users', 'applications', etc.
                view = this.ensureView(xtype, { xtype: xtype });

                //<debug>
                console.log(consoleHdr, 'xtype:', xtype);
                console.log(consoleHdr, 'className:', Ext.ClassManager.getName(view));
                //</debug>

                this.activate(view);

                //wtf this does not kick in even though it is exposed ???
                //view.loadRecord(id);
                view.getController().loadRecord(this.getDataRouteRecordIdFromRouteParams(routeParams));
            }
            catch (e) {
                this.logErr(e, 'Invalid route: no view for xtype: ' + xtype);
            }
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

            this.fireGlobal('mainview::itemchanged', view);

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
         * @returns {*}
         */
        ensureView: function(id, config) {

            var container = this.getView(),
                //search items by xtype or id; when found, item will be reused as it has already been instantiated
                item = container.child('component[xtype=' + config.xtype + ']') || container.child('component[viewId=' + id + ']');

            if (!item) {
                try {

                    item = container.add(Ext.apply({viewId: id}, config));

                    this.fireGlobal('mainview::itemcreated', {
                        viewId: id,
                        item: item
                    });

                    if (Ext.isDefined(item.config.route)) {
                        item.setRoute(item.config.route);
                    }
                }
                catch(e){
                    this.logErr(e, 'Could not ensure view for xtype: ' + config.xtype);
                }
            }

            return item || container.add(Ext.create('Ext.Panel', {
                html: '<h1 style="color:red;">Uuuuuups, no view for xtype: ' + config.xtype + ' could be found!</h1>'
            }));
        },

        logErr: function(e, msg){
            //<debug>
            console.log('-----------------------------------------------------------------------------');
            Ext.log.error(msg);
            console.error(e.message, e);
            console.log('-----------------------------------------------------------------------------');
            //</debug>
        }

    });
    
}());