//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.users.UsersDataEditFormLocalization', {

        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.users.UsersLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.users.UsersLocalization',
            localization: {}
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());