//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){

    var cnslHdr = '[WIZARD]_s::,DarkSlateBlue,';

    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.EditViewWizardController', {
        extend: 'mh.module.dataView.EditViewController',
        alias: 'controller.mh-phone-edit-view-wizard',

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

            this.lookupReference('viewSwitcher').on(
                'activeItemchange',
                function(viewSwitcher, newItem){
                    //need to wait for the binding to kick in
                    Ext.defer(function(){
                        this.lookupReference('titleBarLabel').setHtml(this.getAciveItemViewTitle())
                    }, 50, this);
                },
                this
            );

            this.setUpSubViews();

            //hide the orig floating edit btn
            if(this.btnSave){
                this.btnSave.hide();
            }
        },

        /**
         * gets a view title
         * @returns {string}
         */
        getAciveItemViewTitle: function() {
            var dataView = this.viewSwitcher.getActiveItem(),
                dataViewTitle = '&nbsp';

            //check if can obtain a title of the view title
            if(Ext.isFunction(dataView.getTitle) && dataView.getTitle()){
                dataViewTitle = dataView.getTitle();
            }
            //maybe set via view model bindings, so should be at a _title property
            else if(dataView._title){
                dataViewTitle = dataView._title;
            }

            return '<strong>' + dataViewTitle  + '</strong>';
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
        setUpSubViews: function(){
            this.viewSubRoutes = this.viewSubRoutes || [];
            this.viewMap = this.viewMap || {};

            var vw = this.getView(),
                viewSwitcher = this.lookupReference('viewSwitcher'),
                subViews = vw.getViews() || [];

            this.viewSwitcher = viewSwitcher;

            Ext.Array.each(subViews, function(view, idx){
                var ref = view.route || 'view' + (idx + 1);
                view.route = ref;
                this.viewSubRoutes.push(ref);
                this.viewMap[ref] = viewSwitcher.add(view);

            }, this);
        },

        /**
         * displays next view if any
         */
        displayNextView: function(){
            var currentViewIdx = this.viewSubRoutes.indexOf(this.viewSwitcher.getActiveItem().route),
                nextView = this.viewSubRoutes[currentViewIdx + 1];

            if(nextView){
                this.displayView(nextView);
            }
        },

        /**
         * displays previous view if any
         */
        displayPreviousView: function(){
            var currentViewIdx = this.viewSubRoutes.indexOf(this.viewSwitcher.getActiveItem().route),
                prevView = this.viewSubRoutes[currentViewIdx - 1];

            if(prevView){
                this.displayView(prevView, true); //true to indicate the direction is backwards
            }
        },

        /**
         * displays a specified view;
         * @param view
         */
        displayView: function(view, movingBackwards){

            //if incoming view is undefined, bounds have been exceeded or this ias a wrong view...
            //so when moving forward, need to reverse and start from the last view and exactly the other way round when moving backwards
            if(!view){
                movingBackwards = !!movingBackwards;
                var newV = this.viewSubRoutes[movingBackwards ? 0 : this.viewSubRoutes.length - 1];

                //<debug>
                console.log(cnslHdr, 'Exceeded bounds! Turning view:', newV, 'moving backwards:', !movingBackwards);
                //</debug>

                this.displayView(newV, !movingBackwards);
                return;
            }

            var vwIdx = this.viewSubRoutes.indexOf(view),
                vw = this.viewMap[view],

                moveNext = false;

            movingBackwards = movingBackwards || false;

            //<debug>
            console.log(cnslHdr, 'Turning on view:', view, 'moving back?', movingBackwards);
            //</debug>


            //check the count of dict values for a view and if less than 2 move next
            if(vw.xtype === 'mh-phone-dictionary-pick-list' && vw.getDictValuesCount() < 2){
                //<debug>
                console.log(cnslHdr, 'Found mh-phone-dictionary-pick-list with a single or no values. skipping view. View skipped is: ', view);
                //</debug>
                moveNext = true;
            }

            if(moveNext){
                //<debug>
                console.log(cnslHdr, 'Moving next view!', vwIdx, view, '->', vwIdx + (movingBackwards ? -1 : 1), this.viewSubRoutes[vwIdx + (movingBackwards ? -1 : 1)]);
                //</debug>
                this.displayView(this.viewSubRoutes[vwIdx + (movingBackwards ? -1 : 1)], movingBackwards);
                return;
            }

            //turning on a new view...
            if(vw){
                //bollocks - this does not seem to work ok anymore...
                // this.lookupReference('btnPrev').setDisabled(vwIdx === 0);
                // this.lookupReference('btnNext').setDisabled(vwIdx === this.viewSubRoutes.length - 1);
                //this neither???
                this.lookupReference('btnPrev')[vwIdx === 0 ? 'disable' : 'enable']();
                this.lookupReference('btnNext')[vwIdx === this.viewSubRoutes.length - 1 ? 'disable' : 'enable']();


                //TODO - control sub views via router???
                this.viewSwitcher.setActiveItem(vw);

                //TODO - also router???
            }
        },

        //TODO
        //on hash change - redirect to appropriate view.

        //onview activate

    });
}());