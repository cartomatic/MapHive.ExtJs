//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.CompositeDataViewController', {
        extend: 'Ext.app.ViewController',

        alias: 'controller.mh-composite-dataview',

        mixins: [
            'mh.mixin.Router',
            'mh.mixin.Localization'
        ],

        /**
         * Called when the view is created
         */
        init: function() {

            this.injectLocalizationToViewModel();

            this.getView().on('activate', this.onViewActivate, this);
            this.getView().on('deactivate', this.onViewDeactivate, this);

            this.getView().on('beforeactiveItemchange', this.onBeforeActiveTabChange, this);

            //wire up hash change listener, so can handle changes that are not reloading this view
            window.addEventListener('hashchange', Ext.bind(this.onHashChange, this));

            this.setupTabs();
        },

        /**
         * sets up tabs, so they get the proper titles, etc
         */
        setupTabs: function(){
            Ext.Array.each(this.getView().items.items, function(item){
                if(item.xtype === 'tabbar'){
                    return;
                }

                if(!item.getTitle()){
                    //looks like obtaining bindings properly sets up the comps, so they get actually data bound
                    item.getBind();
                }

            });
        },

        /**
         * whether or not this view is currently active - active means displayed as the current view in a card layout and similar
         */
        active: false,

        /**
         * view activate handler
         */
        onViewActivate: function(){
            this.active = true;
            this.ensureRouteUi();
        },

        /**
         * view deactivate handler
         */
        onViewDeactivate: function(){
            this.active = false;
        },

        /**
         * hash change handler
         */
        onHashChange: function(){
            this.ensureRouteUi();
        },

        /**
         * ensures the currently displayed UI is based on a route
         */
        ensureRouteUi: function(){
            if(!this.active){
                return;
            }

            var vw = this.getView(),
                items = vw.items.items,
                navRoute = this.getNavRouteViewType(); //xtype meant to be same as route

            Ext.Array.each(items, function(item){

                var classDef = Ext.ClassManager.getByAlias('widget.' + item.xtype);

                //route can be used to match the hash route in a case module xtype name is custom
                if(navRoute &&
                    (
                        //first try the explicitly set nav route for a view
                        classDef.navigationRoute === navRoute ||

                        //if no luck investigate aliases
                        (classDef.aliases || []).indexOf(navRoute) > -1 ||

                        //still no luck, maybe xtype matches route
                        item.xtype === navRoute ||

                        //or a truncated xtype
                        item.xtype === navRoute + '-data-view' ||

                        //if still no luck, try to investigate runtime properties
                        item.navigationRoute === navRoute ||
                        (item.aliases || []).indexOf(navRoute) > -1
                    )
                ){
                    vw.suspendEvent('beforeactiveItemchange');

                    //deferring ensures a tab gets properly highlighted. does not seem to work ok when tab is set before view is brought into front
                    Ext.defer(function(){
                        vw.setActiveItem(item);
                        vw.resumeEvent('beforeactiveItemchange');

                        if(Ext.isFunction(item.onViewActivate)){
                            item.onViewActivate();
                        }
                    },100);

                    return false;
                }
            });
        },

        /**
         * handles custom before tab change
         * @param panel
         * @param newTab
         * @param oldTab
         * @returns {boolean}
         */
        onBeforeActiveTabChange: function(panel, newTab, oldTab){
            //use the nav route or if not provided work out the route off the xtype
            //the latter not likely to be used too often really
            var classDef = Ext.ClassManager.getByAlias('widget.' + newTab.xtype),
                newRoute =
                    //check if an explicit nav route is defined for a view
                    classDef.navigationRoute ||
                    //if not check aliases and use the first one
                    (classDef.aliases || [])[0] ||

                    //no luck wit static properties, try the same with dynamically declared
                    newTab.navigationRoute ||
                    (newTab.aliases || []) [0] ||

                    //if still no luck just use the xtype wit '-data-view' part truncated
                    newTab.xtype.replace('-data-view', '');

            this.redirectTo(newRoute, true);

            //let the router do the job first - tab will switch eventually ;)
            return false;
        }
    });
}());
