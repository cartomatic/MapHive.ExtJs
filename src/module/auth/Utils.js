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
        }
    });

}());