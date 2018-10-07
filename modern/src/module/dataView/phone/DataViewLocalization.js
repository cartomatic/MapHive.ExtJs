//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.phone.DataViewLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                btnCreate:{
                    pl: 'Nowy',
                    en: 'New'
                },
                btnEdit: {
                    pl: 'Edytuj',
                    en: 'Edit'
                },
                btnDestroy: {
                    pl: 'Usuń',
                    en: 'Delete'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());