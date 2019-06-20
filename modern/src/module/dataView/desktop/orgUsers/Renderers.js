//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var me, //scope for unscoped renderer calls
        l = 'mh.module.dataView.desktop.orgUsers.RenderersLocalization';

    /**
     * Created by domin on 01.10.2018.
     */
    Ext.define('mh.module.dataView.desktop.orgUsers.Renderers', {

        singleton: true,

        requires: [
            'mh.module.dataView.desktop.orgUsers.Icons',
            'mh.FontIconsDictionary',
            'mh.data.dictionaries.OrganizationRoles',
            'mh.module.dataView.desktop.orgUsers.RenderersLocalization'
        ],

        mixins: [
            'mh.mixin.OrganizationUtils',
            'mh.mixin.Localization'
        ],

        constructor: function(){
            me = this;
        },

        /**
         * renderer of the external user info
         * @param value
         * @param record
         * @returns {string}
         */
        externalUserRenderer: function(value, record) {

            var isOwn = me.isOrgsOwnUser(record),
                tip = me.getTranslation(isOwn ? 'orgUser' : 'externalUser', l),
                icon = mh.FontIconsDictionary.getIcon(isOwn ? 'mhOrgUsersOwnUser' : 'mhOrgUsersExtUser');

            return '<div class="' + icon + '" data-qtip="' + tip + '"></div>';
        },

        /**
         * renders user role within an organization
         * @param value
         * @param record
         * @returns {string}
         */
        orgRoleRenderer: function(value, record) {
            me.prepareOrgRoles();

            var orgRole = record.get('organizationRole'),
                tip = me.orgRoles[orgRole].name,
                icon = me.orgRoles[orgRole].icon;

            return '<div class="' + icon + '" data-qtip="' + tip + '"></div>';
        },

        orgRoles: null,

        /**
         * prepares org roles map for the renderer
         */
        prepareOrgRoles: function(){
            if(!me.orgRoles){
                me.orgRoles = {};
                Ext.Array.each(mh.data.dictionaries.OrganizationRoles.getOrgRolesStoreData(), function(r){
                    me.orgRoles[r.id] = {
                        key: r.key,
                        name: r.name,
                        icon: mh.FontIconsDictionary.getIcon(r.icon)
                    };
                }, me);
            }
        }
    });
}());
