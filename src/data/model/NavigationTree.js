//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * A customised tree model for the nav menu so it is possible to extract some xtra data off a node interface
     */
    Ext.define('mh.model.NavigationTree', {
        extend: 'Ext.data.TreeModel',

        fields: [

            /**
             * identifier of a view;
             */
            { name: 'viewReference', type: 'string', allowNull: false },

            /**
             * hashes assigned to the view. The very first hash is also a default hash
             */
            { name: 'routes', type: 'auto', defaultValue: []},

            /**
             * Currently active route for a nav menu node
             */
            { name: 'currentRoute', type: 'string'},

            /**
             * view class to be instantiated when switching to a particular view
             */
            { name: 'view', type: 'string', allowNull: false }
        ]
    });

}());