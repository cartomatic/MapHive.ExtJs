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
        registeredRoutes: {},

        registeredNavRoutesTypes: {},
        registeredDataRoutesTypes: {},

        /**
         * gets a pattern of a nav route
         * @param lvl
         * @returns {string}
         */
        getNavRoutePattern: function(lvl){
            var pattern;

            for(var l = 1; l <= lvl; l++){
                if(!pattern){
                    pattern = ':type' + l;
                }
                else {
                    pattern += '/:id' + (l - 1) + '/:type' + l;
                }
            }

            return pattern += '(/:args)?';
        },

        /**
         * gets a pattern of a data route
         * @param lvl
         * @returns {string}
         */
        getDataRoutePattern: function(lvl){
            var pattern;

            for(var l = 1; l <= lvl; l++){
                if(!pattern){
                    pattern = ':type' + l + '/:id' + l;
                }
                else {
                    pattern += '/:type' + l + '/:id' + l;
                }
            }

            return pattern += '(/:args)?';
        },

        /**
         * registers a navigation route
         * @param route
         */
        registerNavRoute: function(route){

            if(Ext.isArray(route)){
                Ext.Array.each(route, function(r){
                    this.registerNavRoute(r);
                },this);
                return;
            }

            //assume the nav routes may look like this:
            //type1(/args)
            //type1/id1/type2(/args)
            //type1/id1/type2/id2/type3(/args)
            //....

            //Note: when a complex route is registered, it is assumed tha ids are represented by a '{id}' token

            var routeParts = route.split('/{id}/'),
                routePatternLvls;

            Ext.Array.each(routeParts, function(rp, idx){
                var lvl = idx + 1,
                    key = 'type' + lvl;
                this.registeredNavRoutesTypes[key] = this.registeredNavRoutesTypes[key] || [];

                if(!Ext.Array.contains(this.registeredNavRoutesTypes[key], rp)){
                    this.registeredNavRoutesTypes[key].push(rp);
                }
            }, this);

            routePatternLvls = Ext.Object.getKeys(this.registeredNavRoutesTypes).length;

            for (var lvl = routePatternLvls; lvl >= 1; lvl --){

                var conditions = {};
                for(var l = 1; l <= lvl; l ++){
                    conditions[':type' + l] = '(' + this.registeredNavRoutesTypes['type' +l].join('|')  +')';
                }
                conditions[ ':args'] = '(.*)';

                this.registeredRoutes[this.getNavRoutePattern(lvl)] = {
                    action:  'handleRoute',
                    conditions: conditions
                };
            }

            this.reconfigureRoutes();
        },

        /**
         * registers a data route - data display / edit / creation
         * @param route
         */
        registerDataRoute: function(route){

            if(Ext.isArray(route)){
                Ext.Array.each(route, function(r){
                    this.registerDataRoute(r);
                },this);
                return;
            }

            //assume the data routes may look like this:
            //type1/id1(/args)
            //type1/id1/type2/id2(/args)
            //type1/id1/type2/id2/type3/id3(/args)
            //....

            //Note: when a complex route is registered, it is assumed tha ids are represented by a '{id}' token

            var routeParts = route.split('/{id}/'),
                routePatternLvls;

            Ext.Array.each(routeParts, function(rp, idx){
                var lvl = idx + 1,
                    key = 'type' + lvl;
                this.registeredDataRoutesTypes[key] = this.registeredDataRoutesTypes[key] || [];

                if(!Ext.Array.contains(this.registeredDataRoutesTypes[key], rp)){
                    this.registeredDataRoutesTypes[key].push(rp);
                }
            }, this);

            routePatternLvls = Ext.Object.getKeys(this.registeredDataRoutesTypes).length;


            for (var lvl = routePatternLvls; lvl >= 1; lvl --){

                var conditions = {};
                for(var l = 1; l <= lvl; l ++){
                    conditions[':type' + l] = '(' + this.registeredDataRoutesTypes['type' +l].join('|')  +')';
                    conditions[':id' + l] = '([A-Za-z0-9-]{36}|create)' //'([A-Za-z0-9-]{36}|create|edit)'
                }
                conditions[ ':args'] = '(.*)';

                this.registeredRoutes[this.getDataRoutePattern(lvl)] = {
                    action:  'handleRoute',
                    conditions: conditions
                };
            }

            this.reconfigureRoutes();
        },


        /**
         * route handler scheduler
         */
        handleRouteScheduler: null,

        /**
         * generic route handler
         */
        handleRoute: function(){
            clearTimeout(this.handleRouteScheduler);
            this.handleRouteScheduler = Ext.defer(function(){
                this.handleRouteInternal();
            },50, this);
        },

        /**
         * internal route handler
         */
        handleRouteInternal: function(){

            if(this.currentRouteIsDataRoute()){
                this.handleDataRoute(this.getDataRouteParamsForCurrentRoute());
            }
            else {
                this.handleNavigationRoute(this.getNavRouteParamsForCurrentRoute());
            }
        },

        /**
         * @template
         * @param routeParams
         */
        handleNavigationRoute: function(routeParams){

        },

        /**
         * @template
         * @param routeParams
         */
        handleDataRoute: function(routeParams){

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
         * gets data route params for current route
         * @returns {*}
         */
        getDataRouteParamsForCurrentRoute: function(){
            return this.getDataRouteParamsForRoute(window.location.hash.substring(1));
        },

        /**
         * gets route params for a data route
         * @param route
         * @returns {RegExpMatchArray | Promise<Response | undefined> | *}
         */
        getDataRouteParamsForRoute: function(route){
            var lvl = Ext.Object.getKeys(this.registeredDataRoutesTypes).length,
                regex;
            for(lvl; lvl >= 1; lvl --){
                regex = Ext.route.Router.routes[this.getDataRoutePattern(lvl)].matcherRegex;
                if(regex.test(route)){
                    return route.match(regex);
                }
            }
        },

        /**
         * gets nav route params for current route
         * @returns {*}
         */
        getNavRouteParamsForCurrentRoute: function(){
            return this.getNavRouteParamsForRoute(window.location.hash.substring(1));
        },

        /**
         * gets nav route params
         * @param route
         * @returns {RegExpMatchArray | Promise<Response | undefined> | *}
         */
        getNavRouteParamsForRoute: function(route){
            var lvl = Ext.Object.getKeys(this.registeredNavRoutesTypes).length,
                regex;
            for(lvl; lvl >= 1; lvl --){
                regex = Ext.route.Router.routes[this.getNavRoutePattern(lvl)].matcherRegex;
                if(regex.test(route)){
                    return route.match(regex);
                }
            }
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
            return this.getDataRouteViewTypeFromRouteParams(
                this.getDataRouteParamsForRoute(route)
            );
        },

        /**
         * gets data route view type from route params
         * @param routeParams
         * @returns {undefined}
         */
        getDataRouteViewTypeFromRouteParams: function(routeParams){
            return routeParams ? routeParams[routeParams.length - 3] : undefined;
        },

        /**
         * gets a record id off a data route params collection
         * @param routeParams
         * @returns {undefined}
         */
        getDataRouteRecordIdFromRouteParams: function(routeParams){
            return routeParams ? routeParams[routeParams.length - 2] : undefined;
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
            return this.getNavRouteViewTypeFromRouteParams(
                this.getNavRouteParamsForRoute(route)
            );
        },

        /**
         * gets a nav route view type from route params
         * @param routeParams
         * @returns {undefined}
         */
        getNavRouteViewTypeFromRouteParams: function(routeParams){
            return routeParams ? routeParams[routeParams.length - 2] : undefined;
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
            var lvl = Ext.Object.getKeys(this.registeredDataRoutesTypes).length,
                regex;

            for(lvl; lvl >= 1; lvl --){
                regex = (Ext.route.Router.routes[this.getDataRoutePattern(lvl)] || {}).matcherRegex;
                if(!regex){
                    continue;
                }

                if(regex.test(route)){
                    return true;
                }
            }

            return false;
        },

        /**
         *
         * @param route
         * @returns {*}
         */
        getNavViewRouteRecForRoute: function(route){
             return this.getNavViewRouteRecFromRouteParams(this.getNavRouteParamsForRoute(route));
        },

        /**
         * gets a nav route from route params
         * @param routeParams
         * @returns {*}
         */
        getNavViewRouteRecFromRouteParams: function(routeParams){

            //Note: route stores must inherit from either mh.data.store.RoutesMainMenu or mh.data.store.RoutesNonMainMenu

            var type = this.getNavRouteViewTypeFromRouteParams(routeParams),
                menuStore = Ext.StoreManager.lookup('routes-main-menu'),
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
            return this.getDataViewXtypeFromRouteParams(this.getDataRouteParamsForRoute(route));
        },

        /**
         * gets dataview xtype from route params
         * @param routeParams
         * @returns {*}
         */
        getDataViewXtypeFromRouteParams: function(routeParams){

            var type = this.getDataRouteViewTypeFromRouteParams(routeParams),
                id = this.getDataRouteRecordIdFromRouteParams(routeParams),
                args = Ext.Array.clean((routeParams[routeParams.length - 1] || '').split('/')),
                action, xtype;

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