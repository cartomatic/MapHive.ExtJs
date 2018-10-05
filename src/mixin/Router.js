//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Utils for working with Ext.route.Router and Ext.route.Route
     */
    Ext.define('mh.mixin.Router', {

        /**
         * routes registered with this controller
         */
        registeredRoutes: null,

        registeredNavRoutes: [],
        registeredDataRoutes: [],


        navRoutePattern: ':type(/:args)?',

        dataRoutePattern: ':type/:id(/:args)?',

        /**
         * registers a navigation route
         * @param route
         */
        registerNavRoute: function(route){

            //TODO - support at least one more lvl of nesting: type1/id1/type2/id2|edit|create
            // if(route.indexOf('{id}') > -1){
            //     this.registerComplexNavRoute(route);
            //     return;
            // }

            if(!Ext.Array.contains(this.registeredNavRoutes, route)){
                this.registeredNavRoutes.push(route);
            }

            this.registeredRoutes = this.registeredRoutes || {};
            this.registeredRoutes[this.navRoutePattern] = {
                action:  'handleNavigationRoute',
                conditions: {
                    ':type': '(' + this.registeredNavRoutes.join('|') + ')',
                    ':args': '(.*)'
                }
            }

            this.reconfigureRoutes();
        },


        registerComplexNavRoute: function(route){

        },

        /**
         * registers a data route - data display / edit / creation
         * @param route
         */
        registerDataRoute: function(route){
            if(!Ext.Array.contains(this.registeredDataRoutes, route)){
                this.registeredDataRoutes.push(route);
            }
            this.registeredRoutes = this.registeredRoutes || {};
            this.registeredRoutes[this.dataRoutePattern] = {
                action:  'handleDataRoute',
                conditions: {
                    ':type': '(' + this.registeredDataRoutes.join('|') + ')',
                    ':id': '([A-Za-z0-9-]{36}|create|edit)',
                    ':args': '(.*)'
                }
            }

            this.reconfigureRoutes();
        },

        /**
         * reconfigures handled routes
         * Note: this is a method using the private Ext.route.Router... so it may be a potential bug source when ext updates internally
         * Note: more obvious name - updateRoutes is used by Ext.route.Mixin, so just in a case trying to avoid unnecessary overrides
         */
        reconfigureRoutes: function(){
            //first disconnect all the routes
            Ext.route.Router.disconnect(this);

            //re-register routes
            Ext.Array.each(Ext.Object.getKeys(this.registeredRoutes), function(route) {

                //note: need to wipe out routes, so they can be re-registered; this is a bit brute though...
                delete Ext.route.Router.routes[route];

                Ext.route.Router.connect(route, this.registeredRoutes[route], this);
            }, this);
        },

        /**
         * gets a view type from a current data route
         * @returns {string}
         */
        getDataRouteViewTypeForCurrentRoute: function(){
            return this.getDataRouteViewTypeForRoute(window.location.hash.substring(1));
        },

        /**
         * gets a view type for data route
         * @param route
         * @returns {any}
         */
        getDataRouteViewTypeForRoute: function(route){
            var params = this.getDataRouteParamsForRoute(route);
            return params ? params[1] : undefined;
        },

        /**
         * gets route params for a data route
         * @param route
         * @returns {RegExpMatchArray | Promise<Response | undefined> | *}
         */
        getDataRouteParamsForRoute: function(route){
            return route.match(Ext.route.Router.routes[this.dataRoutePattern].matcherRegex);
        },

        /**
         * gets a view type from a current nav route
         * @returns {string}
         */
        getNavRouteViewTypeForCurrentRoute: function(){
            return this.getNavRouteViewTypeForRoute(window.location.hash.substring(1));
        },

        /**
         * gets a view type for a route
         * @param route
         * @returns {any}
         */
        getNavRouteViewTypeForRoute: function(route){
            var params = this.getNavRouteParamsForRoute(route);
            return params ? params[1] : undefined;
        },

        /**
         * gets nav route params
         * @param route
         * @returns {RegExpMatchArray | Promise<Response | undefined> | *}
         */
        getNavRouteParamsForRoute: function(route){
            return route.match(Ext.route.Router.routes[this.navRoutePattern].matcherRegex);
        },

        /**
         * whether or not current route seems to be a data route - matches data route id regex
         */
        currentRouteIsDataRoute: function(){
            return this.routeIsDataRoute(window.location.hash.substring(1));
        },

        /**
         * whether or not a route is a data route
         * @param route
         * @returns {boolean}
         */
        routeIsDataRoute: function(route){
            //Note: in some cases there may be no data routes, hence need to check
            return Ext.route.Router.routes[this.dataRoutePattern] && Ext.route.Router.routes[this.dataRoutePattern].matcherRegex.test(route);
        },

        /**
         *
         * @param route
         * @returns {*}
         */
        getNavViewRouteRecForRoute: function(route){
            var routeParams = this.getNavRouteParamsForRoute(route);
            return this.getNavViewRouteRecFromRouteParams(routeParams[1], routeParams[2]);
        },

        /**
         * gets a nav route from route params
         * @param type
         * @param args
         * @returns {*}
         */
        getNavViewRouteRecFromRouteParams: function(type, args){

            //Note: route stores must inherit from either mh.data.store.RoutesMainMenu or mh.data.store.RoutesNonMainMenu

            var menuStore = Ext.StoreManager.lookup('routes-main-menu'),
                nonMenuStore = Ext.StoreManager.lookup('routes-non-main-menu'),

                //first check if this is a menu route
                registeredRouteRec = menuStore.getAt(menuStore.find('navigationRoute', type)) || menuStore.getById(type),
                xtype = type;

            //not menu but maybe non-menu?
            if(!registeredRouteRec && nonMenuStore){
                registeredRouteRec =  nonMenuStore.getAt(nonMenuStore.find('navigationRoute', type)) || nonMenuStore.getById(type);
            }

            //if not a main menu registeredRouteRec, see if can find a component
            if(!registeredRouteRec){

                //check in class manager if xtype exists - both with and without dataview suffix
                var inst = Ext.ClassManager.getByAlias('widget.' + xtype);
                if(!inst){
                    xtype = type + '-data-view';
                    inst = Ext.ClassManager.getByAlias('widget.' + xtype);
                }

                if(!inst){
                    xtype = mh.util.AliasMapper.getXtypeFromAlias(type) || type; //so get proper msg on err!
                    inst = Ext.ClassManager.getByAlias('widget.' + xtype);
                }

                try{
                    registeredRouteRec = Ext.create('Ext.data.Model',{
                        xtype: xtype,
                        id: type
                    });
                }
                catch (e) {
                    this.logErr(e, 'Invalid route: no view for xtype: ' + xtype);
                }
            }

            return registeredRouteRec;
        },

        /**
         * gets nav view xtype for a route
         * @param route
         * @returns {*}
         */
        getNavViewXTypeFromRoute: function(route){
            var registeredRouteRec = this.getNavViewRouteRecForRoute(route);
            if(registeredRouteRec){
                return registeredRouteRec.get('xtype');
            }
            return;
        },

        /**
         * gets data view xtype from route
         * @param route
         * @returns {*|void}
         */
        getDataViewXtypeFromRoute: function(route){
            var routeParams = this.getDataRouteParamsForRoute(route);

            return this.getDataViewXtypeFromRouteParams(
                routeParams[1],
                routeParams[2],
                routeParams[3]
            );
        },

        /**
         * gets dataview xtype from route params
         * @param type
         * @param args
         */
        getDataViewXtypeFromRouteParams: function(type, id, routeArgs){

            var args = Ext.Array.clean((routeArgs || '').split('/')),
                action, xtype, view;

            // determine the requested action for the given "type":
            // - #{type}/create: create a new "type"
            // - #{type}/{id}: show record with "id"
            // - #{type}/{id}/edit: edit record with "id"

            //Note:
            //a bit over the edge, but maybe could make the create, edit, record 'actions' customizable
            //this would be nice but i guess not used too often ;)
            if (id === 'create') {
                action = 'create-view';
            }
            else if (args[0] === 'edit') {
                action = 'edit-view';
                args.shift();
            }
            else {
                action = 'record-view';
            }

            xtype = type + '-' + action;

            //check if xtype exists and if not inspect alias map!
            if(!Ext.ClassManager.getByAlias('widget.' + xtype)){
                xtype = mh.util.AliasMapper.getXtypeFromAlias(xtype) || xtype; //so get proper msg on err!
            }

            return xtype;
        }
    });
    
}());