//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * route model - describes routes used by the app to switch views; the stuff that describes the hash part
     */
    Ext.define('mh.data.model.Route', {
        extend: 'Ext.data.Model',

        fields: [
            /**
             * model identifier - it is used as a fallback search field when looking up route definitions
             */
            { name: 'id', type: 'string' },

            /**
             * xtype of the navigation model that will be displayed when a route is matched
             */
            { name: 'xtype', type: 'string' },

            /**
             * mh.data.model.Route#navigationRoute is used as a key to finding an appropriate route for a nav view
             * when a nav view route is recognized by a router it is used as lookup for finding a class by xtype
             * following checks are made
             *    * mh.data.model.Route entry is being searched for in the routes main menu store; if found xtype is known
             *    * mh.data.model.Route entry is being searched for in the routes non-main menu store; if found xtype is known
             *    * widget presence is tested by xtype being route itself, for example 'users'
             *    * widget presence is tested by xtype being a route with a '-data-view' suffix, for example 'users-data-view'
             * if a view is not found an exception is thrown.
             * it is therefore important to match navigation route with a proper xtype on an appropriate view
             */
            { name: 'navigationRoute', type: 'string' },

            /**
             * mh.data.model.Route#dataRoute is used as a base for working out an appropriate xtype for a record-view, edit or create views
             * when a data route is picked, router works out the appropriate xtypes the following way:
             *   * 'edit' token found, '-edit' suffix is appended, for example users-edit
             *   * 'create' token found '-create' suffix is appended, for example users-create
             *   * no token, it assumes a record view mode and appends '-record-view' suffix, for example users-record-view
             * once an id is worked out, it is used as a lookup in order to find a class to instantiate
             * it is therefore important to match navigation route with proper xtypes on appropriate views
             *
             * data routes are often worked from models represented by particular views:
             * - mh.data.model.Base#getViewUrl
             * - mh.data.model.Base#getCreateUrl
             * - mh.data.model.Base#getEditUrl
             *
             * so it is necessary to ensure appropriate models return urls that can be picked by router
             *
             * furthermore picked routes are used by the generic record loader to work out a model to init and load, so there must be a clear
             * relation between the routes and data models
             */
            { name: 'dataRoute', type: 'string' },

            /**
             * icon to use in nav menus
             */
            { name: 'iconCls', type: 'string' }
        ]
    });
    
}());