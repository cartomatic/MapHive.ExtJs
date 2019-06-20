//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.simpleDictionary.EditViewController', {
        extend: 'mh.module.dataView.desktop.EditViewController',
        alias: 'controller.mh-desktop-simple-dictionary-edit-view',

        requires: [
            'mh.module.dataView.desktop.simpleDictionary.EditViewLocalization'
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
        loadRecord: function(id, route){

            var titleDict = Ext.getClass(this.getView()).titles,
                routeKey  = (route ? this. getDataRouteViewTypeForRoute(route) : this.getDataRouteViewTypeForCurrentRoute() || '').toLowerCase(),
                title = titleDict[routeKey] || this.getTranslation('genericViewName');

            //adjust view name based on the route
            this.getViewModel().set('localization.viewName', title);

            //continue with the record loader
            this.callMeParent(arguments);
        },

        afterRecordSave: function(rec){
            //<debug>
            console.log(this.logHdr, 'Executing afterRecordSave for dictionary with the following model: ' + Ext.getClassName(rec));
            //</debug>

            this.fireGlobal('mh-dictionary::changed', {
                model: Ext.getClassName(rec),
                op: 'save',
                rec: rec
            });
        }

    });
}());
