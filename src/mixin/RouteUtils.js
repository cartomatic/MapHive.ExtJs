(function(){
    //Make sure strict mode is on
    'use strict';

    var gt65 = Ext.getVersion().major >= 6 && Ext.getVersion().minor >= 5,
        routeClass = gt65 ? 'Ext.route.Route' : 'Ext.app.route.Route'; //gone in 6.5

    /**
     * Route utils - a set of helpers tha simplify working with the app routes
     */
    Ext.define('mh.mixin.RouteUtils', {
    requires: [
        'Ext.app.Application',
        //FIXME - this is a private util... will need to extract some sensible stuff out of it
        routeClass
    ],

        /**
         * Prepares an arr of Ext.app.route.Route so can easily test if a route matches pattern
         *
         * @param {string[]} routes
         * @returns {Ext.route.Route[] | Ext.app.route.Route[]}
         */
        prepareRouteValidators: function(routes){
            var outRoutes = [],
                r = 0, rlen = routes.length;

            for(r; r < rlen; r++){
                outRoutes.push(
                    //Ext.create('Ext.app.route.Route', { //gone in 6.5
                    //Ext.create('Ext.route.Route', {
                    Ext.create(routeClass, {
                        url: routes[r]
                    })
                );
            }

            return outRoutes;
        },

        /**
         * Redirects to a default route configured for the application
         */
        redirectToDefaultRoute: function(){
            Ext.defer(
                function () {
                    //looks like this is not working as expected - not forcing the route to default
                    //this.redirectTo(Ext.app.Application.instance.getDefaultToken() || '', true);
                    //so need to kick it harder
                    window.location.hash = Ext.app.Application.instance.getDefaultToken() || '';
                },
                1,
                this
            );
        },

        /**
         * a shortcut to get a value of a current hash
         * @returns {string}
         */
        getCurrentHash: function(){
            return window.location.hash.substring(1);
        }
    });
}());