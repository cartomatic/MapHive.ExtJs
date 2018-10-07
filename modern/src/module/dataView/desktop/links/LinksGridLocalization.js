//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.links.LinksGridLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                btnCreate:{
                    pl: 'Nowy',
                    en: 'New'
                },
                btnDelete: {
                    en: 'Delete',
                    pl: 'Usuń'
                },
                name: {
                    en: 'Name',
                    pl: 'Nazwa'
                },
                description: {
                    en: 'Description',
                    pl: 'Name'
                },
                title: {
                    en: 'Links',
                    pl: 'Linki'
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