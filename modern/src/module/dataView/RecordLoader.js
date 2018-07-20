//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * utilities for unified record loading for RecordView + editor views
     */
    Ext.define('mh.module.dataView.RecordLoader', {

        mixins: [
            'mh.mixin.Router',
            'mh.data.Ajax'
        ],

        /**
         * internal record loader
         * @param id
         */
        loadRecordInternal: function(id){

            //load rec cfg
            var model = this.getModel(),
                cfg, callback, op;

            //a new rec, just load an empty rec instance
            if(!id){
                this.onRecordLoadSuccess(Ext.create(Ext.getClassName(model)));
                return;
            }

            //got id so can pull a rec

            cfg = {
                scope: this,
                success: this.onRecordLoadSuccess,
                failure: this.onRecordLoadFailure,
                exceptionMsg: this.getTranslation('recordLoadFailure', null, true) || this.getTranslation('recordLoadFailure', 'mh.module.dataView.DataViewBaseLocalization'),
                autoIgnore404: false //this is required to show msg on 404 which will often be the case in dev mode!
            };

            //request callback
            callback = this.generateModelRequestCallback(cfg);

            op = function() {
                model.load(id, {
                    callback: callback
                });
            };

            //retry fn
            cfg.retry = op;

            op();
        },

        /**
         * tries to work out a model based on a data route
         * assumes routes correspond with view xtypes
         *
         * Examines window[appName]['model'] namespace (app.model.ModelName) and then, if a model has not been found the mh.data.model namespace
         */
        getModel: function(){

            var appName = Ext.getApplication().getName(),
                appModels = window[appName]['model'],
                type = (this.getDataRouteViewType() || '').toLowerCase(),
                model;

            //TODO - plug in model aliases so can use totaly customised routes
            //TODO - this will be connected with the base's model getEditUrl / getCreateUrl!
            //TODO - could potentially inspect a static property on a model or a static method - something like getEditUrlBase / getCreateUrlBase
            //tODO - this will habe

            Ext.Array.each(Ext.Object.getKeys(appModels), function(m){
                if(m.toLowerCase() === type){
                    model = appModels[m];
                }
            });

            if(!model){
                //uhuh, looks like the app model is not there...
                //perhaps using the core models???
                Ext.Array.each(Ext.Object.getKeys(mh.data.model), function(m){
                    if(m.toLowerCase() === type){
                        model = mh.data.model[m];
                    }
                });
            }

            if(!model){
                console.error('Could not find model for the "' + type + '" data route.');
            }

            return model;
        }
    });
    
}());