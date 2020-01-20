//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.auth.Utils', {

        requires: [
            'mh.module.auth.PassChangeLocalization'
        ],

        mixins: [
            'mh.mixin.Localization'
        ],

        singleton: true,

        /**
         * pass change failed callback
         */
        getPassChangeFailureMsg: function (e) {

            var title, msg,
                l = 'mh.module.auth.PassChangeLocalization';

            switch(e.failureReason){
                case 'too_short':
                case 'not_complex_enough':
                case 'new_pass_same_as_old_pass':
                case 'invalid_old_pass':
                    title = this.getTranslation('passResetFailureTitle_' + e.failureReason, l);
                    msg = this.getTranslation('passResetFailureMsg_' + e.failureReason, l);
                    break;

                default:
                    title = this.getTranslation('passChangeFailureTitle', l);
                    msg = this.getTranslation('passChangeFailureMsg', l);
                    break;
            }

            return {
                title: title,
                msg: msg
            }
        },

        /**
         * validates password complexity
         * @param password
         * @returns {string|boolean}
         */
        validatePassword: function(password){

            if(password.length < 6){
                return 'too_short';
            }

            var hasUpperCase = /[A-Z]/.test(password);
            var hasLowerCase = /[a-z]/.test(password);
            var hasNumbers = /\d/.test(password);
            var hasNonalphas = /\W/.test(password);

            if(hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3){
                return 'not_complex_enough';
            }

            return true;
        }
    });

}());