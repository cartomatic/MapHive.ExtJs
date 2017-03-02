//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Provides some generic API that can simplify creating customised edit forms; used as a base for edit forms
     */
    Ext.define('mh.module.dataView.GenericEditFormController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.editform',

        requires: [
            'mh.module.dataView.GenericEditFormLocalisation'
        ],

        mixins: [
            'mh.data.Ajax',
            'mh.mixin.PublishApi',
            'mh.mixin.Localisation',
            'mh.mixin.ResponseValidationErrorReader'
        ],

        /**
         * @event savecomplete
         * @param {boolean} success
         * @param {Ext.data.Model} record
         */

        /**
         * Called when the view is created
         */
        init: function() {
            this.publishApi(['setRecord', 'isValid', 'save', 'setCustomUrl']);
        },

        /**
         * Sets a record on a view model, so the view can properly bind itself
         * @param {Ext.data.Model} rec
         */
        setRecord: function(rec){
            this.getViewModel().set('rec', rec);
        },

        /**
         * @private
         * customised url to be used when saving
         */
        customUrl: null,

        /**
         * setter for the customised editor url; by default models use whatever url is defined on their proxies.
         * This enables customising urls but only for the needed save operation (either create or update)
         * @param url
         */
        setCustomUrl: function(url){
            this.customUrl = url;
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
            return true;
        },

        /**
         * Triggers record save procedure; when ready fires a 'recordsaved' event, the editor wrappers can bind to;
         * This is a generic method that uses the Ext.data.Model.save method.
         * Override if some custom save functionality is required
         * @template
         */
        save: function(){

            //Note: basically it is assumed the view binds to the record via view model, so all the view changes are expressed at the record level straight away; customised binding (stuff like arrays to grids, custom json data, etc.) can also be done transparently as required; therefore the default functionality is to grab a record and perform a save on it.


            var me = this,

                rec = this.getViewModel().get('rec'),

                exceptionMsg = rec.get('uuid') ?

                    //try to obtain the translation from a derived class first, but make the call return null if not found instead of the standart
                    //'translation not found msg', then look at the 'mh.module.dataView.GenericEditFormController' namespace that indeed provides a standard localisation
                    this.getTranslation('failedEdit', null, true) || this.getTranslation('failedEdit', 'mh.module.dataView.GenericEditFormController')
                    :
                    this.getTranslation('failedNew', null, true) || this.getTranslation('failedNew', 'mh.module.dataView.GenericEditFormController'),

                //save op cfg
                cfg = {
                    scope: this,
                    success: this.onSaveSuccess,
                    failure: this.onSaveFailure,
                    exceptionMsg: exceptionMsg,
                    autoIgnore404: false, //this is required to show msg on 404 which will often be the case in dev mode!
                    suppress400: true//so can handle 400 here
                },

                //request callback
                callback = this.generateModelRequestCallback(cfg),

                op = function() {
                    var saveCfg = {
                        callback: callback
                    };
                    //customise save url for the proxy!
                    if(me.customUrl){
                        saveCfg.url = me.customUrl;
                    }
                    rec.save(saveCfg);
                };

                //retry fn
                cfg.retry = op;

            op();
        },

        /**
         * Save success callback
         * @param record
         * @param operation
         */
        onSaveSuccess: function(record, operation){
            this.broadcastSaveComplete(true, record);
        },

        /**
         * save failure callback
         * @param record
         * @param operation
         */
        onSaveFailure: function(response, validationOutput){
            this.broadcastSaveComplete(false, null, validationOutput.handled ? null : this.getFriendlyServerValidationFeedback(response.responseText));
        },

        /**
         * broadcasts as savecomplete event with the specified data
         * @param success
         * @param rec
         */
        broadcastSaveComplete: function(success, rec, validationFeedback){
            this.getView().fireEvent('savecomplete', success, rec, validationFeedback);
        },

        /**
         * Adds a diff with links to the record
         * @param diff1
         * @param diff2
         * @param diff3
         * @param etc...
         * @param {boolean} [reset=false]; whether or not the original links collection should be replaced with the incoming data
         */
        addLinksDiff: function(){
            var rec = this.getViewModel().get('rec'),
                links, a = 0, alen = arguments.length, diff,

                reset = false;

            if(!rec || alen === 0){
                return;
            }

            //last param tells if the original links object should be reset
            if(Ext.isBoolean(arguments[alen - 1])){
                reset = arguments[alen - 1];
                alen -= 1; //decrease the bounds, as last param is a switch
            }


            links = reset ? {} : rec.get('links') || {};

            for(a; a < alen; a++){
                diff = arguments[a] || {};

                if(diff.upsert && diff.upsert.length > 0){
                    links.upsert = Ext.Array.merge(links.upsert || [], diff.upsert);
                }

                if(diff.destroy && diff.destroy.length > 0){
                    links.destroy = Ext.Array.merge(links.destroy || [], diff.destroy);
                }
            }

            rec.set('links', links);
        }

    });

}());