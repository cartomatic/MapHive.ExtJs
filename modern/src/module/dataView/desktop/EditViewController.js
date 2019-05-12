//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.desktop.EditViewController', {
        extend: 'mh.module.dataView.EditViewController',
        alias: 'controller.mh-desktop-edit-view',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader',
            'mh.mixin.ResponseValidationErrorReader',
            'mh.module.dataView.desktop.RecordViewSharedController'
        ],

        init: function(){
            //when view kicks in, make sure to add its items
            this.getView().on('initialize', this.onViewInitialize, this);
            this.callMeParent(arguments);
        },

        /**
         * sets a record to be bound on the view model
         * @param id
         * @param route
         */
        loadRecord: function(id, route) {
            var rp = (route ? this.getDataRouteParamsForRoute(route) : this.getDataRouteParamsForCurrentRoute()) || [],
                viewHash = id === 'create' ?
                    rp[rp.length - 1]
                    :
                    rp[rp.length - 1].split('/')[1];

            if(viewHash){
                this.rewindToView(viewHash);
            }
            else {
                this.rewindToFirstView();
            }
            this.callMeParent(arguments);
        },

        /**
         * loads a complete record
         * @param rec
         */
        loadCompleteRecord: function(rec){
            this.rewindToFirstView();
            this.callMeParent(arguments);
        },

        /**
         * cleans up view and closes it; special handling for floating / windowed editors
         */
        cleanNClose: function(){
            this.hideLoadMask();
            if(this.getView().getFloated()){
                this.getView().close();
            }
            else{
                if(this.getView().getAdjustHash()){
                    //this view adjusts hash for its subviews, so need to use a stored entry route to go back
                    this.redirectTo(this.entryRoute || this.getPreviousRoute() || this.getNavRouteForCurrentDataRoute());
                }
                else {
                    //hash for this view is not adjusted, so simply go back
                    Ext.History.back();
                }
            }
        },

        /**
         * Provides a hook into a validation logic for the handled form; by default always returns true.
         * When invalid either a msg or a collection of msgs should be returned; alternatively can return false, so an editor displays its default msg
         * when valid boolean true should be returned;
         * example output;
         *  return false; //this should trigger a default msg
         *  return ['test validation msg 1', 'test validation msg 2']; //this should display a list of msgs
         *  return 'test validation msg 1'; //this will display one msg
         *  return true; //this means a form is valid as far as its controller is concerned
         *
         * To customise the feedback msg, have a look at mh.module.dataView.EditorController.showValidationMsg
         * @template
         * @returns {boolean}
         */
        isValid: function(){
            var invalidFields = [];

            Ext.Array.each(this.getView().down('panel'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.validate)){
                        fld.validate(); //aka clearInvalid
                        if(!fld.isValid()){
                            invalidFields.push(fld.getLabel())
                        }
                    }
                });
            });

            if(invalidFields.length > 0){
                return (this.getTranslation('invalidFieldsMsg', null, true) || this.getTranslation('invalidFieldsMsg', 'mh.module.dataView.DataViewLocalization')) + invalidFields.join(', ');
            }

            return true;
        },

        /**
         * resets form validation errors visual indicators
         */
        resetValidationErrs: function(){

            //forms are placed in a tabpanel, so tabpanel's children should be panels/ forms
            //find all panels inside
            //with default maphive's data handling approach, form panel is not used, as the data is bound to a record
            //and then posted directly to the server.

            Ext.Array.each(this.getView().down('panel'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.setError)){
                        fld.setError(null); //aka clearInvalid
                    }
                });
            });
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
                route, routePart;

            //do not adjust hash in modal mode. In such scenario the url should remain unchanged!
            if(this.getModalModeActive()){
                return;
            }

            if(adjustHash){
                for(rp; rp < rplen; rp++){

                    //if this is the last part of a route, then need to drop all the internal routing (edit / create)
                    if(rp === rplen - 1){

                        //test the id. if create, then a route is shorter
                        if(routeParams[rp - 1] === 'create'){
                            routePart = undefined; //last part is always a sub route in this scenario!!!
                        }
                        else {
                            routePart = (routeParams[rp] || '').split('/')[0];
                        }
                    }
                    else {
                        routePart = routeParams[rp];
                    }


                    if(routePart){
                        route ?
                            route += '/' + routePart
                            :
                            route = routePart;
                    }
                }

                route += (newTab.hash? '/' + newTab.hash : '');

                this.redirectTo(route);
            }
        },

        /**
         * takes care of storing an entry route so can go back when using the update hash mode
         * @param view
         */
        __onViewActivate: function(view){
            var previousRoute = this.getPreviousRoute();

            if(!previousRoute){
                this.entryRoute = this.getNavRouteForCurrentDataRoute();
                return;
            }

            this.entryRoute = previousRoute;
        }
    });
}());