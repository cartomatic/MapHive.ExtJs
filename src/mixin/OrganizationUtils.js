//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var _org;

    /**
     * Created by domin on 30.09.2018.
     */
    Ext.define('mh.mixin.OrganizationUtils', {

        /**
         * whether or not user is an own org user
         * @param rec
         * @returns {*|boolean}
         */
        isOrgsOwnUser: function(rec){
            return rec.get('uuid') === null || //no id, so own user as it is being created
                rec.get('isOrgUser') && rec.get('parentOrganizationId') === _org.get('uuid') ||
                rec.get('userOrgId') === _org.get('uuid');
        },

        /**
         * whether or not user is the master owner - not only role has owner role but also the org has been explicitly created for him
         * @param rec
         * @returns {boolean}
         */
        isOrgsMasterOwner: function(rec){
            return rec.get('userOrgId') === _org.get('uuid');
        },

        /**
         * gets an identifier of a currently scoped org
         * @returns {*}
         */
        getCurrentOrgId: function(){
            if(_org){
                return _org.get('uuid');
            }

            return null;
        }

    }, function(){
        Ext.create('mh.communication.MsgBus').watchGlobal('org::changed', function(org){_org = org;}, this);
    });
}());
