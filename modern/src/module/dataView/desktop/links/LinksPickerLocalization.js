//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.links.LinksPickerLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
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
        mh.localization.Localization.registerTranslations(this);
    });

}());