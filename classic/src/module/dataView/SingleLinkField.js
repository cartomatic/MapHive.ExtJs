(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * a single link field - used to display a single link value in a form
     */
    Ext.define('mh.module.dataView.SingleLinkField', {
        extend: 'Ext.form.FieldContainer',
    
        xtype: 'mh-links-single-field',

        controller: 'mh-links-single-field',

    requires: [
        'mh.mixin.ApiMap',
        'mh.module.dataView.SingleLinkFieldController'
    ],

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
             * @cfg {string} dataView either xtype or class name inheriting from mh.module.dataView.DataViewBase;
             * instantiable data view object that can be used to add new data to the links grid; this can actually be any object that can be added to a view. It just has got to have some standardised APIs (see the source... ;)
             */
            dataView: null,

            /**
             * A function used to render linked object data
             */
            renderer: null,

            'btnSetLink|setUI': null,
            'btnSetLink|setScale': null,
            'btnSetLink|setIconCls': null,
            'btnRemoveLink|setUI': null,
            'btnRemoveLink|setScale': null,
            'btnRemoveLink|setIconCls': null,
        },

        layout: 'hbox',

        items: [
            {
                xtype: 'displayfield',
                reference: 'displayField',
                flex: 1,
                border: 1,
                style: {
                    borderColor: '#D0D0D0',
                    borderStyle: 'solid'
                }
            },
            {
                xtype: 'button',
                reference: 'btnSetLink',
                iconCls: 'x-fa fa-edit',
                listeners: {
                    click: 'onBtnSetLinkClick'
                },
                margin: '0 5 0 0', //tlbr
                hidden: true
            },
            {
                xtype: 'button',
                reference: 'btnRemoveLink',
                iconCls: 'x-fa fa-remove',
                listeners: {
                    click: 'onBtnRemoveLinkClick'
                },
                margin: '0 5 0 0', //tlbr
                hidden: true
            }
        ],

        /**
         * just delegates the work to a controller, so it gets properly encapsulated
         * @param {mh.data.model.Base}
         */
        setContext: function(rec){
            this.getController().setContext(rec);
        }
    });
}());