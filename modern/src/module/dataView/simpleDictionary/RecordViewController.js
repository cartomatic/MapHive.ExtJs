//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.simpleDictionary.RecordViewController', {
        extend: 'mh.module.dataView.RecordViewController',
        alias: 'controller.mh-simple-dictionary-record-view',

        requires: [
            'mh.module.dataView.simpleDictionary.RecordViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent(arguments);
        },

        /**
         * ensures a customised title is applied to this controller's view
         * @param id
         */
        loadRecord: function(id){

            var titleDict = Ext.getClass(this.getView()).titles,
                routeKey  = (this.getDataRouteViewType() || '').toLowerCase(),
                title = titleDict[routeKey] || this.getTranslation('genericViewName');

            //adjust view name based on the route
            this.getViewModel().set('localization.viewName', title);

            //continue with the record loader
            this.callMeParent(arguments);
        }


    });
}());