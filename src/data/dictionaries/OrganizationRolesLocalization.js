(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.03.2017.
     */
    Ext.define('mh.data.dictionaries.OrganizationRolesLocalization', {

        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                orgOwner: {
                    en: 'Organization owner',
                    pl: 'Właściciel organizacji'
                },
                orgAdmin: {
                    en: 'Organization administrator',
                    pl: 'Administrator organizacji'
                },
                orgMember: {
                    en: 'Organization member',
                    pl: 'Członek organizacji'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
    
}());