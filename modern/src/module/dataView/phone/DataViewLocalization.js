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
                listEmptyText: {
                    en: 'No data',
                    pl: 'Brak danych'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());