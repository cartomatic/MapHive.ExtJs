(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 10.02.2017.
     */
    Ext.define('mh.module.auth.AccountCreatorController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-auth-account-creator',

    requires: [
        'mh.data.model.User',
        'mh.module.auth.AccountCreatorLocalisation'
    ],

    mixins: [
            'mh.mixin.Localisation',
            'mh.data.Ajax',
            'mh.mixin.ApiMap'
        ],

        /**
         * @event accountcreatefinished
         * fired whnever the account creation procedure is finished or cancelled
         */

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalisationToViewModel();
        },

        /**
         * btn create profile click callback
         * @param btn
         */
        onBtnCreateProfileClick: function(btn){
            //verify if all the stuff is ok and sent the stuff for processing

            //the most important here is email and slug
            var txtEmail = this.lookupReference('txtEmail'),
                email = txtEmail.getValue(),
                slug = this.lookupReference('txtSlug').getValue(),
                forename = this.lookupReference('txtForename').getValue(),
                surname = this.lookupReference('txtSurname').getValue();

            //TODO - email must be email...
            //TODO - slug will require a backend checkup!

            this.getView().mask(this.getTranslation('accountCreateInProgress'));

            var user = Ext.create('mh.data.model.User', {
                email: email,
                slug: slug,
                forename: forename,
                surname: surname
            });

            this.doPost({
                url: this.getApiEndPoint('accountCreate'),
                params: user.getData(),
                autoHandleExceptions: false,
                success: this.onAccountCreateSuccess,
                failure: this.onAccountCreateFailure,
                scope: this
            });
        },

        /**
         * btn cancel click callback
         * @param btn
         */
        onBtnCancelClick: function(btn){
            this.reset();
            this.getView().fireEvent('accountcreatefinished');
        },

        reset: function(){
            this.lookupReference('txtEmail').setValue(null);
            this.lookupReference('txtSlug').setValue(null);
            this.lookupReference('txtForename').setValue(null);
            this.lookupReference('txtSurname').setValue(null);
        },

        /**
         * account create callback success
         * @param response
         */
        onAccountCreateSuccess: function(response){
            this.reset();
            this.getView().unmask();
            this.getView().fireEvent('accountcreatefinished');

            //give feedback msg
            Ext.Msg.show({
                title: this.getTranslation('accountCreationSuccessTitle'),
                message: this.getTranslation('accountCreationSuccessMsg'),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        },


        /**
         * account creation failure
         * @param response
         */
        onAccountCreateFailure: function(response){
            this.getView().unmask();

            //give feedback msg
            var title = this.getTranslation('accountCreationFailureTitle'),
                msg = this.getTranslation('accountCreationFailureMsg'),
                errors;

            if(response.status === 400){
                //ok this failure was due to invalid data - give appropriate msg!
                //this should be an array of errors
                errors = response.responseJson || Ext.JSON.decode(response.responseText);

                msg = this.getTranslation('accountCreationFailureDetailedMsg');
                msg += '<ul>';

                Ext.Array.each(errors, function(e){
                    msg += '<li>' + this.getTranslation(e.code) + '</li>';
                }, this);
                msg += '</ul>';
            }

            //looks like some other problem has occured...
            Ext.Msg.show({
                iconCls: '',
                title: title,
                message: msg,
                width: 400,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });
    
}());
    