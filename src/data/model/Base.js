//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.model.Base', {
        extend: 'Ext.data.Model',

    requires: [
        'mh.data.identifier.Null'
    ],

    idProperty : 'uuid',
        identifier: 'mhnull', //this will enforce a default null value for the idProperty for newly created models inheriting from base
        fields: [

            /**
             * Identifier of an object type; used to handle links between objects
             */
            { name: 'typeUuid', type: 'string', allowNull: true, defaultValue: null, persist: false},

            { name: 'uuid', type: 'string', allowNull: true, defaultValue: null, persist: false},

            { name: 'createDateUtc', type: 'date', useNull: true, dateFormat: 'c', persist: false},

            { name: 'modifyDateUtc', type: 'date', useNull: true, dateFormat: 'c', persist: false},

            //TODO - at some point add createdBy, modifiedBy and such to match the serverside

            /**
             * Whether or not this link is a temp link - temp means the link on an object has not yet been saved;
             * this property is used by the links grid in order to handle the links properly
             */
            { name: 'tempLink', type: 'boolean', useNull: false, persist: false},

            /**
             * A links diff that should be applied to the object
             */
            { name: 'links', type: 'auto', useNull: true},

            /**
             * a link data specific to this object when linked to a parent; this data is dynamic and does depend on the linking context (parent pretty much)
             * it is a dbl associative arr in a form of dict<string, dict<string, object>>
             */
            { name: 'linkData', type: 'auto', useNull: true}
        ]
    });

}());