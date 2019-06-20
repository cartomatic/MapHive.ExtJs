//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.userProfile.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhUserProfileChangePass: 'x-i54c i54c-pin-code',
                mhUserProfileSaveChanges: 'x-li li-checkmark-circle'
            });
        }
    });
    
}());