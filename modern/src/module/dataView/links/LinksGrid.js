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
            'mh.plugin.grid.DragDrop'
        ],

        controller: 'mh-links-grid',

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
             * token used to inject parent uuid when customising the url for the store; defaults to mh.mixin.ApiMap.parentIdentifier ({parent_uuid})
             */
            parentIdentifierToken: mh.mixin.ApiMap.getParentIdentifier(),

            /**
             * token used to inject org uuid when customising url for the store; defaults to mh.mixin.ApiMap.orgIdentifier ({org_uuid})
             */
            orgIdentifierToken: mh.mixin.ApiMap.getOrgIdentifier(),

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
             * whether or not links picker refresh should be deferred. On some occassions a view that is used for picking up links may do some own setup
             * that takes some time. this is a customisation point to let the links picker wait as long as required
             * when true, defers by 1ms, when number defers by the specified number
             */
            deferLinksPickerRefresh: false
        },

        // setContext: function(rec){
        //     this.getController().setContext(rec);
        // },

        //Note: dims are required here so when used in components that enforce own sizing, there are no problems with some deep ext render calls; The error thrown is [E] Layout run failed; its important ot use width/height as minWidth / minHeight do not seem to help at all; btw the size controlling parent comps will not give a damn about it and override it anyway ;)
        height: 100,

        layout: 'fit',

        items: [
            {
                //TODO - grid via cfg grid, so can configure externally
                //TODO - also some sort of defaults, so do not have to always put together a big config
                xtype: 'grid',

                columns: [
                    {
                        text: 'col1',
                        //bind: {text: '{localisation.name}'},
                        dataIndex: 'name',
                        flex: 1
                    },
                    {
                        text: 'col2',
                        //bind: {text: '{localisation.description}'},
                        dataIndex: 'description',
                        flex: 1
                    }
                ],

                plugins: [{
                    type: 'mh-grid-drag-drop'
                    //TODO - contentPresenterFn: 'dragContentPresenter'
                }]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        reference: 'btnAddLink',
                        iconCls: 'x-li li-plus-circle',
                        listeners: {
                            click: 'onBtnAddLinkClick'
                        }
                    }
                ]
            }
        ]
    });
}());
