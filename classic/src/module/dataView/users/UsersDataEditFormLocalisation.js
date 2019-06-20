//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.users.UsersDataEditFormLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.users.UsersLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.users.UsersLocalization',
            localization: {}
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());