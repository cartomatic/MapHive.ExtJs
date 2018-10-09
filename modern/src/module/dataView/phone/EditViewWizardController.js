//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){

    var cnslHdr = '[WIZARD]_s::,DarkSlateBlue,';

    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.EditViewWizardController', {
        extend: 'mh.module.dataView.EditViewController',
        alias: 'controller.mh-mobile-edit-view-wizard',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader',
            'mh.mixin.ResponseValidationErrorReader',
            'mh.module.dataView.phone.RecordViewSharedController',
            'mh.mixin.DirtyMode'
        ],

        init: function(){
            this.callMeParent(arguments);

            this.workOutViewSubRoutes();
        },

        /**
         * view subroutes
         */
        viewSubRoutes: null,

        /**
         * view map
         */
        viewMap: null,

        /**
         * work outs view sub routes based on the configured items
         */
        workOutViewSubRoutes: function(){
            this.viewSubRoutes = this.viewSubRoutes || [];
            this.viewMap = this.viewMap || {};

            Ext.Array.each(this.getView().items.items, function(view, idx){
                var ref = view.route || 'item' + (idx + 1);
                this.viewSubRoutes.push(ref);
                this.viewMap[ref] = view;
            }, this);
        },

        /**
         * displays next view if any
         */
        displayNextView: function(){
            var curentViewIdx = this.viewSubRoutes.indexOf(this.getView().getActiveItem().getReference()),
                nextView = this.viewSubRoutes[curentViewIdx + 1];

            if(nextView){
                this.displayView(nextView);
            }
        },

        /**
         * displays previous view if any
         */
        displayPreviousView: function(){
            var curentViewIdx = this.viewSubRoutes.indexOf(this.getView().getActiveItem().getReference()),
                prevView = this.viewSubRoutes[curentViewIdx - 1];

            if(prevView){
                this.displayView(prevView, true); //true to indicate the direction is backwards
            }
        },

        /**
         * displays a specified view;
         * @param view
         */
        displayView: function(view, movingBackwards){

            var vwIdx = this.viewSubRoutes.indexOf(view),
                vw = this.viewMap[view],

                moveNext = false;

            movingBackwards = movingBackwards || false;

            //<debug>
            console.warn(cnslHdr, 'Turning on view:', view, 'moving back?', movingBackwards);
            //</debug>


            //check the count of dict values for a view and if less than 2 move next
            if(vw.xtype === 'mh-phone-dictionary-pick-list' && vw.getDictValuesCount() < 2){
                moveNext = true;
            }

            if(moveNext){
                //<debug>
                console.warn(cnslHdr, 'Moving next view!', vwIdx, view, '->', vwIdx + (movingBackwards ? -1 : 1), this.viewSubRoutes[vwIdx + (movingBackwards ? -1 : 1)]);
                //</debug>
                this.displayView(this.viewSubRoutes[vwIdx + (movingBackwards ? -1 : 1)], movingBackwards);
                return;
            }

            //turning on a new view...
            if(vw){
                this.lookupReference('btnPrev').setDisabled(vwIdx === 0);
                this.lookupReference('btnNext').setDisabled(vwIdx === this.viewSubRoutes.length - 1);
                this.getView().setActiveItem(vw);
            }
        },

        //TODO
        //on hash change - redirect to appropriate view.

    });
}());