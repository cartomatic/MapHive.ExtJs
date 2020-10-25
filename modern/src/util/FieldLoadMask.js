//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    let l = 'mh.util.FieldLoadMaskLocalization';

    /**
     * utils for masking fields while data is loading
     */
    Ext.define('mh.util.FieldLoadMask', {
        singleton: true,

        requires: [
            'mh.util.FieldLoadMaskLocalization',
            'mh.localization.Localization'
        ],

        maskCombo: function(combo, msg){
            if(!combo){
                return;
            }
            combo.inputElement.dom.value = msg || mh.localization.Localization.getTranslation('loadingMsg', l);
        },

        unmaskCombo: function(combo){
            if(!combo){
                return;
            }
            combo.inputElement.dom.value = '';
        }
    });
}());