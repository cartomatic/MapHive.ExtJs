(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.usersCatalogue.UsersCatalogueLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.links.LinksPickerLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.links.LinksPickerLocalization',
            localization: {
                title: {
                    en: 'Users Catalogue',
                    pl: 'Katalog użytkowników'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());