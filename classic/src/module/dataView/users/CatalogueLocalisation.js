(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 28.02.2017.
     */
    Ext.define('mh.module.dataView.desktop.users.CatalogueLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.desktop.linksPickerLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.desktop.linksPickerLocalization',
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