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
         * @event modaleditviewsave fired when a view gets dismissed with a save btn
         */

        /**
         * template
         */
        onSaveBtnTap: function(){
            var formData = this.collectFormData();

            this.getView().fireEvent('modaleditviewsave', this.getView(), formData);

            this.getView().hide();
        },

        /**
         * provide own functionality to collect the form data
         * @template
         */
        collectFormData: function(){
            var msg = Ext.getClassName(this) + ' does not provide a collectFormData implementation';
            console.warn(msg);
            return msg;
        },

        /**
         * dismiss view handler
         */
        onDismissBtnTap: function(){
            this.getView().fireEvent('modaleditviewcancel', this.getView());
            this.getView().hide();
        }
    });
}());
