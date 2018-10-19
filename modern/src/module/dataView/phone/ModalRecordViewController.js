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
                formItems = vw.getViewItems();

            //add registered items
            if(formItems && formItems.length > 0){
                this.lookupReference('viewItemsHolder').add(formItems);
            }

            this.setUpActionBtns();
        },

        /**
         * sets up action btns for this view
         */
        setUpActionBtns: function(){
            var vw = this.getView(),
                editViewLookupKey = vw.getEditViewLookupKey(),
                enableEdit = vw.getEnableEdit(),
                enableDismiss = vw.getEnableDismiss();

            if(enableEdit && editViewLookupKey) {
                this.lookupReference('editBtn').show();
            }

            if(enableDismiss){
                this.lookupReference('dismissBtn').show();
            }
        },

        /**
         * shows modal edit view
         */
        onEditBtnTap: function(){
            var vw = this.getView(),
                editViewLookupKey = vw.getEditViewLookupKey(),
                editor = this.isModalViewRegistered(editViewLookupKey) ? this.getModalView(editViewLookupKey) : null;

            this.dataBindEditView(editor);

            if(editor){
                this.showModalView(editor);
            }
        },

        /**
         * data binds edit view just before it gets shown
         * @param view
         * @template
         */
        dataBindEditView: function(view){

        },

        /**
         * dismiss view handler
         */
        onDismissBtnTap: function(){
            this.getView().hide();
        }
    });
}());
