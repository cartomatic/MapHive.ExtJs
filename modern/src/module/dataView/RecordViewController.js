//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.RecordViewController', {
        extend: 'Ext.app.ViewController',


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
            'mh.mixin.Router'
        ],

        /**
         * controllers init
         */
        init: function(){
            //Note: in most cases injected localizations will inherit from specific data views and in consequence from mh.module.dataView.DataViewLocalization
            //this is why translations for this module are not placed in its own file but in mh.module.dataView.DataViewLocalization instead
            this.injectLocalizationToViewModel();
            this.publishApi('loadRecord');

            this.handlePrevNextBtnsVisibility();
        },

        handlePrevNextBtnsVisibility: function(){
            var vw = this.getView(),
                showPrevNextBtns = Ext.isFunction(vw.getShowPrevNextBtns) && vw.getShowPrevNextBtns();

            if(showPrevNextBtns){
                this.lookupReference('btnPrev').show();
                this.lookupReference('btnNext').show();
            }
        },

        /**
         * sets a record to be bound on the view model
         * @param id
         */
        loadRecord: function(id, route) {

            //avoid reloading record as it will reset the form and we do want to avoid that!
            if(this.shouldPreventReload(id, route)){
                //<debug>
                console.log('[RECORD VIEW] - skipping a rec reload - likely rec has not changed or if in edit mode rec is dirty or something...');
                //</debug>
                return;
            }

            //start with blank rec, so previously displayed stuff cleans up
            this.getViewModel().set('record', null);

            this.showLoadMask(
                //try to grab customized translation first and fallback for default
                this.getTranslation('loadRecLoadMask', null, true) || this.getTranslation('loadRecLoadMask', 'mh.module.dataView.DataViewLocalization')
            );
            this.loadRecordInternal(id, route);
        },

        /**
         * whether or not record reload should be prevented
         * @param id
         * @param route
         * @returns {boolean}
         */
        shouldPreventReload: function(id, route){
            var previousRoute = this.getPreviousRoute(),
                previousRouteParts = this.getDataRouteParamsForRoute(previousRoute) || [],
                currentRouteParams = (route ? this.getDataRouteParamsForRoute(route) : this.getDataRouteParamsForCurrentRoute()),
                rp = 1, rplen = currentRouteParams.length - 1,
                prevent;

            for(rp; rp < rplen; rp ++){
                prevent = previousRouteParts[rp] === currentRouteParams[rp];
                if(!prevent){
                    break;
                }
            }

            if(prevent){
                //looks like previous view had similar path, so either a subview OR an edit view.
                //if edit view, then should reload realy
                //test if a previous view
                if((previousRouteParts[previousRouteParts.length - 1] || '').split('/')[0] === 'edit'){
                    prevent = false;
                }
            }

            return prevent;
        },

        /**
         * record load success callback
         * @param rec
         */
        onRecordLoadSuccess: function(rec){
            this.getViewModel().set('record', rec);
            this.hideLoadMask();
        },

        /**
         * record load failure callback
         */
        onRecordLoadFailure: function(){
            this.getViewModel().set('record', null);
            this.hideLoadMask();
        }
    });
}());