(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.03.2017.
     */
    Ext.define('mh.data.dictionaries.OrganisationRolesLocalisation', {

        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                orgOwner: {
                    en: 'Organisation owner',
                    pl: 'Właściciel organizacji'
                },
                orgAdmin: {
                    en: 'Organisation administrator',
                    pl: 'Administrator organizacji'
                },
                orgMember: {
                    en: 'Organisation member',
                    pl: 'Członek organizacji'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });
    
}());