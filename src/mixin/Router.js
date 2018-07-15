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

        /**
         * registers a navigation route
         * @param route
         */
        registerNavRoute: function(route){
            if(!Ext.Array.contains(this.registeredNavRoutes, route)){
                this.registeredNavRoutes.push(route);
            }

            this.registeredRoutes = this.registeredRoutes || {};
            this.registeredRoutes[':type(/:args)?'] = {
                action:  'handleNavigationRoute',
                conditions: {
                    ':type': '(' + this.registeredNavRoutes.join('|') + ')',
                    ':args': '(.*)'
                }
            }

            this.reconfigureRoutes();
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
            this.registeredRoutes[':type/:id(/:args)?'] = {
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
         * gets a view type from a data route
         * @returns {string}
         */
        getDataRouteViewType: function(){
            var params = window.location.hash.substring(1).match(Ext.route.Router.routes[':type/:id(/:args)?'].matcherRegex);
            return params ? params[1] : undefined;
        },

        /**
         * gets a view type from a nav route
         * @returns {string}
         */
        getNavRouteViewType: function(){
            var params = window.location.hash.substring(1).match(Ext.route.Router.routes[':type(/:args)?'].matcherRegex);
            return params ? params[1] : undefined;
        }

    });
    
}());