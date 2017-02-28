(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 28.02.2017.
     */
    Ext.define('mh.module.dataView.users.CatalogueLocalisation', {
        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.LinksPickerLocalisation'
        ],
        statics: {
            inherits: 'mh.module.dataView.LinksPickerLocalisation',
            localisation: {
                title: {
                    en: 'Users Catalogue',
                    pl: 'Katalog użytkowników'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());