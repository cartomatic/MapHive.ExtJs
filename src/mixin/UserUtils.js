//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var _org;

    /**
     * Created by domin on 30.09.2018.
     */
    Ext.define('mh.mixin.UserUtils', {

        /**
         * whether or not user is an own org user
         * @param rec
         * @returns {*|boolean}
         */
        isOwnUser: function(rec){
            return rec.get('isOrgUser') && rec.get('parentOrganisationId') === _org.get('uuid');
        },

    }, function(){
        Ext.create('mh.communication.MsgBus').watchGlobal('org::changed', function(org){_org = org;}, this);
    });
}());
