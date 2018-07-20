//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var modelsCache = {};

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

            if(modelsCache[type]){
                return modelsCache[type];
            }

            //Note: assume all records inherit from mh.data.model.Base.
            //after all it would be weird if it some did not
            Ext.Array.each(Ext.Object.getKeys(appModels), function(m){

                var staticModel = this.getModelStaticDef(appName + '.model.' + m),
                    navUrlBase;
                if(staticModel && Ext.isFunction(staticModel.getEntityNavigationUrlBase)){
                    navUrlBase = staticModel.getEntityNavigationUrlBase();
                }

                if(navUrlBase === type || m.toLowerCase() === type){
                    model = mh.data.model[m];
                }
            }, this);

            if(!model){
                //uhuh, looks like the app model is not there...
                Ext.Array.each(Ext.Object.getKeys(mh.data.model), function(m){

                    var staticModel = this.getModelStaticDef('mh.data.model.' + m),
                        navUrlBase;
                    if(staticModel && Ext.isFunction(staticModel.getEntityNavigationUrlBase)){
                        navUrlBase = staticModel.getEntityNavigationUrlBase();
                    }

                    if(navUrlBase === type || m.toLowerCase() === type){
                        model = mh.data.model[m];
                    }
                }, this);
            }

            if(model){
                modelsCache[type] = model;
            }
            else {
                console.error('Could not find model for the "' + type + '" data route.');
            }

            return model;
        },


        /**
         * gets model static def from path
         * @param path
         * @returns {*}
         */
        getModelStaticDef: function(path){
            //try to find a model
            var model = window;
            Ext.Array.each(path.split('.'), function(part){
                if(!model){ //not found, so skip
                    return false;
                }
                model = model[part];
            });
            return model;
        }
    });
    
}());