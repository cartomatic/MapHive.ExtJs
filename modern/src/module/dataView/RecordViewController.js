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
        },

        /**
         * sets a record to be bound on the view model
         * @param id
         */
        loadRecord: function(id, route) {

            //avoid reloading record as it will reset the form and we do want to avoid that!
            if(this.shouldPreventReload()){
                //<debug>
                console.log('[EDIT VIEW] - skipping a rec reload - likely rec has not changed or if in edit mode rec is dirty or something...');
                //</debug>
                return;
            }

            this.showLoadMask(
                //try to grab customized translation first and fallback for default
                this.getTranslation('loadRecLoadMask', null, true) || this.getTranslation('loadRecLoadMask', 'mh.module.dataView.DataViewLocalization')
            );
            this.loadRecordInternal(id, route);
        },

        /**
         * whether or not record reload should be prevented
         * @returns {*|boolean}
         */
        shouldPreventReload: function(){
            var previousRoute = this.getPreviousRoute(),
                previousRouteParts = this.getDataRouteParamsForRoute(previousRoute),
                currentRouteParams = this.getDataRouteParamsForCurrentRoute();

            //prevent reload if previous route is the same as the current route
            return previousRouteParts && previousRouteParts[1] === currentRouteParams[1] && previousRouteParts[2] === currentRouteParams[2];
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