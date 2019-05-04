//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.orgUsers.EditViewModel', {
        extend: 'mh.module.dataView.EditViewModel',
        alias: 'viewmodel.mh-org-users-edit-view',

        requires: [
            'mh.data.dictionaries.OrganizationRoles'
        ],

        mixins: [
            'mh.mixin.UserCfg',
            'mh.mixin.OrganizationUtils'
        ],

        stores: {
            organizationRoles: mh.data.dictionaries.OrganizationRoles.getOrgRolesStoreCfg()
        },

        formulas: {
            isExtUser: {
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function(rec){
                    if(!rec)
                    {
                        return false;
                    }
                    //if uuid is null, then likely creating a new own
                    return rec.get('uuid') !== null && !this.isOrgsOwnUser(rec);
                }
            },
            isOwner: {
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function(rec){
                    if(!rec)
                    {
                        return false;
                    }
                    //testing for a null rec, so owner locking is prevented for new recs
                    return rec.get('uuid') !== null && rec.get('organizationRole') === 0;
                }
            },
            isOrgOwner: {
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function (rec) {
                    if (!rec) {
                        return false;
                    }

                    return this.getUserIsOrgOwner(this.getCurrentOrgId(), rec.get('uuid'));
                }
            },
            canModifyOrgRole: {
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function(rec){
                    if(!rec)
                    {
                        return false;
                    }
                    return rec.get('uuid') === null || !this.get('isOwner') || (this.get('isOwner') && !this.isOrgsMasterOwner(rec))
                }
            }
        }
    });
}());
