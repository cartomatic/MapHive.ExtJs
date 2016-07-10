//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a modal editor that wraps up standardised edit forms and provides unified API for editing Ext.data.Model instances
     */
    Ext.define('mh.module.dataView.Editor', {
        extend: 'Ext.window.Window',

    requires: [
        'mh.module.dataView.EditorController',
        'mh.module.dataView.EditorModel'
    ],

    viewModel: {
            type: 'mh-editor'
        },

        config: {
            iconClsNew: 'x-fa fa-plus',

            iconClsEdit: 'x-fa fa-edit',

            iconClsBtnSaveNew: 'x-fa fa-plus',

            iconClsBtnSaveEdit: 'x-fa fa-save',

            //extra customisation hooks
            'btnSave|setUI': null,
            'btnSave|setScale': null,
            'btnCancel|setUI': null,
            'btnCancel|setScale': null
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