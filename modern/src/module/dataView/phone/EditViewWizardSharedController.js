//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var cnslHdr = '[WIZARD]_s::,DarkSlateBlue,';

    Ext.define('mh.module.dataView.phone.EditViewWizardSharedController', {

        setUpWizardMode: function(){
            this.setUpActiveItemChangeTitleWatch();
            this.setUpWizardSubViews();
        },

        setUpActiveItemChangeTitleWatch: function(){
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
        setUpWizardSubViews: function(){
            this.viewSubRoutes = this.viewSubRoutes || [];
            this.viewMap = this.viewMap || {};

            var vw = this.getView(),
                viewSwitcher = this.lookupReference('viewSwitcher'),
                subViews = vw.getViewItems() || [];

            this.viewSwitcher = viewSwitcher;

            Ext.Array.each(subViews, function(view, idx){
                var ref = view.route || 'view' + (idx + 1);
                view.route = ref;
                this.viewSubRoutes.push(ref);
                this.viewMap[ref] = viewSwitcher.add(view);

            }, this);
        },

        /**
         * rewinds to the first view
         */
        rewindToFirstView: function(){
            this.displayView(this.viewSubRoutes[0]);
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

        setUpSwipe: function(){
            var me = this,
                vw = this.getView(),
                swipeCfg = vw.getSwipeCfg(),
                swipeIgnore = (swipeCfg || {}).swipeIgnore || {};

            if(swipeCfg && swipeCfg.enableSwipe){
                this.lookupReference('viewSwitcher').el.on('swipe', function(e){

                    //<debug>
                    if(swipeCfg.logSwipeEvents){
                        console.log(cnslHdr, 'swipe evt', e);
                    }
                    //</debug>

                    if(e.distance < (swipeCfg.swipeRecognitionDistance || 100)){
                        //<debug>
                        if(swipeCfg.logSwipeEvents){
                            console.log(cnslHdr, 'swipe discarded - not lng enough', e.distance + '<' + (swipeCfg.swipeRecognitionDistance || 100));
                        }
                        //</debug>
                        return;
                    }

                    if(
                        me.hasSwipeIgnoreCls(e.target)
                    ){
                        //<debug>
                        if(swipeCfg.logSwipeEvents){
                            console.log(cnslHdr, 'swipe discarded - has swipe ignore cls');
                        }
                        //</debug>

                        return;
                    }

                    if(e.direction === 'right'){
                        me.displayPreviousView();
                    }
                    else if(e.direction === 'left'){
                        me.displayNextView();
                    }
                });
            }
        },

        /**
         * whether
         * @param el
         * @param ignoreCls
         * @returns {boolean}
         */
        hasSwipeIgnoreCls: function(el, ignoreCls){
            var parent = el.parentElement;
            while(parent){
                console.warn(parent.className);

                if(parent.className.indexOf('edit-wizard-swipe-ignore') >= 0){
                    return true;
                }

                parent = parent.parentElement;
            }

            return false;
        },

        resizeWizardToolbarBtns: function(){

            var btns = ['btnPrev', 'btnCancel', 'btnSave', 'btnNext'],
                w = (mh.module.dataView.phone.GlobalSettings.wizardPagingToolbar || {}).btnWidth,
                h = (mh.module.dataView.phone.GlobalSettings.wizardPagingToolbar || {}).btnHeight;

            Ext.Array.each(btns, function(btn){
                var b = this.lookupReference(btn);

                if(b){
                    if(w){
                        b.setWidth(w);
                    }
                    if(h){
                        b.setHeight(h);
                    }
                }
            }, this);
        }

    });
}());
