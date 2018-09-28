(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * a single link field - used to display a single link value in a form; provides means for picking a new link or resetting an existing link; call setEditable in order to make the field show its buttons
     */
    Ext.define('mh.module.dataView.links.SingleLinkField', {
        extend: 'Ext.field.Container',
    
        xtype: 'mh-links-single-field',

        controller: 'mh-links-single-field',

        requires: [
            'mh.mixin.ApiMap',
            'mh.module.dataView.links.SingleLinkFieldController'
        ],

        config: {
            /**
             * @cfg {Ext.data.Model}
             * Model for the grid data; used to dynamically create store with custom proxy
             */
            model: null,

            /**
             * api map key. used to obtain the url to get data for the field. this url should have a placeholder for the parent identifier;
             * url should look like this: 'some/url/parentIdentifierToken/some/more
             * see parentIdentifierToken for details
             */
            apiMapKey: null,

            /**
             * token used when customising the url for the store; defaults to mh.mixin.ApiMap.parentIdentifier ({parent_uuid})
             */
            parentIdentifierToken: mh.mixin.ApiMap.getParentIdentifier(),

            /**
             * @cfg {string} dataView either xtype or class name inheriting from mh.module.dataView.DataViewBase;
             * instantiable data view object that can be used to add new data to the links grid; this can actually be any object that can be added to a view. It just has got to have some standardised APIs (see the source... ;)
             */
            dataView: null,

            /**
             * A function used to render linked object data
             */
            renderer: null,

            /**
             * whether or not a load mask should be shown when loading the field's value
             */
            useLoadMask: true,

            /**
             * whether or not field should start as editable
             */
            editable: false
        },

        /**
         * @event change
         * @param {mh.module.dataView.links.SingleLinkField} this
         * @param newV
         * @param oldV
         */

        layout: 'hbox',

        encodeHtml: false,

        items: [
           {
                xtype: 'displayfield',
                reference: 'displayField',
                flex: 1
                //height: 50
            },
            {
                xtype: 'button',
                reference: 'btnSetLink',
                iconCls: 'x-i54 i54-edit-app',
                listeners: {
                    tap: 'onBtnSetLinkClick'
                },
                margin: '0 0 0 5', //trbl
                hidden: true
            },
            {
                xtype: 'button',
                reference: 'btnRemoveLink',
                iconCls: 'x-li li-cross-circle',
                listeners: {
                    tap: 'onBtnRemoveLinkClick'
                },
                margin: '0 0 0 5', //trbl
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