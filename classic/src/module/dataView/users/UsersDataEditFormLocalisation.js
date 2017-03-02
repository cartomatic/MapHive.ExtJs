//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.users.UsersDataEditFormLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.users.UsersLocalisation'
        ],
        statics: {
            inherits: 'mh.module.dataView.users.UsersLocalisation',
            localisation: {}
        }

    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());