//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
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

            //this.getView().on('activate', this.__onViewActivates, this);


            this.callMeParent(arguments);

            let vw = this.getView(),
                preventEdit = vw.getPreventEdit();

            //handle visibility of edit btn
            if(preventEdit){
                this.lookupReference('btnEdit').hide();
            }
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
         * active tab change handler - adjusts hash to specify an active tab
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

            //do not adjust hash in modal mode. In such scenario the url should remain unchanged!
            if(this.getModalModeActive()){
                return;
            }

            if(adjustHash){
                //make sure to not redirect during init. otherwise will switch tab to the default one
                if(this.duringViewInitialize){
                    return;
                }

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
        __onViewActivate: function(view){

            var previousRoute = this.getPreviousRoute(),
                previousRouteParams = this.getDataRouteParamsForRoute(previousRoute) || [], //previous route may not be a data route, and will not yield data route params!
                currentRouteParams = this.getDataRouteParamsForCurrentRoute() || [],
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

            //WARNING: test above will fail for longer routes - for example when edit route was nested. same object, explored from nested route but...
            //according to the above will look as totally different route family.
            //for example: layers/XXX/edit should be the same family as projects/XXX/layers/XXX/edit!
            //TODO - make it more flexible at some point

            if(!sameRouteFamily){
                this.entryRoute = previousRoute;
            }
        }
    });
}());