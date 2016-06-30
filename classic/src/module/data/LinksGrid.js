//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Very similar to bindable grid, but provides some common functionality for managing object links
     */
    Ext.define('mh.module.data.LinksGrid', {

        extend: 'Ext.grid.Panel',

        xtype: 'mh-links-grid',

    requires: [
        'mh.mixin.ApiMap',
        'mh.module.data.LinksGridController',
        'Ext.grid.plugin.DragDrop'
    ],

    controller: 'mh-links-grid',

        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                //dragText: 'Drag and drop to reorganize', //
                disabled: true
            }
        },

        //Note: dims are required here so when used in components that enforce own sizing, there are no problems with some deep ext render calls; The error thrown is [E] Layout run failed; its important ot use width/height as minWidth / minHeight do not seem to help at all; btw the size controlling parent comps will not give a damn about it and override it anyway ;)
        height: 100,
        width: 100,

        minWidth: 300,
        minHeight: 300,

        config: {
            /**
             * @cfg {Ext.data.Model}
             * Model for the grid data; used to dynamically create store with custom proxy
             */
            model: null,

            /**
             * endpoint url. used to obtain data for the grid. this url should have a placeholder for the parent identifier;
             * url should look like this: 'some/url/parentIdentifierToken/some/more
             * see parentIdentifierToken for details
             */
            apiUrl: null,

            /**
             * token used when customising the url for the store; defaults to mh.mixin.ApiMap.defaultParentIdentifier ({parent_uuid})
             */
            parentIdentifierToken: mh.mixin.ApiMap.getDefaultParentIdentifier(),

            /**
             * @cfg {string} dataView either xtype or class name inheriting from mh.module.data.DataViewBase;
             * instantiable data view object that can be used to add new data to the links grid; this can actually be any object that can be added to a view. It just has got to have some standardised APIs (see the source... ;)
             */
            dataView: null,

            /**
             * default limit for the link records loaded for a grid
             */
            recLimit: 100,

            //some xtra ui customisation hooks
            'btnAddLink|setUI': null,
            'btnAddLink|setScale': null,
            'btnAddLink|setIconCls': null
        },

        /**
         * just delegates the work to a controller, so it gets properly encapsulated
         * @param {mh.data.model.Base}
         */
        setContext: function(rec){
            this.getController().setContext(rec);
        },

        dockedItems: [
            {
                xtype: 'toolbar',
                reference: 'edit_tbar',
                hidden: true,
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        reference: 'btnAddLink',
                        iconCls: 'x-fa fa-plus',
                        listeners: {
                            click: 'onBtnAddLinkClick'
                        }
                    }
                ]
            }
        ]

    });

}());