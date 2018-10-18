//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalEditViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-modal-edit-view',
    
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
                enableSave = vw.getEnableSave(),
                enableDismiss = vw.getEnableDismiss();

            if(enableSave){
                this.lookupReference('saveBtn').show();
            }

            if(enableDismiss){
                this.lookupReference('dismissBtn').show();
            }
        },

        /**
         * template
         */
        onSaveBtnTap: function(){
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
