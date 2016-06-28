//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a modal editor that wraps up standardised edit forms and provides unified API for editing Ext.data.Model instances
     */
    Ext.define('mh.module.data.Editor', {
        extend: 'Ext.window.Window',

    requires: [
        'mh.module.data.EditorController',
        'mh.module.data.EditorModel'
    ],

    viewModel: {
            type: 'mh-editor'
        },

        config: {
            iconClsNew: 'x-fa fa-plus',

            iconClsEdit: 'x-fa fa-edit',

            iconClsBtnSaveNew: 'x-fa fa-plus',

            iconClsBtnSaveEdit: 'x-fa fa-save'
        },

        modal: true,

        closable: false,

        controller: 'mh-editor',

        layout: 'fit',

        minWidth: 350,

        closeAction: 'hide',

        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        reference: 'btnSave',
                        //icon and text binding dynamic and depends on editMode - new / edit
                        listeners: {
                            click: 'onBtnSaveClick'
                        }
                    },
                    {
                        xtype: 'button',
                        reference: 'btnCancel',
                        iconCls: 'x-fa fa-remove',
                        bind: {
                            text: '{localisation.btnCancel}'
                        },
                        listeners: {
                            click: 'onBtnCancelClick'
                        }
                    }
                ]
            }
        ]
    });

}());