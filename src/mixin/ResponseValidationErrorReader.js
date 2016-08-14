//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
    * Set of utils to read user friendly errors off a server response; meant to be used as a mixin in classes that perform ajax requests and needs standardised error extraction functionality
    */
    Ext.define('mh.mixin.ResponseValidationErrorReader', {
        requires: [
            'mh.mixin.ResponseValidationErrorReaderLocalisation'
        ],

        /**
         * Gets a friendly server validation feedback based on the server response text, so form errors shown to a user are less scary
         * @param field
         * @param err
         */
        getFriendlyServerValidationFeedback: function(validationFeedback){
            var feedback = false,
                errData,
                f, flen;

            //first try to deserialise
            try {

                feedback = [];

                errData = Ext.JSON.decode(validationFeedback);

                //this should be an arr
                f = 0; flen = errData.length;

                for(f; f < flen; f++){
                    feedback.push(this.getFriendlyFieldServerValidationMsg(errData[f]));
                }
            }
            catch(e){
                //if failed to deserialise, actually dunno what to do with the msg. it may be a string, and if so and not empty, then make it an exception msg
                if(validationFeedback && validationFeedback !== ''){
                    feedback = validationFeedback;
                }
            }

            return feedback;
        },

        /**
         * gets a translation for an error key
         * @param translationKey
         * @returns {*}
         */
        getErrTranslation: function(translationKey){
            //Note: when displaying a field name that caused error, translation is first found at the inheriting class, then over here to finally default to the field name returned by the server (so it is clear which field failed rather than seeing the default large 'translation not found for blah, blah, blah' msg
            return this.getTranslation(translationKey, null, true) || this.getTranslation(translationKey, 'mh.mixin.ResponseValidationErrorReaderLocalisation')
        },

        /**
         * Gets a friendly message for a field
         * @param field
         * @param err
         */
        getFriendlyFieldServerValidationMsg: function(err){

            var msg,
                //make sure there is an obj with xtra err info
                errInfo = err.info || {},

                propertyName = err.propertyName[0].toLowerCase() + err.propertyName.substring(1);

            switch(err.code){

                case 'required':
                    msg = this.getErrTranslation('valueRequired');
                    break;

                case 'invalid_length':

                    if(errInfo.totalLength > errInfo.maxLength){
                        msg = this.getErrTranslation('valueTooLongErr');
                    }

                    if(errInfo.totalLength < errInfo.minLength){
                        msg = this.getErrTranslation('valueTooShortErr');
                    }
                    msg = msg.replace('{min_length}', errInfo.minLength).replace('{max_length}', errInfo.maxLength).replace('{total_length}', errInfo.totalLength);
                    break;

                case 'invalid_email':
                    msg = this.getErrTranslation('invalidEmail');
                    break;

                case 'email_in_use':
                    msg = this.getErrTranslation('emailInUse');
                    break;

                case 'unique_constraint':
                    msg = this.getErrTranslation('uniqueConstraint');
                    break;

                default:
                    msg = this.getErrTranslation('unknownErr');
                    if(err.message && err.message != ''){
                        msg = msg.replace('{err_msg}', err.message);
                    }
                    break;
            }

            msg = msg.replace(
                '{field_name}',
                this.getTranslation(propertyName, null, true) || this.getTranslation(propertyName, 'mh.mixin.ResponseValidationErrorReaderLocalisation', true) || propertyName
            );

            return msg;
        }
    });
}());