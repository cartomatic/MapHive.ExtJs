//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 18.10.2018.
     */
    Ext.define('mh.module.dataView.phone.ModalRecordViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-modal-record-view',

        requires: [
        ],

        mixins: [
            'mh.module.dataView.phone.ModalRecordViewSharedController'
        ],

        /**
         * Called when the view is created
         */
        init: function() {

            var vw = this.getView(),
                editViewLookupKey = vw.getEditViewLookupKey(),
                formItems = vw.getFormItems();

            //show edit btn if an edit view lookup key has been provided
            if(editViewLookupKey){
                this.lookupReference('editBtn').show();
            }

            //add registered items
            if(formItems && formItems.length > 0){
                this.lookupReference('formHolder').add(formItems);
            }
        },

        /**
         * template
         */
        onEditBtnTap: function(){
            console.log('It looks like you are not overriding the onEditBtnTap of ', Ext.getClassName(this));
        },

        /**
         * dismiss view handler
         */
        onDismissTap: function(){
            this.getView().hide();
        }
    });
}());
