//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * This is a simplistic example of a hosted app CLASSIC view. it simply sets up some
     */
    Ext.define('mh.module.sideNav.SideNavController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-sidenav',

        mixins: [
            'mh.communication.MsgBus',
            'mh.mixin.ModalMode',
            'mh.mixin.RouteUtils'
        ],

    requires: [
        'Ext.app.Application',
        'Ext.app.route.Route',
        'Ext.data.TreeStore',
        'Ext.panel.Panel',
        'Ext.util.History',
        'mh.model.NavigationTree'
    ],

        //Note: routes are set up automatically on init, depending on the context

        /**
         * whether or not routes should be expressed in the url part; this also turns on listening for route changes
         */
        useRouter: true,

        /**
         * Called when the view is created
         */
        init: function () {

            this.useRouter = this.getView().getUseRouter();

            //grab the menu data first and
            var menudata = this.prepareMenuData();

            this.loadMenu(menudata);

            //it is required to init the History object prior to using it
            if(this.useRouter){

                this.prepareRoutes(menudata);

                Ext.util.History.init();

                this.listen({
                    controller: {
                        '#': {
                            unmatchedroute: this.onUnmatchedRoute
                        }
                    }
                });
            }
            else {
                //if router is not used this will provide a hook for selecting a default node
                this.selectDefaultNode();
            }
        },

        /**
         * Extracts routes off the menu data and registers them with the controller;
         * @param menudata
         */
        prepareRoutes: function(menudata){
            var m = 0, mlen = menudata.length,
                routes,r, rlen,
                outRoutes = {};

            for (m; m < mlen; m++){
                routes = menudata[m].routes;
                r = 0; rlen = routes.length;
                for(r; r < rlen; r++){
                    outRoutes[routes[r]] = 'onMatchedRoute'
                }

                if(menudata[m].children){
                    this.prepareRoutes(menudata[m].children)
                }
            }
            this.setRoutes(outRoutes);
        },

        /**
         * Prepares menu data; should return an arr of
         *  return [
         *      text: this.getTranslation('dashboard'),
         *      iconCls: 'x-fa fa-dashboard',
         *      view: 'mh.mainView.dashboard.Dashboard',
         *      viewReference: 'dashboard',
         *      routes: [
         *          'dashboard'
         *      ],
         *      leaf: true
         *  },
         *  {
         *      text: this.getTranslation('users'),
         *      iconCls: 'x-fa fa-user',
         *      view: 'mh.mainView.users.Users',
         *      viewReference: 'users',
         *      routes: ['users'],
         *      leaf: true
         *  }]
         * @template
         * @returns {*[]}
         */
        prepareMenuData: function(){
            return [];
        },

        /**
         * Loads the appropriate left hand side menu data
         */
        loadMenu: function(data){
            var vm = this.getViewModel(),
                treeStore = vm.get('treeMenu');

            //just rebind the root to load the data
            treeStore.setRootNode({
                children: data
            });
        },

        /**
         * unmatched route handler
         */
        onUnmatchedRoute: function (route) {

            //properly handle EDIT MODE!
            if (this.useRouter && this.getModalModeActive()) {

                //<debug>
                console.warn('[ROUTER@Main]', 'prevented route adjustment - edit mode active!');
                //</debug>

                window.location.hash = this.getModalModeRouteSnapshot();
                return;
            }

            this.redirectToDefaultRoute();
        },

        routesCheckupCache: null,

        /**
         * checks if a current route matches routes configured for a menu node
         * @param {string} route
         * @param {mh.model.NavigationTree} n
         * @returns {boolean}
         */
        checkIfRouteMatches: function(route, n){
            this.routesCheckupCache = this.routesCheckupCache || {};

            var viewRef = n.get('viewReference'),
                routes,r,rlen;

            if(!this.routesCheckupCache.hasOwnProperty(viewRef)){
                this.routesCheckupCache[viewRef] = this.prepareRouteValidators(n.get('routes'));
            }
            routes = this.routesCheckupCache[viewRef];
            r = 0; rlen = routes.length;

            for(r; r < rlen; r++){
                if(routes[r].recognizes(route))
                    return true;
            }

            return false;
        },

        /**
         * Matched route handler
         */
        onMatchedRoute: function(){

            //properly handle EDIT MODE!
            if (this.useRouter && this.getModalModeActive()) {

                //<debug>
                console.warn('[ROUTER@Main]', 'prevented route adjustment - edit mode active!');
                //</debug>

                window.location.hash = this.getModalModeRouteSnapshot();
                return;
            }

            //since got here, the route should basically be recognised and there should be a view for it

            //Note: this app only handles single routes (no piped ones)
            var route = this.getCurrentHash();

            var navList = this.lookupReference('navTreeList'),
                treeStore = navList.getStore(),
                root = treeStore.getRoot(),
                node = root.findChildBy(
                    function(n){
                        return this.checkIfRouteMatches(route, n);
                    },
                    this,
                    true //perform a deep search, so children are also exercised
                );

            //if a node has been found it means there is a matching menu item and a view for a route
            if(node){
                this.switchCard(node);
            }
            else {
                //Note: this could pretty much happen during the dev. in production this should never be the case ;)
                throw new Error('BOOOOM.... View ref for "' + route + '" route has not been found...');
            }
        },


        /**
         * switches view for a specified node
         * @param node
         */
        switchCard: function(node, route){

            var navList = this.lookupReference('navTreeList'),
                viewRef = node.get('viewReference'),
                cardHolder = this.lookupReference('cardHolder'),
                cardLayout = cardHolder.getLayout(),
                currentView = cardLayout.getActiveItem(),
                newView = this.lookupReference(viewRef);

            if(this.useRouter && route){
                node.set('currentRoute', route);
            }

            //highlight an item on a list
            //this is because the change may come from a route change, not via UI click
            if(!node.parentNode.isRoot() && node.parentNode.hasChildNodes()){
                node.parentNode.expand();
            }
            navList.setSelection(node);


            //turn on the view

            //if the new view has not yet been created, do create it!
            if(!newView){

                if(node.get('view')){
                    newView = Ext.create(node.get('view'), {
                        reference: viewRef
                    });
                }
                else {
                    newView = Ext.create('Ext.panel.Panel', {
                        title: route,
                        html: '<span style ="color:red;">No view defined for <span style="font-weight: bold;">' + route + '</span></span> yet!'
                    });
                }

                cardHolder.add(newView);
            }

            if(currentView && newView !== currentView){
                cardLayout.setActiveItem(newView);
            }
        },

        /**
         * Tree list selection changed callback handdler
         * @param treelist
         * @param selected
         * @param eOpts
         */
        onTreeListSelectionChange: function(treelist, selected, eOpts){
            if(this.useRouter){
                this.redirectTo(selected.get('currentRoute') || selected.get('routes')[0], false); //do not force hash update if the same
            }
            else {
                this.switchCard(selected);
            }
        },

        /**
         * selects a default node
         */
        selectDefaultNode: function(){
            var root = this.getViewModel().get('treeMenu').getRoot(),
                node = root.firstChild;

            if(node){
                Ext.defer(function(){
                    //this defer seems to ensure the node actually gets selected
                    this.switchCard(node);
                    this.lookupReference('navTreeList').setSelection(node);
                }, 10, this);
            }
        }
    });

}());