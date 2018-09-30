(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.03.2017.
     */
    Ext.define('mh.data.dictionaries.OrganizationRoles', {
        singleton: true,

        requires: [
            'mh.data.dictionaries.OrganizationRolesLocalization',
            'mh.data.dictionaries.Icons'
        ],

        mixins: [
            'mh.mixin.Localization'
        ],

        store: null,

        /**
         * returns a simple store cfg with organization specific roles based on
         * OrganizationRole enum in MapHive.Server.Core.DataModel.Organization
         */
        getOrgRolesStore: function(){
            if(!this.store){
                this.store = Ext.create('Ext.data.Store',{
                    fields: [
                        { name: 'id', type: 'int' },
                        { name: 'key', type: 'string' },
                        { name: 'name', type: 'string' },
                        { name: 'icon', type: 'string' }
                    ],
                    data: this.getOrgRolesStoreData()
                });
            }
            return this.store;
        },

        getOrgRolesStoreData: function(){
            return [
                { id: 0, key: 'org_owner', name: this.getTranslation('orgOwner'), icon: 'dictOrgRoleOwner'},
                { id: 1, key: 'org_admin', name: this.getTranslation('orgAdmin'), icon: 'dictOrgRoleAdmin'},
                { id: 2, key: 'org_member', name: this.getTranslation('orgMember'), icon: 'dictOrgRoleMember'}
            ];
        },

        /**
         * returns a role record
         * @param id
         * @returns {*}
         */
        getRole: function(id){
            console.warn('????', id);
            var store =this.getOrgRolesStore();
            return store.getAt(store.find('id', id));
        },

        /**
         * gets org role data
         * @param id
         * @returns {MediaStream | Response | MediaStreamTrack | Request}
         */
        getRoleData: function(id){
            var role = this.getRole(id);
            if(role){
                return Ext.clone(role.getData());
            }
        }
    });
    
}());