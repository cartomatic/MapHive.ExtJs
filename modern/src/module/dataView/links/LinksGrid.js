//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.links.LinksGrid', {

        extend: 'Ext.Panel',

        xtype: 'mh-links-grid',

        requires: [
            'mh.module.dataView.links.LinksGridController',
            'mh.module.dataView.links.LinksGridModel',
            'mh.plugin.grid.DragDrop'
        ],

        controller: 'mh-links-grid',
        viewModel:{
            type: 'mh-links-grid'
        },

        config: {
            /**
             * @cfg {Ext.data.Model}
             * Model for the grid data; used to dynamically create store with custom proxy
             */
            model: null,

            /**
             * api map key. used to obtain an endpoint url to pull the data for the grid.
             * url under this key should have a placeholder for the parent identifier;
             * url should look like this: 'some/url/parentIdentifierToken/some/more
             * see parentIdentifierToken for details
             */
            apiMapKey: null,

            /**
             * token used to inject parent uuid when customising the url for the store; defaults to mh.mixin.ApiMap.parentIdentifier ({parent_uuid})
             */
            parentIdentifierToken: mh.mixin.ApiMap.getParentIdentifier(),

            /**
             * @cfg {string} dataView either xtype or class name inheriting from mh.module.dataView.DataViewBase;
             * instantiable data view object that can be used to add new data to the links grid; this can actually be any object that can be added to a view.
             * It just has got to have some standardised APIs (see the source... ;)
             */
            dataView: null,

            /**
             * default limit for the link records loaded for a grid
             */
            recLimit: 100,

            /**
             * @cfg {Boolean|Number}
             * whether or not links picker refresh should be deferred. On some occasions a view that is used for picking up links may do some own setup
             * that takes some time. this is a customisation point to let the links picker wait as long as required
             * when true, defers by 1ms, when number defers by the specified number
             */
            deferLinksPickerRefresh: false,

            /**
             * @cfg selection mode for the grid - either single or multi
             */
            selMode: 'multi',

            /**
             * @cfg gridCfg links grid configuration
             * @cfg gridCfg.columns links grid columns configuration
             * @cfg gridCfg.contentPresenterFn links grid content presenter
             */
            gridCfg: null,

            /**
             * editable state - by default in display mode
             */
            editable: false,

            /**
             * width of a link picker
             */
            linksPickerWidth: 600,

            /**
             * height of a link picker
             */
            linksPickerHeight: 500
        },

        /**
         * context setter - needed here, as the method publishing is done in contructor's init and this seems to be too late
         * @param rec
         */
        setContext: function(rec){
            this.getController().setContext(rec);
        },

        //Note: dims are required here so when used in components that enforce own sizing, there are no problems with some deep ext render calls; The error thrown is [E] Layout run failed; its important ot use width/height as minWidth / minHeight do not seem to help at all; btw the size controlling parent comps will not give a damn about it and override it anyway ;)
        height: 100,

        iconCls: 'x-li li-link',

        tools: {
            addLink: {
                xtype: 'button',
                reference: 'btnAddLink',
                iconCls: 'x-li li-plus-circle',
                listeners: {
                    tap: 'onBtnAddLinkClick'
                },
                hidden: true
            }
        },

        layout: 'fit'
    });
}());
