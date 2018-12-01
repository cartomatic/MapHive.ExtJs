//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-desktop-record-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization',
            'mh.module.dataView.ModalDataView'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.mixin.PublishApi',
            'mh.module.dataView.RecordLoader',
            'mh.communication.MsgBus',
            'mh.mixin.ModalMode',
            'mh.module.dataView.desktop.RecordViewSharedController',
            'mh.mixin.Router'
        ],

        /**
         * controllers init
         */
        init: function(){
            //when view kicks in, make sure to add its items
            this.getView().on('initialize', this.onViewInitialize, this);

            this.callMeParent(arguments);
        },

        /**
         * sets a record to be bound on the view model
         * @param id
         */
        loadRecord: function(id, route) {

            var rp = this.getDataRouteParamsForCurrentRoute() || [],
                viewHash = rp[rp.length - 1];

            if(viewHash){
                this.rewindToView(viewHash);
            }
            else {
                this.rewindToFirstView();
            }

            this.callMeParent(arguments);
        },

        /**
         * edit btn tap handler - redirects to an edit url, router will show whatever view is needed
         */
        onBtnEditTap: function() {
            var rec = this.getViewModel().get('record'),
                editor;
            if(this.getModalModeActive()){
                editor = mh.module.dataView.ModalDataView.show(this.getRecEditUrl(rec));
                editor.on('editview::savecompleted', function(rec){this.onRecordLoadSuccess(rec);}, this, {single: true});
            }
            else {
                this.redirectTo(this.getRecEditUrl(rec));
            }
        },

        /**
         * gets an edit url for a record
         * @template
         * @param rec
         */
        getRecEditUrl: function(rec){
            return rec.getEditUrl();
        },

        /**
         * back btn tap - go back in history, router will pick up whatever view is required
         */
        onBtnBackTap: function() {
            if(this.getView().getFloated()){
                this.getView().close();
            }
            else {
                if(this.getView().getAdjustHash()){

                    //this view adjusts hash for its subviews, so need to use a stored entry route to go back
                    this.redirectTo(this.entryRoute);
                }
                else {
                    //hash for this view is not adjusted, so simply go back
                    Ext.History.back();
                }
            }
        },

        /**
         * actuve tab change handler - adjusts hash to specify an active tab
         * @param tabPanel
         * @param newTab
         * @param oldTab
         */
        onActiveItemChange: function(tabPanel, newTab, oldTab){
            var vw = this.getView(),
                adjustHash = vw.getAdjustHash(),
                routeParams = this.getDataRouteParamsForCurrentRoute(),
                rp = 1, rplen = routeParams.length,
                route;

            if(adjustHash){
                for(rp; rp < rplen - 1; rp++){
                    route ?
                        route += '/' + routeParams[rp]
                        :
                        route = routeParams[rp];
                }

                route += (newTab.hash? '/' + newTab.hash : '');

                this.redirectTo(route);
            }
        },

        /**
         * route that this view has been activated from
         */
        entryRoute: null,

        /**
         * view activate callback.
         * @param view
         */
        onViewActivate: function(view){
            var previousRoute = this.getPreviousRoute(),
                previousRouteParams = this.getDataRouteParamsForRoute(previousRoute) || [], //previous route may not be a data route, and will not yield data route params!
                currentRouteParams = this.getDataRouteParamsForCurrentRoute(),
                rp = 1, rplen = currentRouteParams.length,
                sameRouteFamily;

            if(!previousRoute){
                this.entryRoute = this.getNavRouteForCurrentDataRoute();
                return;
            }

            //if the previous route - so the route that triggered this view id the same data route (edit / create) then ignore it
            //if not ignored, going back would mean navigating back to edit/create view

            for(rp; rp < rplen - 1; rp++){
                sameRouteFamily = previousRouteParams[rp] === currentRouteParams[rp];
                if(!sameRouteFamily){
                    break;
                }
            }

            if(!sameRouteFamily){
                this.entryRoute = previousRoute;
            }
        }
    });
}());