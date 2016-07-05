//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.data.LinksPickerLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                btnAdd: {
                    en: 'Add',
                    pl: 'Dodaj'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                title: {
                    en: 'Add links',
                    pl: 'Dodaj linki'
                },
                titleSeparator: {
                    en: ' :: ',
                    pl: ' :: '
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());