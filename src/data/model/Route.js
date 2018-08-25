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
             *
             * view.statics.navigationRoute is often used in order to limit the places routes are defined
             * see mh.module.dataView.users.DataView#statics.navigationRoute for implementation details:
             *  navigationRoute: mh.module.dataView.users.DataView.navigationRoute
             *
             *
             */
            { name: 'navigationRoute', type: 'string' },

            /**
             * mh.data.model.Route#dataRoute is used as a base for working out an appropriate xtype for a record-view, edit or create views
             * when a data route is picked, router works out the appropriate xtypes the following way:
             *   * 'edit' token found, '-edit-view' suffix is appended, for example users-edit
             *   * 'create' token found '-create-view' suffix is appended, for example users-create
             *   * no token, it assumes a record view mode and appends '-record-view' suffix, for example users-record-view
             * once an id is worked out, it is used as a lookup in order to find a class to instantiate
             * it is therefore important to match navigation route with proper xtypes on appropriate views
             *
             * data routes are often worked from models represented by particular views:
             * - mh.data.model.Base#getViewUrl
             * - mh.data.model.Base#getCreateUrl
             * - mh.data.model.Base#getEditUrl
             *
             * by default data route is the same as the model name. it is possible to change it though via mh.data.model.Base#customEntityNavigationUrl
             * when done so, model returns a customised route base that is then glued with an appropriate suffix (record, create, edit)
             *
             * so it is necessary to ensure appropriate models return urls that can be picked by router
             * see mh.data.model.User#customEntityNavigationUrl for implentation details:
             *  mh.data.model.User.getEntityNavigationUrlBase()
             *
             * furthermore picked routes are used by the generic record loader to work out a model to init and load, so there must be a clear
             * relation between the routes and data models
             *
             * quite often the same views can be used in two modes, for example create / edit. in order to enable this, they use internal aliasing mechanism
             * that is implemented via view.statics.aliases array - it specifies aliases that should point to a single xtype;
             * see mh.module.dataView.users.EditView#statics.aliases for implementation details:
             *
             */
            { name: 'dataRoute', type: 'string' },

            /**
             * icon to use in nav menus
             */
            { name: 'iconCls', type: 'string' }
        ]
    });
    
}());