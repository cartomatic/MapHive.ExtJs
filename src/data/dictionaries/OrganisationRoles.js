(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.03.2017.
     */
    Ext.define('mh.data.dictionaries.OrganizationRoles', {
        singleton: true,

        requires: [
            'mh.data.dictionaries.OrganizationRolesLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation'
        ],

        /**
         * returns a simple store cfg with organization specific roles based on
         * OrganizationRole enum in MapHive.Server.Core.DataModel.Organization
         */
        getOrgRolesStore: function(){

            return {
                fields: [
                    { name: 'id', type: 'int' },
                    { name: 'name', type: 'string' }
                ],
                data: [
                    { id: 0, name: this.getTranslation('orgOwner') },
                    { id: 1, name: this.getTranslation('orgAdmin') },
                    { id: 2, name: this.getTranslation('orgMember') }
                ]
            }
        }

    });
    
}());